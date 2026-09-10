/**
 * Unified local chat engine for Living With Arthritis.
 * - Keyword + synonym + light typo scoring (not first-regex-wins)
 * - Multi-intent: primary answer + secondary hub links when useful
 * - Low confidence → clarifying question OR partial answer + hubs (never a dead-end)
 * - Urgent red-flag block when emergency keywords appear
 * - Cache + rate limit + streaming UX
 * UK charity safety: no doses/diagnosis; signpost GP / 111 / 999.
 *
 * Still a canned knowledge base — not a live LLM.
 */

import {
  EMERGENCY_RED_FLAG_BLOCK,
  GENERIC_TOPIC,
  SAFETY_DISCLAIMER,
  SUGGESTED_CHIPS,
  TOPICS,
  URGENT_RED_FLAG_TERMS,
  type ChatResourceRef,
  type KnowledgeTopic,
} from "./knowledgeBase";

export interface CacheEntry {
  response: string;
  timestamp: number;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

export interface EngineResult {
  topicId: string;
  score: number;
  response: string;
  related: ChatResourceRef[];
  /** Secondary topic ids merged for multi-intent queries. */
  secondaryTopicIds?: string[];
  confidence?: "high" | "medium" | "low";
}

const CACHE_DURATION = 24 * 60 * 60 * 1000;
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 30;
const STREAMING_CHUNK_DELAY = 12;
/** Strong match threshold — answer the best topic as-is. */
const MATCH_THRESHOLD = 2.5;
/** Soft threshold — offer partial answer + clarifying chips instead of pure generic. */
const SOFT_THRESHOLD = 1.4;
/** Secondary topic must be at least this close to the winner for multi-intent merge. */
const MULTI_INTENT_RATIO = 0.72;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9+#.\s/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Common UK arthritis chat typos / abbreviations → canonical forms. */
const TYPO_MAP: Record<string, string> = {
  arthritus: "arthritis",
  artritis: "arthritis",
  arthirits: "arthritis",
  rheumotoid: "rheumatoid",
  rheumitoid: "rheumatoid",
  osteoartritis: "osteoarthritis",
  osteoarthritus: "osteoarthritis",
  fibromialgia: "fibromyalgia",
  fibromyalga: "fibromyalgia",
  methatrexate: "methotrexate",
  methotrexat: "methotrexate",
  ibuprophen: "ibuprofen",
  ibuprofin: "ibuprofen",
  naprosyn: "naproxen",
  prednislone: "prednisolone",
  biologic: "biologic",
  biolgic: "biologic",
  inflamation: "inflammation",
  inflamatory: "inflammatory",
  exersize: "exercise",
  excercise: "exercise",
  exercize: "exercise",
  dietry: "dietary",
  suplement: "supplement",
  suppliment: "supplement",
  faigue: "fatigue",
  fatige: "fatigue",
  stilness: "stiffness",
  stifness: "stiffness",
  ankel: "ankle",
  sholder: "shoulder",
  psoratic: "psoriatic",
  psoriasis: "psoriasis",
  ankylosing: "ankylosing",
  spondilitis: "spondylitis",
  spondolytis: "spondylitis",
};

function applyTypoFixes(q: string): string {
  return q
    .split(/\s+/)
    .map((w) => TYPO_MAP[w] || w)
    .join(" ");
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Levenshtein distance capped for short tokens. */
function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  if (Math.abs(a.length - b.length) > 2) return 99;
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = i - 1;
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
      prev = tmp;
    }
  }
  return row[b.length];
}

function fuzzyTokenInHaystack(haystack: string, token: string): boolean {
  if (token.length < 5) return false;
  const words = haystack.split(/\s+/);
  const maxDist = token.length >= 8 ? 2 : 1;
  for (const w of words) {
    if (w.length < 4) continue;
    if (editDistance(w, token) <= maxDist) return true;
  }
  return false;
}

