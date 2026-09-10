/**
 * Local-only bookmarks for blog articles, keyed by slug.
 * No PII, no network sync — accessible toggle UI only.
 */
const KEY = "lwa.bookmarks.v1";
const CAP = 100;

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

export function getBookmarks(): Set<string> {
  return new Set(safeRead());
}

export function isBookmarked(slug: string): boolean {
  if (!slug) return false;
  return getBookmarks().has(slug);
}

export function toggleBookmark(slug: string): boolean {
  if (!slug) return false;
  const list = safeRead();
  const idx = list.indexOf(slug);
  if (idx >= 0) {
    list.splice(idx, 1);
    safeWrite(list);
    return false;
  }
  list.push(slug);
  safeWrite(list);
  return true;
}

export function setBookmark(slug: string, on: boolean): void {
  if (!slug) return;
  const list = safeRead().filter((s) => s !== slug);
  if (on) list.push(slug);
  safeWrite(list);
}
