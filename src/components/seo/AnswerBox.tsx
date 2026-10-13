import { ReactNode } from "react";

interface AnswerBoxProps {
  /** Short question phrased like a search query (becomes the inner H2). */
  question: string;
  /** 40-60 word plain-English answer. LLMs lift this verbatim. */
  children: ReactNode;
  /** Optional last-reviewed date (ISO YYYY-MM-DD) shown to readers. */
  reviewed?: string;
  /** Verified reviewer label. Review copy is hidden when this is absent. */
  reviewer?: string;
}

/**
 * AEO/GEO "Answer Box" — a styled lead paragraph placed under each
 * page H1 so AI answer engines (ChatGPT, Perplexity, Google AI Overviews)
 * can lift a clean, attributable summary. Class `speakable-intro` matches
 * the Speakable schema selector emitted by PageSchema.
 *
 * Follows the project visual identity: white background, black text,
 * red left rule. No borders elsewhere.
 */
export default function AnswerBox({
  question,
  children,
  reviewed,
  reviewer,
}: AnswerBoxProps) {
  return (
    <aside
      className="speakable-intro my-8 pl-5 border-l-4 border-primary bg-white"
      itemScope
      itemType="https://schema.org/Question"
    >
      <h2
        className="text-lg font-semibold text-foreground mb-2"
        itemProp="name"
      >
        {question}
      </h2>
      <div
        className="text-base leading-relaxed text-foreground"
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <div itemProp="text">{children}</div>
      </div>
      {reviewed && reviewer && (
        <p className="mt-2 text-xs text-foreground/70">
          Reviewed by {reviewer}. Last reviewed{" "}
          <time dateTime={reviewed}>{reviewed}</time>.
        </p>
      )}
    </aside>
  );
}
