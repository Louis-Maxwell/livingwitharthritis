import React from "react";

interface CitationQuoteProps {
  text: string;
  source: string;
  sourceUrl?: string;
}

/**
 * Pull-quote citation with semantic <blockquote cite="..."> markup.
 * Use for highlighted quotes from clinical guidelines or research.
 */
export function CitationQuote({ text, source, sourceUrl }: CitationQuoteProps) {
  return (
    <blockquote
      cite={sourceUrl}
      className="border-l-4 border-primary pl-4 italic my-6 text-foreground/85"
    >
      &ldquo;{text}&rdquo;
      {sourceUrl ? (
        <a
          href={sourceUrl}
          className="not-italic text-primary hover:underline ml-2"
          rel="noopener noreferrer"
        >
          — {source}
        </a>
      ) : (
        <span className="not-italic text-foreground/70 ml-2">— {source}</span>
      )}
    </blockquote>
  );
}

/**
 * Inline citation marker using the semantic <cite> element.
 * Renders as a small pill, machine-readable for AI crawlers.
 */
export function Citation({ text }: { text: string }) {
  return (
    <cite className="not-italic text-primary text-sm bg-primary/5 px-2 py-1 rounded">
      {text}
    </cite>
  );
}
