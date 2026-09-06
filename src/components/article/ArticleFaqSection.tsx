import { HelpCircle } from "lucide-react";

interface Faq {
  question: string;
  answer: string;
}

interface Props {
  faqs: Faq[];
}

/**
 * Visible FAQ block at the bottom of blog posts.
 * Uses native <details> for accessible expand/collapse without JS weight.
 * Same Q&A pairs feed FAQPage JSON-LD in BlogPost.
 */
const ArticleFaqSection = ({ faqs }: Props) => {
  if (faqs.length < 2) return null;

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="speakable-faq not-prose mt-14 pt-10 border-t border-border/20"
    >
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="w-5 h-5 text-primary" aria-hidden="true" />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground m-0">
          Frequently asked questions
        </h2>
      </div>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details
            key={i}
            className="group rounded-xl border border-border/50 bg-secondary/40 shadow-sm open:bg-secondary/60"
            open={i === 0}
          >
            <summary className="cursor-pointer list-none flex items-center justify-between gap-3 p-5 md:px-6 min-h-[44px] font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
              <span>{f.question}</span>
              <span
                aria-hidden="true"
                className="shrink-0 text-primary text-lg leading-none transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="px-5 md:px-6 pb-5 text-foreground/80 leading-relaxed">
              {f.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default ArticleFaqSection;
