/**
 * AnswerBlock — the AEO "AI snippet" callout placed at the top of long-form
 * pages so assistants (ChatGPT, Gemini, Perplexity, Google AI Overviews) can
 * lift a clean one-paragraph answer and cite the page.
 *
 * Pair with <PageSchema speakableSelector=".speakable-answer" /> so voice
 * assistants pick it up too.
 *
 * Usage:
 *   <AnswerBlock
 *     question="What is the best diet for osteoarthritis?"
 *     answer="An anti-inflammatory Mediterranean pattern..."
 *     sources={[{ label: "NICE NG226", href: "https://..." }]}
 *   />
 */

import { CheckCircle2 } from 'lucide-react';

export interface AnswerSource {
  label: string;
  href: string;
}

interface AnswerBlockProps {
  question: string;
  answer: string;
  bullets?: string[];
  sources?: AnswerSource[];
  /** Optional updated date shown to readers and machines. ISO yyyy-mm-dd. */
  updated?: string;
}

export default function AnswerBlock({
  question,
  answer,
  bullets,
  sources,
  updated,
}: AnswerBlockProps) {
  return (
    <aside
      className="speakable-answer my-8 rounded-lg bg-muted/40 p-6 md:p-8"
      aria-labelledby="answer-block-q"
      data-aeo="answer-block"
    >
      <p
        className="text-xs uppercase tracking-widest text-foreground/60 mb-2"
      >
        Quick answer
      </p>
      <h2
        id="answer-block-q"
        className="text-xl md:text-2xl font-semibold mb-3"
      >
        {question}
      </h2>
      <p className="text-base md:text-lg leading-relaxed">{answer}</p>

      {bullets && bullets.length > 0 && (
        <ul className="mt-4 space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2 items-start">
              <CheckCircle2
                className="h-5 w-5 mt-0.5 shrink-0 text-primary"
                aria-hidden
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {(sources?.length || updated) && (
        <footer className="mt-4 pt-4 border-t border-foreground/10 text-sm text-foreground/70 flex flex-wrap gap-x-4 gap-y-1">
          {updated && (
            <span>
              Reviewed <time dateTime={updated}>{updated}</time>
            </span>
          )}
          {sources?.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-primary"
            >
              {s.label}
            </a>
          ))}
        </footer>
      )}
    </aside>
  );
}
