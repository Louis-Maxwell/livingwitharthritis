import { ExternalLink } from "lucide-react";

export interface Citation {
  label: string;
  url: string;
  publisher?: string;
}

/**
 * Pre-approved authoritative sources for medical/health claims.
 * Used as the default citation set on every blog article unless
 * the article supplies its own.
 */
export const DEFAULT_CITATIONS: Citation[] = [
  { label: "Osteoarthritis — overview, symptoms and treatment", url: "https://www.nhs.uk/conditions/osteoarthritis/", publisher: "NHS" },
  { label: "Osteoarthritis: care and management (NG226)", url: "https://www.nice.org.uk/guidance/ng226", publisher: "NICE" },
  { label: "Rheumatoid arthritis in adults: management (NG100)", url: "https://www.nice.org.uk/guidance/ng100", publisher: "NICE" },
  { label: "Arthritis — symptoms and causes", url: "https://www.mayoclinic.org/diseases-conditions/arthritis/symptoms-causes/syc-20350772", publisher: "Mayo Clinic" },
  { label: "Osteoarthritis fact sheet", url: "https://www.who.int/news-room/fact-sheets/detail/osteoarthritis", publisher: "World Health Organization" },
  { label: "Arthritis — basics", url: "https://www.cdc.gov/arthritis/basics/index.html", publisher: "Centers for Disease Control and Prevention" },
];

interface Props {
  citations?: Citation[];
  title?: string;
}

export default function ArticleCitations({ citations = DEFAULT_CITATIONS, title = "Sources & References" }: Props) {
  if (!citations.length) return null;
  return (
    <section
      aria-labelledby="article-sources-heading"
      className="mt-14 pt-8 border-t border-border/20"
    >
      <h2
        id="article-sources-heading"
        className="font-display text-xl md:text-2xl font-bold text-foreground mb-4"
      >
        {title}
      </h2>
      <p className="text-sm text-muted-foreground mb-5">
        Medical and clinical statements in this article are informed by the
        following pre-approved authoritative sources. Always consult a qualified
        healthcare professional for personal advice.
      </p>
      <ol className="space-y-3 list-decimal list-inside text-sm">
        {citations.map((c, i) => (
          <li key={i} className="text-foreground/85 leading-relaxed">
            <span className="font-medium">Source: </span>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-1 text-primary underline underline-offset-2 hover:opacity-80"
            >
              {c.publisher ?? c.label}
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
            {c.publisher && <span className="text-foreground/80"> — {c.label}</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}
