import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard, { type BlogCardPost } from "@/components/blog/BlogCard";
import { groupIntoShelves, SHELF_DISPLAY_ORDER, SHELVES_BY_ID, type ShelfId } from "@/lib/blog/shelves";

type ShelfCardPost = BlogCardPost & { keywords?: string | null };

const CARDS_PER_SHELF = 3;

/**
 * Topic shelves for /blog. Each shelf: H2, one-line description, three cards and a
 * "See all" disclosure that lists every guide on that shelf as plain links.
 * "See all" uses an in-page #hash only — no new URLs are created.
 */
const BlogTopicShelves = ({ posts }: { posts: ShelfCardPost[] }) => {
  const shelves = useMemo(() => groupIntoShelves(posts), [posts]);
  const [open, setOpen] = useState<Partial<Record<ShelfId, boolean>>>({});

  useEffect(() => {
    const sync = () => {
      const m = /^#shelf-([a-z]+)-all$/.exec(window.location.hash);
      if (m && m[1] in SHELVES_BY_ID) {
        setOpen((prev) => ({ ...prev, [m[1] as ShelfId]: true }));
        requestAnimationFrame(() => document.getElementById(`shelf-${m[1]}-all`)?.scrollIntoView({ block: "start" }));
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const visible = SHELF_DISPLAY_ORDER.filter((id) => shelves[id].length > 0);
  if (visible.length === 0) return null;

  return (
    <div className="mb-14">
      <nav aria-label="Jump to a topic shelf" className="mb-8">
        <ul className="flex flex-wrap gap-2">
          {visible.map((id) => (
            <li key={id}>
              <a
                href={`#shelf-${id}`}
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-background px-4 text-sm font-medium text-foreground/80 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {SHELVES_BY_ID[id].label}
                <span className="ml-1.5 tabular-nums text-muted-foreground">{shelves[id].length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {visible.map((id) => {
        const shelf = SHELVES_BY_ID[id];
        const items = shelves[id];
        const headingId = `shelf-${id}-heading`;
        return (
          <section key={id} id={`shelf-${id}`} aria-labelledby={headingId} className="scroll-mt-24 mb-14">
            <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div>
                <h2 id={headingId} className="font-display text-xl md:text-2xl font-bold text-foreground">
                  {shelf.label}
                </h2>
                <p className="mt-1 text-sm md:text-base text-muted-foreground">{shelf.description}</p>
              </div>
              <a
                href={`#shelf-${id}-all`}
                onClick={() => setOpen((prev) => ({ ...prev, [id]: true }))}
                className="shrink-0 inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                See all {items.length}
                <span className="sr-only"> {shelf.label.toLowerCase()} guides</span>
                <span aria-hidden="true">&nbsp;→</span>
              </a>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.slice(0, CARDS_PER_SHELF).map((post) => (
                <BlogCard key={`${id}-${post.slug}`} post={post} headingLevel="h3" />
              ))}
            </div>
            <details
              id={`shelf-${id}-all`}
              open={Boolean(open[id])}
              onToggle={(e) => {
                const isOpen = (e.currentTarget as HTMLDetailsElement).open;
                setOpen((prev) => (prev[id] === isOpen ? prev : { ...prev, [id]: isOpen }));
              }}
              className="scroll-mt-24 mt-5 rounded-2xl border border-border/60 bg-card"
            >
              <summary className="cursor-pointer min-h-11 px-5 py-3 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl">
                All {items.length} {shelf.label.toLowerCase()} guides
              </summary>
              <ul className="grid gap-x-6 gap-y-1 px-5 pb-4 text-sm sm:grid-cols-2">
                {items.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-block py-1.5 text-foreground/90 hover:text-primary hover:underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </section>
        );
      })}
    </div>
  );
};

export default BlogTopicShelves;
