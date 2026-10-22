import { useEffect, useState } from "react";
import { List } from "lucide-react";

type Item = { id: string; text: string };

const slug = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60);

/**
 * "Jump to" contents for long guides. Reads the page's own <h2> headings
 * after render (so it never drifts from the content), gives any heading
 * without an id a stable slug id, and renders a native <details> box that
 * is collapsible on phones and sticks below the header on wide screens.
 * Renders nothing when a page has fewer than 4 sections.
 */
export default function JumpToContents({
  containerId = "main-content",
  minItems = 4,
}: {
  containerId?: string;
  minItems?: number;
}) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const root = document.getElementById(containerId);
    if (!root) return;
    const seen = new Set<string>();
    const found: Item[] = [];
    root.querySelectorAll<HTMLHeadingElement>("h2").forEach((h) => {
      if (h.closest("[data-jump-to-skip]")) return;
      const text = (h.textContent || "").trim();
      if (!text) return;
      if (!h.id) {
        let id = slug(text) || "section";
        while (seen.has(id) || document.getElementById(id)) id = `${id}-x`;
        h.id = id;
      }
      h.classList.add("scroll-mt-28");
      seen.add(h.id);
      found.push({ id: h.id, text });
    });
    setItems(found);
  }, [containerId]);

  if (items.length < minItems) return null;

  return (
    <nav
      aria-label="Jump to section"
      data-jump-to-skip
      className="lg:sticky lg:top-24 z-20 mb-8 rounded-xl border border-border/60 bg-background/95 backdrop-blur shadow-sm"
    >
      <details className="group" open>
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 px-4 py-2 text-base font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
          <List className="h-4 w-4 text-primary" aria-hidden="true" />
          Jump to
          <span className="ml-auto text-sm font-normal text-muted-foreground group-open:hidden">Show</span>
          <span className="ml-auto hidden text-sm font-normal text-muted-foreground group-open:inline">Hide</span>
        </summary>
        <ol className="max-h-[50vh] overflow-y-auto px-4 pb-3 space-y-1 list-none">
          {items.map((it) => (
            <li key={it.id} className="text-base leading-snug">
              <a href={`#${it.id}`} className="block py-1 text-primary underline-offset-2 hover:underline">
                {it.text}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