/** Word-boundary safe contains; multi-word = all tokens; light plural + typo flex. */
function termHits(haystack: string, term: string): boolean {
  const t = term.toLowerCase().trim();
  if (!t) return false;
  const parts = t.split(/\s+/).filter(Boolean);

  const wordHit = (token: string): boolean => {
    if (!token) return false;
    const pattern =
      token.length <= 4
        ? new RegExp(`(^|[^a-z0-9])${escapeRegExp(token)}([^a-z0-9]|$)`, "i")
        : null;
    if (pattern) {
      if (pattern.test(haystack)) return true;
      if (
        !token.endsWith("s") &&
        new RegExp(`(^|[^a-z0-9])${escapeRegExp(token)}s([^a-z0-9]|$)`, "i").test(haystack)
      ) {
        return true;
      }
      return fuzzyTokenInHaystack(haystack, token);
    }
    if (haystack.includes(token)) return true;
    if (!token.endsWith("s") && haystack.includes(`${token}s`)) return true;
    if (token.endsWith("s") && haystack.includes(token.slice(0, -1))) return true;
    return fuzzyTokenInHaystack(haystack, token);
  };

  if (parts.length === 1) return wordHit(parts[0]);
  if (haystack.includes(t)) return true;
  return parts.every((p) => wordHit(p));
}

function scoreTopic(query: string, topic: KnowledgeTopic): number {
  let score = 0;
  let hits = 0;
  const q = applyTypoFixes(normalize(query));

  for (const kw of topic.keywords) {
    if (termHits(q, kw)) {
      hits += 1;
      score += 3 + Math.min(3, kw.split(/\s+/).length);
    }
  }
  for (const syn of topic.synonyms || []) {
    if (termHits(q, syn)) {
      hits += 1;
      score += 2 + Math.min(2, syn.split(/\s+/).length) * 0.5;
    }
  }

  if (!hits) return 0;

  if (topic.requireAny?.length) {
    const ok = topic.requireAny.some((r) => termHits(q, r));
    if (!ok) score *= 0.35;
    else score += 1.5;
  }

  if (topic.priority) score += topic.priority * 0.05;

  // Light boost when id words appear
  if (termHits(q, topic.id.replace(/-/g, " "))) score += 1;

  // Prefer more specific topics when several keywords hit
  if (hits >= 2) score += Math.min(3, hits * 0.4);

  return score;
}

function detectUrgent(query: string): boolean {
  const q = normalize(query);
  return URGENT_RED_FLAG_TERMS.some((t) => termHits(q, t));
}

function formatResourcesFence(related: ChatResourceRef[] | undefined): string {
  if (!related?.length) return "";
  const payload = related.slice(0, 4).map((r) => ({
    type: r.type,
    title: r.title,
    url: r.url,
    ...(r.description ? { description: r.description } : {}),
  }));
  return `\n\n\`\`\`resources\n${JSON.stringify(payload, null, 2)}\n\`\`\``;
}

function formatNextSteps(steps: string[] | undefined): string {
  if (!steps?.length) return "";
  const lines = steps.map((s) => `- ${s}`).join("\n");
  return `\n\n**Next steps**\n${lines}`;
}

function formatChips(chips: string[] | undefined): string {
  const list = (chips && chips.length ? chips : SUGGESTED_CHIPS).slice(0, 6);
  const lines = list.map((c) => `- "${c}"`).join("\n");
  return `\n\n**Suggested questions**\n${lines}`;
}

function mergeRelated(
  primary: ChatResourceRef[] | undefined,
  secondary: ChatResourceRef[] | undefined,
): ChatResourceRef[] {
  const out: ChatResourceRef[] = [];
  const seen = new Set<string>();
  for (const r of [...(primary || []), ...(secondary || [])]) {
    if (seen.has(r.url)) continue;
    seen.add(r.url);
    out.push(r);
    if (out.length >= 4) break;
  }
  return out;
}

function buildResponse(
  topic: KnowledgeTopic,
  opts?: {
    prefix?: string;
    suffix?: string;
    extraRelated?: ChatResourceRef[];
    includeChips?: boolean;
  },
): string {
  const related = mergeRelated(topic.related, opts?.extraRelated);
  let body = (opts?.prefix || "") + topic.answer;
  if (opts?.suffix) body += opts.suffix;
  body += formatNextSteps(topic.nextSteps);
  if (opts?.includeChips) body += formatChips(topic.chips);
  body += SAFETY_DISCLAIMER;
  body += formatResourcesFence(related);
  return body;
}

