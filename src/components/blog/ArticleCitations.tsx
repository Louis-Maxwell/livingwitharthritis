import { ExternalLink } from "lucide-react";

export interface Citation {
  label: string;
  url: string;
  publisher?: string;
}

interface Props {
  citations?: Citation[];
  title?: string;
}

export default function ArticleCitations({ citations = [], title = "Sources & References" }: Props) {
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
        Sources used for this article are listed below. Always consult a
        qualified healthcare professional for personal advice.
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
