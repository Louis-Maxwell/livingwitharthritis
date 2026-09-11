/**
 * Persist the last blog article the reader opened (slug + light meta).
 * Used for a "Continue reading" resume card on /blog — local only, no sync.
 */
const KEY = "lwa.lastRead.v1";

export interface LastReadArticle {
  slug: string;
  title?: string;
  excerpt?: string;
  category?: string;
  at: number;
}

function parse(raw: string | null): LastReadArticle | null {
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw) as Partial<LastReadArticle>;
    if (!obj || typeof obj.slug !== "string" || !obj.slug.trim()) return null;
    return {
      slug: obj.slug.trim(),
      title: typeof obj.title === "string" ? obj.title : undefined,
      excerpt: typeof obj.excerpt === "string" ? obj.excerpt : undefined,
      category: typeof obj.category === "string" ? obj.category : undefined,
      at: typeof obj.at === "number" ? obj.at : Date.now(),
    };
  } catch {
    return null;
  }
}

function write(store: Storage | undefined, value: LastReadArticle): void {
  try {
    if (!store) return;
    store.setItem(KEY, JSON.stringify(value));
  } catch {
    /* private mode / quota */
  }
}

function readStore(store: Storage | undefined): LastReadArticle | null {
  try {
    if (!store) return null;
    return parse(store.getItem(KEY));
  } catch {
    return null;
  }
}

/** Prefer session (this tab), fall back to localStorage. */
export function getLastRead(): LastReadArticle | null {
  if (typeof window === "undefined") return null;
  return readStore(window.sessionStorage) ?? readStore(window.localStorage);
}

export function setLastRead(input: {
  slug: string;
  title?: string;
  excerpt?: string;
  category?: string;
}): void {
  if (typeof window === "undefined") return;
  const slug = input.slug?.trim();
  if (!slug) return;
  const value: LastReadArticle = {
    slug,
    title: input.title,
    excerpt: input.excerpt,
    category: input.category,
    at: Date.now(),
  };
  write(window.sessionStorage, value);
  write(window.localStorage, value);
}

export function clearLastRead(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(KEY);
    window.localStorage.removeItem(KEY);
  } catch {
    /* no-op */
  }
}