function buildLowConfidenceResponse(
  query: string,
  weak: KnowledgeTopic | null,
  weakScore: number,
): string {
  const urgent = detectUrgent(query) ? `${EMERGENCY_RED_FLAG_BLOCK}\n` : "";
  if (weak && weakScore >= SOFT_THRESHOLD && weak.id !== GENERIC_TOPIC.id) {
    const clarifying = `

---

**Did you mean something like this?** If not, try a more specific question (joint + symptom, or a condition name).

${formatChips(weak.chips).trim()}
`;
    return buildResponse(weak, {
      prefix: urgent + `**Here is a partial answer** based on what I matched — please confirm or rephrase if this is not what you meant.\n\n`,
      suffix: clarifying,
      includeChips: false,
      extraRelated: GENERIC_TOPIC.related,
    });
  }

  return buildResponse(GENERIC_TOPIC, {
    prefix: urgent,
    includeChips: true,
  });
}

function rankTopics(query: string): { topic: KnowledgeTopic; score: number }[] {
  const ranked: { topic: KnowledgeTopic; score: number }[] = [];
  for (const topic of TOPICS) {
    const s = scoreTopic(query, topic);
    if (s > 0) ranked.push({ topic, score: s });
  }
  ranked.sort((a, b) => b.score - a.score);
  return ranked;
}

export function matchKnowledge(query: string): EngineResult {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      topicId: GENERIC_TOPIC.id,
      score: 0,
      response: buildResponse(GENERIC_TOPIC, { includeChips: true }),
      related: GENERIC_TOPIC.related || [],
      confidence: "low",
    };
  }

  const ranked = rankTopics(trimmed);
  const best = ranked[0];
  const second = ranked[1];
  const urgent = detectUrgent(trimmed);

  if (!best || best.score < MATCH_THRESHOLD) {
    const weak = best && best.score >= SOFT_THRESHOLD ? best.topic : null;
    const weakScore = best?.score || 0;
    // Emergency-only queries should still hit emergency topic if scored at all
    if (best && best.topic.id === "emergency" && best.score > 0) {
      return {
        topicId: best.topic.id,
        score: best.score,
        response: buildResponse(best.topic, {
          prefix: urgent ? `${EMERGENCY_RED_FLAG_BLOCK}\n` : "",
        }),
        related: best.topic.related || [],
        confidence: "high",
      };
    }
    return {
      topicId: weak ? weak.id : GENERIC_TOPIC.id,
      score: weakScore,
      response: buildLowConfidenceResponse(trimmed, weak, weakScore),
      related: mergeRelated(weak?.related, GENERIC_TOPIC.related),
      confidence: "low",
    };
  }

  const secondaryIds: string[] = [];
  let extraRelated: ChatResourceRef[] | undefined;
  let suffix = "";

  if (
    second &&
    second.topic.id !== best.topic.id &&
    second.score >= MATCH_THRESHOLD &&
    second.score >= best.score * MULTI_INTENT_RATIO
  ) {
    secondaryIds.push(second.topic.id);
    extraRelated = second.topic.related;
    const hubs = (second.topic.related || [])
      .slice(0, 2)
      .map((r) => `**${r.title}** (${r.url})`)
      .join("; ");
    suffix = `\n\n**Also related to your question:** ${second.topic.answer.split("\n")[0].replace(/\*\*/g, "")}${
      hubs ? ` — see ${hubs}` : ""
    }`;
  }

  const prefix = urgent && best.topic.id !== "emergency" ? `${EMERGENCY_RED_FLAG_BLOCK}\n` : "";

  return {
    topicId: best.topic.id,
    score: best.score,
    response: buildResponse(best.topic, { prefix, suffix, extraRelated }),
    related: mergeRelated(best.topic.related, extraRelated),
    secondaryTopicIds: secondaryIds.length ? secondaryIds : undefined,
    confidence: best.score >= 6 ? "high" : "medium",
  };
}

/** Synchronous answer string — used by arthritisChatFallback compatibility. */
export function getLocalAnswer(query: string): string {
  return matchKnowledge(query).response;
}

