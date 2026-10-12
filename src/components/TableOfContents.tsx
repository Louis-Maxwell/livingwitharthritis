import { memo, useMemo, useState, useEffect } from "react";
import { List, ChevronDown } from "lucide-react";
import { stripHtml } from "@/lib/sanitize";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(html: string): TocItem[] {
  const regex = /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi;
  const items: TocItem[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const text = stripHtml(match[3]).trim();
    const id =
      match[2].match(/\bid=["']([^"']+)["']/i)?.[1] ||
      text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    if (text) items.push({ id, text, level });
  }
  return items;
}

interface TableOfContentsProps {
  html: string;
  /** sticky = desktop sidebar; inline = collapsible in-flow (default / mobile). */
  variant?: "inline" | "sticky";
  className?: string;
}

const TableOfContents = memo(({ html, variant = "inline", className = "" }: TableOfContentsProps) => {
  const headings = useMemo(() => extractHeadings(html), [html]);
  const [activeId, setActiveId] = useState("");
  const isSticky = variant === "sticky";
  const [isOpen, setIsOpen] = useState(() =>
    typeof window !== "undefined"
      ? isSticky || window.matchMedia("(min-width: 768px)").matches
      : true,
  );

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0.1 },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  const list = (
    <ol id={isSticky ? "blog-toc-sticky-list" : "blog-toc-list"} className="px-4 pb-4 space-y-0.5 max-h-[min(70vh,28rem)] overflow-y-auto">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            onClick={(e) => {
              e.preventDefault();
              const heading = document.getElementById(h.id);
              const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
              heading?.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start",
              });
              if (heading) {
                const previousTabIndex = heading.getAttribute("tabindex");
                heading.setAttribute("tabindex", "-1");
                heading.focus({ preventScroll: true });
                heading.addEventListener("blur", () => {
                  if (previousTabIndex === null) heading.removeAttribute("tabindex");
                  else heading.setAttribute("tabindex", previousTabIndex);
                }, { once: true });
              }
              if (!isSticky) setIsOpen(false);
            }}
            className={`block py-2 min-h-[44px] text-[13px] leading-snug transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm ${
              h.level === 3 ? "pl-4 border-l border-border/30" : ""
            } ${activeId === h.id ? "text-primary font-semibold" : "text-muted-foreground"}`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );

  if (isSticky) {
    return (
      <nav
        aria-label="Table of contents"
        className={`rounded-xl border border-border/40 bg-card/95 backdrop-blur-sm shadow-sm overflow-hidden ${className}`}
      >
        <div className="px-4 py-3 border-b border-border/30">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <List className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            On this page
          </span>
        </div>
        {list}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Table of contents"
      className={`mb-10 rounded-xl border border-border/30 bg-muted/40 overflow-hidden shadow-sm ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="blog-toc-list"
        className="w-full flex items-center justify-between px-5 py-3.5 min-h-[44px] text-left hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <List className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
          On this page
        </span>
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="hidden sm:inline">{headings.length} sections</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </span>
      </button>
      {isOpen && list}
    </nav>
  );
});

TableOfContents.displayName = "TableOfContents";
export default TableOfContents;

/** Adds id attributes to h2/h3 tags that don't have them */
// eslint-disable-next-line react-refresh/only-export-components
export function addHeadingIds(html: string): string {
  const used = new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((m) => m[1]));
  return html.replace(
    /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level, attrs, content) => {
      if (/\bid=["']/.test(attrs)) return match;
      const text = stripHtml(content).trim();
      const base = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "section";
      let id = base;
      let suffix = 2;
      while (used.has(id)) id = `${base}-${suffix++}`;
      used.add(id);
      return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
    },
  );
}
