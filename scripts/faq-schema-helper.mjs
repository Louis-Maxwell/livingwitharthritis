/**
 * faq-schema-helper.mjs
 * Reusable FAQPage JSON-LD generator. Import into inject-canonicals.mjs
 * or any build script that needs to emit valid schema.org FAQPage markup.
 *
 * Usage:
 *   import { buildFaqSchema } from "./faq-schema-helper.mjs";
 *   const jsonLd = buildFaqSchema(pageFaqs);
 *   // inject `<script type="application/ld+json">${jsonLd}</script>` into <head>
 */

/**
 * @param {{q: string, a: string}[]} faqs
 * @returns {string} JSON-LD string ready to inject into a <script> tag
 */
export function buildFaqSchema(faqs) {
  if (!Array.isArray(faqs) || faqs.length === 0) return "";

  // Guard: never emit schema containing unresolved reviewer placeholders —
  // this would ship "[REVIEWER: ...]" text into a live JSON-LD block, which
  // is both a content-quality bug and a bad look in Google's Rich Results Test.
  const hasPlaceholder = faqs.some(
    (f) => /\[REVIEWER:/i.test(f.a) || /\[REVIEWER:/i.test(f.q)
  );
  if (hasPlaceholder) {
    throw new Error(
      "buildFaqSchema: refusing to emit schema — one or more FAQ entries " +
      "still contain a [REVIEWER: ...] placeholder. Fill in real content first."
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return JSON.stringify(schema);
}

/**
 * Builds a <title> and <meta description> pair from a scaffold record,
 * again refusing to emit if placeholders remain.
 * @param {{title_template: string, meta_template: string}} scaffold
 */
export function buildTitleMeta(scaffold) {
  if (/\[REVIEWER:/i.test(scaffold.meta_template)) {
    throw new Error(
      `buildTitleMeta: "${scaffold.slug ?? scaffold.title_template}" still has a ` +
      `[REVIEWER: ...] placeholder in its meta description.`
    );
  }
  return { title: scaffold.title_template, description: scaffold.meta_template };
}
