import { Link } from "react-router-dom";
import { Search, KeyRound, Type, ListTree, HeartHandshake, Tags, Link2, BookOpenCheck } from "lucide-react";

const STEPS = [
  {
    n: 1,
    title: "Search intent",
    body: "Name the reader's job in one sentence — informational, navigational, or transactional — in UK patient language.",
    Icon: Search,
  },
  {
    n: 2,
    title: "Keyword",
    body: "Choose one primary phrase plus a few related terms. Use them naturally in the title, H1, opening, and one H2.",
    Icon: KeyRound,
  },
  {
    n: 3,
    title: "Strong title",
    body: "Clear, benefit-led, and scannable. Prefer UK spellings and place cues (UK, PIP, NHS) when they help intent.",
    Icon: Type,
  },
  {
    n: 4,
    title: "Clear H2/H3 outline",
    body: "Outline before drafting. One H1 only. H2s answer sub-intents; H3s support. The on-page TOC must match real headings.",
    Icon: ListTree,
  },
  {
    n: 5,
    title: "Helpful content",
    body: "Empathy-led short paragraphs and practical steps. No fake stats, invented clinicians, or miracle claims.",
    Icon: HeartHandshake,
  },
  {
    n: 6,
    title: "On-page SEO",
    body: "Unique meta title and description, breadcrumb, OG tags, en-GB locale, and geo.region GB — without stuffing.",
    Icon: Tags,
  },
  {
    n: 7,
    title: "Internal links",
    body: "Point to the closest hub (/exercises, /diet, /guides, /benefits-pip, /blog) plus a few related guides.",
    Icon: Link2,
  },
  {
    n: 8,
    title: "Readability",
    body: "Plain English, scannable lists, key takeaways, and FAQ when the article answers real questions.",
    Icon: BookOpenCheck,
  },
] as const;

interface Props {
  /** When true, omit the outer page chrome and keep a compact embed. */
  compact?: boolean;
  /** Show a link to the standalone framework page. */
  showStandaloneLink?: boolean;
}

/**
 * Louis Maxwell's 8-step SEO content framework — used on Editorial Standards
 * and the lightweight /seo-content-framework page.
 */
export default function SeoContentFramework({
  compact = false,
  showStandaloneLink = true,
}: Props) {
  return (
    <section
      id="seo-content-framework"
      aria-labelledby="seo-content-framework-heading"
      className={compact ? "mb-10" : "mb-12 scroll-mt-24"}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Type className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <h2
          id="seo-content-framework-heading"
          className="font-display text-xl md:text-2xl font-bold text-foreground"
        >
          How we write SEO content
        </h2>
      </div>

      <p className="text-foreground/85 leading-relaxed mb-4 max-w-2xl">
        Great SEO content = <strong>search intent</strong> + <strong>clarity</strong> +{" "}
        <strong>helpful value</strong>. Every new guide and blog post follows this eight-step
        framework so UK readers get a direct answer first, then a clear outline and practical help.
      </p>

      <figure className="mb-8 rounded-2xl border border-border/40 overflow-hidden bg-card shadow-sm">
        <img
          src="/og/seo-content-framework.png"
          alt="How to write SEO content: eight steps from search intent and keyword through strong title, H2/H3 outline, helpful content, on-page SEO, internal links, and readability"
          width={1200}
          height={630}
          loading="lazy"
          decoding="async"
          className="w-full h-auto"
        />
        <figcaption className="px-4 py-3 text-xs text-muted-foreground border-t border-border/30">
          Living With Arthritis UK SEO content framework — Motion is Lotion, charity 1218461 (UK national charity).
        </figcaption>
      </figure>

      <ol className="grid gap-3 sm:grid-cols-2 mb-6">
        {STEPS.map(({ n, title, body, Icon }) => (
          <li
            key={n}
            className="rounded-xl border border-border/40 bg-card/60 p-4 flex gap-3"
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold"
              aria-hidden="true"
            >
              {n}
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-foreground text-sm flex items-center gap-1.5 mb-1">
                <Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                {title}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed m-0">{body}</p>
            </div>
          </li>
        ))}
      </ol>

      {showStandaloneLink && (
        <p className="text-sm text-muted-foreground">
          Agents and authors: see{" "}
          <Link
            to="/seo-content-framework"
            className="text-primary underline hover:no-underline font-medium"
          >
            the full framework page
          </Link>{" "}
          and <code className="text-xs">docs/SEO-CONTENT-FRAMEWORK.md</code>.
        </p>
      )}
    </section>
  );
}