class OptimizedChatService {
  private responseCache = new Map<string, CacheEntry>();
  private rateLimits = new Map<string, RateLimitEntry>();

  private isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const limit = this.rateLimits.get(identifier);
    if (!limit || now > limit.resetTime) {
      this.rateLimits.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      return false;
    }
    if (limit.count >= RATE_LIMIT_MAX) return true;
    limit.count += 1;
    return false;
  }

  private getCachedResponse(query: string): string | null {
    const key = normalize(query);
    const cached = this.responseCache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.response;
    }
    if (cached) this.responseCache.delete(key);
    return null;
  }

  private setCache(query: string, response: string) {
    this.responseCache.set(normalize(query), { response, timestamp: Date.now() });
  }

  /**
   * Stream a local answer. Always resolves with useful content (never empty).
   * onStatus is optional UX ("Searching guidance…").
   */
  async sendMessage(
    query: string,
    userId: string,
    onChunk: (text: string) => void,
    onComplete: () => void,
    onStatus?: (status: string) => void,
  ): Promise<EngineResult> {
    if (!query || !query.trim()) {
      const empty = matchKnowledge("");
      onChunk(empty.response);
      onComplete();
      return empty;
    }

    if (query.length > 5000) {
      const msg =
        "Your message is too long. Please keep it under 5000 characters, or ask about one topic at a time (e.g. knee exercises, PIP, or flares)." +
        SAFETY_DISCLAIMER;
      onChunk(msg);
      onComplete();
      return { topicId: "too-long", score: 0, response: msg, related: [], confidence: "low" };
    }

    if (this.isRateLimited(userId || "anon")) {
      const msg =
        "You've sent many messages recently. Please wait a moment, then ask again — or browse **/exercises**, **/diet**, **/guides/benefits-pip**, **/blog**." +
        SAFETY_DISCLAIMER;
      onChunk(msg);
      onComplete();
      return { topicId: "rate-limit", score: 0, response: msg, related: [], confidence: "low" };
    }

    onStatus?.("Searching guidance…");

    let response = this.getCachedResponse(query);
    let result: EngineResult;

    if (response) {
      result = { topicId: "cache", score: 99, response, related: [], confidence: "high" };
    } else {
      await new Promise((r) => setTimeout(r, 120));
      result = matchKnowledge(query);
      response = result.response;
      this.setCache(query, response);
    }

    await this.streamResponse(response, onChunk);
    onComplete();
    return result;
  }

  private async streamResponse(text: string, onChunk: (chunk: string) => void): Promise<void> {
    const parts = text.split(/(\n\n+)/);
    let buffer = "";
    for (const part of parts) {
      buffer += part;
      while (buffer.length > 180) {
        let cut = 160;
        const slice = buffer.slice(0, 220);
        const sp = slice.lastIndexOf(" ");
        if (sp > 80) cut = sp;
        onChunk(buffer.slice(0, cut));
        buffer = buffer.slice(cut);
        await new Promise((r) => setTimeout(r, STREAMING_CHUNK_DELAY));
      }
    }
    if (buffer) onChunk(buffer);
  }

  getCacheStats() {
    const now = Date.now();
    const valid = Array.from(this.responseCache.values()).filter(
      (e) => now - e.timestamp < CACHE_DURATION,
    );
    return {
      totalCached: this.responseCache.size,
      validCached: valid.length,
      hitRate: valid.length / Math.max(1, this.responseCache.size),
      rateLimitEntries: this.rateLimits.size,
      topicCount: TOPICS.length,
    };
  }

  cleanupCache() {
    const now = Date.now();
    for (const [key, entry] of this.responseCache.entries()) {
      if (now - entry.timestamp > CACHE_DURATION) this.responseCache.delete(key);
    }
    for (const [key, entry] of this.rateLimits.entries()) {
      if (now > entry.resetTime) this.rateLimits.delete(key);
    }
  }
}

export const chatService = new OptimizedChatService();

if (typeof window !== "undefined") {
  const g = window as unknown as { __lwaChatCleanup?: number };
  if (!g.__lwaChatCleanup) {
    g.__lwaChatCleanup = window.setInterval(() => chatService.cleanupCache(), 5 * 60 * 1000);
  }
}

export default OptimizedChatService;
