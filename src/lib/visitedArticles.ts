/**
 * Local-only tracker for which blog slugs the visitor has already read.
 * Used to bias "People also read" toward unvisited articles.
 * No PII, no network sync.
 */
const KEY = "lwa.visited.v1";
const CAP = 200;

function safeRead(): string[] {
  try {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function safeWrite(slugs: string[]): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(KEY, JSON.stringify(slugs.slice(-CAP)));
  } catch {
    /* private mode / quota — no-op */
  }
}

export function getVisited(): Set<string> {
  return new Set(safeRead());
}

export function markVisited(slug: string): void {
  if (!slug) return;
  const list = safeRead().filter((s) => s !== slug);
  list.push(slug);
  safeWrite(list);
}

export interface SlugLike {
  slug: string;
}

/** Drop the current slug; partition rest into [unvisited, visited]. */
export function partitionByVisited<T extends SlugLike>(
  items: T[],
  currentSlug?: string,
): { unvisited: T[]; visited: T[] } {
  const seen = getVisited();
  const unvisited: T[] = [];
  const visited: T[] = [];
  for (const item of items) {
    if (currentSlug && item.slug === currentSlug) continue;
    if (seen.has(item.slug)) visited.push(item);
    else unvisited.push(item);
  }
  return { unvisited, visited };
}
