/**
 * Parse the optional ```resources JSON block the assistant may emit at the
 * end of its reply. Returns the parsed resources plus the assistant text
 * with the fenced block removed so the UI renders clean markdown.
 */

export interface ChatResource {
  type: "guide" | "exercise" | "condition" | "article" | "video";
  title: string;
  url: string;
  description?: string;
}

const RESOURCE_FENCE_RE = /```resources\s*\n([\s\S]*?)```/i;
const ALLOWED_TYPES: ChatResource["type"][] = [
  "guide",
  "exercise",
  "condition",
  "article",
  "video",
];

export function extractResources(text: string): {
  cleanText: string;
  resources: ChatResource[];
} {
  if (!text) return { cleanText: text, resources: [] };
  const match = text.match(RESOURCE_FENCE_RE);
  if (!match) return { cleanText: text, resources: [] };

  const jsonBody = match[1].trim();
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonBody);
  } catch {
    // If the block is still streaming and incomplete, hide the raw JSON
    // from the user but keep it out of the parsed set.
    return { cleanText: text.replace(RESOURCE_FENCE_RE, "").trim(), resources: [] };
  }

  if (!Array.isArray(parsed)) {
    return { cleanText: text.replace(RESOURCE_FENCE_RE, "").trim(), resources: [] };
  }

  const resources: ChatResource[] = parsed
    .slice(0, 3)
    .map((raw): ChatResource | null => {
      if (!raw || typeof raw !== "object") return null;
      const r = raw as Record<string, unknown>;
      const type = typeof r.type === "string" ? r.type.toLowerCase() : "";
      const title = typeof r.title === "string" ? r.title.trim() : "";
      const url = typeof r.url === "string" ? r.url.trim() : "";
      if (!title || !url) return null;
      if (!ALLOWED_TYPES.includes(type as ChatResource["type"])) return null;
      // Only allow relative internal URLs — never arbitrary external links.
      if (!url.startsWith("/")) return null;
      const description = typeof r.description === "string" ? r.description.trim() : undefined;
      return { type: type as ChatResource["type"], title, url, description };
    })
    .filter((r): r is ChatResource => r !== null);

  const cleanText = text.replace(RESOURCE_FENCE_RE, "").trim();
  return { cleanText, resources };
}

/**
 * Detects whether a partially streamed response contains an unclosed
 * `resources fence, so the UI can hide the raw JSON until the block closes.
 */
export function stripStreamingResourceFence(text: string): string {
  if (!text) return text;
  const openIdx = text.search(/```resources/i);
  if (openIdx === -1) return text;
  const afterOpen = text.slice(openIdx);
  if (RESOURCE_FENCE_RE.test(afterOpen)) return text; // handled by extractResources
  // Fence opened but not closed — trim it from the display buffer.
  return text.slice(0, openIdx).trimEnd();
}
