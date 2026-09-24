/**
 * Pure helpers for the /blog/archive chronological listing.
 * Kept free of React so Vitest can assert every published slug appears.
 */
export type ArchiveListItem = {
  slug: string;
  title: string;
  meta_title?: string | null;
  excerpt?: string;
  date: string;
  category: string;
  updated_at?: string | null;
};

export type ArchiveMonthGroup = {
  /** YYYY-MM */
  key: string;
  year: number;
  month: number;
  label: string;
  posts: ArchiveListItem[];
};

export type ArchiveYearGroup = {
  year: number;
  months: ArchiveMonthGroup[];
  count: number;
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/** Prefer ISO date; fall back to updated_at when date is missing. */
export function archiveSortDate(post: ArchiveListItem): string {
  const d = (post.date || post.updated_at || "").slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : "1970-01-01";
}

export function formatArchiveDay(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

/**
 * Group published posts by year → month (newest first).
 * Posts without a parseable date land under year 1970 / month 1.
 */
export function groupPostsByYearMonth(posts: ArchiveListItem[]): ArchiveYearGroup[] {
  const byMonth = new Map<string, ArchiveListItem[]>();
  for (const post of posts) {
    const iso = archiveSortDate(post);
    const key = iso.slice(0, 7);
    const list = byMonth.get(key);
    if (list) list.push(post);
    else byMonth.set(key, [post]);
  }

  for (const list of byMonth.values()) {
    list.sort((a, b) => archiveSortDate(b).localeCompare(archiveSortDate(a)));
  }

  const monthKeys = [...byMonth.keys()].sort((a, b) => b.localeCompare(a));
  const years = new Map<number, ArchiveMonthGroup[]>();

  for (const key of monthKeys) {
    const [ys, ms] = key.split("-");
    const year = Number(ys);
    const month = Number(ms);
    const label = `${MONTH_NAMES[Math.max(0, Math.min(11, month - 1))] ?? "Unknown"} ${year}`;
    const group: ArchiveMonthGroup = {
      key,
      year,
      month,
      label,
      posts: byMonth.get(key) ?? [],
    };
    const existing = years.get(year);
    if (existing) existing.push(group);
    else years.set(year, [group]);
  }

  return [...years.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, months]) => ({
      year,
      months,
      count: months.reduce((n, m) => n + m.posts.length, 0),
    }));
}

/** Flat chronological list (newest first) — useful for snapshot tests. */
export function chronologicalArchiveSlugs(posts: ArchiveListItem[]): string[] {
  return [...posts]
    .sort((a, b) => {
      const byDate = archiveSortDate(b).localeCompare(archiveSortDate(a));
      if (byDate !== 0) return byDate;
      return a.slug.localeCompare(b.slug);
    })
    .map((p) => p.slug);
}
