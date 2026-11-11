// Builds the crawler head fields for /guides/benefits-pip from the same
// content the page renders, so the static HTML and the React page match.
import {
  PIP_GUIDE_ANSWER,
  PIP_GUIDE_FAQS,
  PIP_GUIDE_HTML,
  PIP_HOWTO_STEPS,
} from "./pipGuideContent";
import { FIN_DIR_FAQS } from "./financialHelpDirectoryContent";
import { PAGE_AEO } from "../page-aeo";
import { CITATIONS_PIP_CLAIM } from "../clinical/ukCitations";

/** Visible FAQ list on the page (PIP FAQs, then the financial help directory), de-duplicated. */
export function pipGuideVisibleFaqs(): { question: string; answer: string }[] {
  const seen = new Set<string>();
  return [...PIP_GUIDE_FAQS, ...FIN_DIR_FAQS].filter((f) => {
    const key = f.question.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildPipGuideHead() {
  const aeo = PAGE_AEO["/guides/benefits-pip"];
  // The static page renders its own sources list, and keeps the donate line out of the crawler copy.
  const bodyHtml = PIP_GUIDE_HTML.replace(/\n*<p>If this guide helped you[\s\S]*?<\/p>/, "")
    .replace(/<h2 id="sources">[\s\S]*$/, "")
    .trimEnd();
  return {
    question: aeo.question,
    answer: PIP_GUIDE_ANSWER,
    keyTakeaways: aeo.takeaways ?? [],
    bodyHtml,
    updatedAt: "2026-11-11",
    howTo: {
      name: "How to claim PIP for arthritis",
      description: PIP_GUIDE_ANSWER,
      steps: PIP_HOWTO_STEPS.map((s) => ({ id: s.id, name: s.name, text: s.text })),
    },
    faqs: pipGuideVisibleFaqs().map((f) => ({ q: f.question, a: f.answer })),
    sources: CITATIONS_PIP_CLAIM.map((c) => ({ name: `${c.publisher}: ${c.label}`, url: c.url })),
  };
}
