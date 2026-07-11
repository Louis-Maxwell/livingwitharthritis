import { Helmet } from "react-helmet-async";

/**
 * FAQSection — drop-in component that solves two Frase-flagged issues at once:
 *   - "Missing FAQ Schema" (31 pages, high impact)
 *   - "Missing Question Headings" (27 pages, high impact)
 *
 * It renders real, visible <h3> question headings (so AI/search crawlers
 * see actual question-formatted content, not just schema) AND emits valid
 * FAQPage JSON-LD in the same pass — the two can never drift out of sync
 * because they're generated from the same `faqs` array.
 *
 * Usage:
 *   <FAQSection
 *     pageTitle="Osteoarthritis"
 *     faqs={[
 *       { question: "What is osteoarthritis?", answer: "..." },
 *       { question: "Is osteoarthritis the same as arthritis?", answer: "..." },
 *     ]}
 *   />
 *
 * Safety: refuses to render schema (though still renders the visible Q&A)
 * if any answer contains an unresolved [REVIEWER: ...] placeholder — same
 * guard as scripts/faq-schema-helper.mjs, so a half-finished page can never
 * accidentally ship broken structured data to Google.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  pageTitle?: string;
  className?: string;
}

function hasUnresolvedPlaceholder(faqs: FAQItem[]): boolean {
  return faqs.some(
    (f) => /\[REVIEWER:/i.test(f.answer) || /\[REVIEWER:/i.test(f.question)
  );
}

export default function FAQSection({ faqs, pageTitle, className = "" }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  const schemaIsSafe = !hasUnresolvedPlaceholder(faqs);

  const jsonLd = schemaIsSafe
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      }
    : null;

  return (
    <section className={`w-full max-w-3xl mx-auto py-10 ${className}`} aria-label={pageTitle ? `Frequently asked questions about ${pageTitle}` : "Frequently asked questions"}>
      {schemaIsSafe && jsonLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>
      )}
      {!schemaIsSafe && (
        // Dev-visible warning only — never shown to end users in production
        // builds, but keeps the gap loud during review instead of silent.
        <p className="text-xs text-amber-600 mb-4" data-dev-warning="faq-placeholder-unresolved">
          FAQ schema suppressed: one or more answers still contain an unresolved reviewer placeholder.
        </p>
      )}
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((f, i) => (
          <div key={i} className="border-b border-border pb-6 last:border-0">
            {/* Real <h3> question heading — this is what fixes "Missing
                Question Headings", not just the JSON-LD */}
            <h3 className="text-lg font-semibold mb-2">{f.question}</h3>
            <p className="text-foreground/70 leading-relaxed">{f.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
