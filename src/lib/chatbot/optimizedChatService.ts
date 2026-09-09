/**
 * Unified local chat engine for Living With Arthritis.
 * - Keyword + synonym scoring (not first-regex-wins)
 * - Cache + rate limit
 * - Streaming UX with optional status line
 * - Structured replies: answer + next steps + related resource fence
 * UK charity safety: no doses/diagnosis; signpost GP / 111 / 999.
 */

import {
  GENERIC_TOPIC,
  SAFETY_DISCLAIMER,
  TOPICS,
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
}

const CACHE_DURATION = 24 * 60 * 60 * 1000;
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 30;
const STREAMING_CHUNK_DELAY = 12;
const MATCH_THRESHOLD = 2.5;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9+#.\s/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Word-boundary safe contains; multi-word = all tokens; light plural flex. */
function termHits(haystack: string, term: string): boolean {
  const t = term.toLowerCase().trim();
  if (!t) return false;
  const parts = t.split(/\s+/).filter(Boolean);

  const wordHit = (token: string): boolean => {
    if (!token) return false;
    // Short tokens need word boundaries to avoid "work" in "network"
    const pattern =
      token.length <= 4
        ? new RegExp(`(^|[^a-z0-9])${escapeRegExp(token)}([^a-z0-9]|$)`, "i")
        : null;
    if (pattern) {
      if (pattern.test(haystack)) return true;
      if (!token.endsWith("s") && new RegExp(`(^|[^a-z0-9])${escapeRegExp(token)}s([^a-z0-9]|$)`, "i").test(haystack)) {
        return true;
      }
      return false;
    }
    if (haystack.includes(token)) return true;
    if (!token.endsWith("s") && haystack.includes(`${token}s`)) return true;
    if (token.endsWith("s") && haystack.includes(token.slice(0, -1))) return true;
    return false;
  };

  if (parts.length === 1) return wordHit(parts[0]);
  // Phrase first, then flexible AND of tokens
  if (haystack.includes(t)) return true;
  return parts.every((p) => wordHit(p));
}

function scoreTopic(query: string, topic: KnowledgeTopic): number {
  let score = 0;
  let hits = 0;
  const q = normalize(query);

  for (const kw of topic.keywords) {
    if (termHits(q, kw)) {
      hits += 1;
      // Longer phrases score higher
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

  return score;
}

function formatResourcesFence(related: ChatResourceRef[] | undefined): string {
  if (!related?.length) return "";
  const payload = related.slice(0, 3).map((r) => ({
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

function buildResponse(topic: KnowledgeTopic): string {
  return (
    topic.answer +
    formatNextSteps(topic.nextSteps) +
    SAFETY_DISCLAIMER +
    formatResourcesFence(topic.related)
  );
}

export function matchKnowledge(query: string): EngineResult {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      topicId: GENERIC_TOPIC.id,
      score: 0,
      response: buildResponse(GENERIC_TOPIC),
      related: GENERIC_TOPIC.related || [],
    };
  }

  let best: KnowledgeTopic = GENERIC_TOPIC;
  let bestScore = 0;

  for (const topic of TOPICS) {
    const s = scoreTopic(trimmed, topic);
    if (s > bestScore) {
      bestScore = s;
      best = topic;
    }
  }

  if (bestScore < MATCH_THRESHOLD) {
    best = GENERIC_TOPIC;
    bestScore = 0;
  }

  return {
    topicId: best.id,
    score: bestScore,
    response: buildResponse(best),
    related: best.related || [],
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
      return { topicId: "too-long", score: 0, response: msg, related: [] };
    }

    if (this.isRateLimited(userId || "anon")) {
      const msg =
        "You've sent many messages recently. Please wait a moment, then ask again — or browse **/exercises**, **/diet**, **/guides/benefits-pip**." +
        SAFETY_DISCLAIMER;
      onChunk(msg);
      onComplete();
      return { topicId: "rate-limit", score: 0, response: msg, related: [] };
    }

    onStatus?.("Searching guidance…");

    let response = this.getCachedResponse(query);
    let result: EngineResult;

    if (response) {
      result = { topicId: "cache", score: 99, response, related: [] };
    } else {
      // Tiny delay so status can paint
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
    // Stream by paragraphs / sentences for smoother UX than dumping all at once
    const parts = text.split(/(\n\n+)/);
    let buffer = "";
    for (const part of parts) {
      buffer += part;
      // Emit in ~120–220 char slices inside large paragraphs
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

