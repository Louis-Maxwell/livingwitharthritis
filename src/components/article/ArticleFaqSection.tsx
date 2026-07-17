import { HelpCircle } from "lucide-react";

interface Faq {
  question: string;
  answer: string;
}

interface Props {
  faqs: Faq[];
}

/**
 * Visible FAQ block rendered at the bottom of every blog post.
 * Reuses the same Q&A pairs the template already extracts for FAQPage JSON-LD,
 * so we don't duplicate content — the schema and the visible block match.
 *
 * Skips render when the extracted list is only the generic fallback (question
 * text contains "this article about" — the fallback marker in extractFaqs).
 */
const ArticleFaqSection = ({ faqs }: Props) => {
  const real = faqs.filter((f) => !/this article about/i.test(f.question));
  if (real.length < 2) return null;

  return (
    <section
      aria-label="Frequently asked questions"
      className="not-prose mt-14 pt-10 border-t border-border/20"
    >
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="w-5 h-5 text-primary" aria-hidden="true" />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground m-0">
          Frequently asked questions
        </h2>
      </div>
      <dl className="space-y-6">
        {real.map((f, i) => (
          <div key={i} className="rounded-xl border border-border/40 bg-secondary/30 p-5">
            <dt className="font-semibold text-foreground mb-2">{f.question}</dt>
            <dd className="text-foreground/80 leading-relaxed m-0">{f.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default ArticleFaqSection;
