import records from "../data/reviewRecords.json" with { type: "json" };
import libraryStatus from "../data/libraryReviewStatus.json" with { type: "json" };
import { conditionSubpages } from "../data/conditionSubpages.ts";

const BASE = "https://livingwitharthritis.org.uk";
const conditions: Record<string, [string, string?]> = {
  "arthritis": ["Arthritis", "https://www.nhs.uk/conditions/arthritis/"],
  "osteoarthritis": ["Osteoarthritis", "https://www.nhs.uk/conditions/osteoarthritis/"],
  "rheumatoid-arthritis": ["Rheumatoid arthritis", "https://www.nhs.uk/conditions/rheumatoid-arthritis/"],
  "psoriatic-arthritis": ["Psoriatic arthritis", "https://www.nhs.uk/conditions/psoriatic-arthritis/"],
  "ankylosing-spondylitis": ["Ankylosing spondylitis", "https://www.nhs.uk/conditions/ankylosing-spondylitis/"],
  "gout": ["Gout", "https://www.nhs.uk/conditions/gout/"],
  "lupus": ["Lupus", "https://www.nhs.uk/conditions/lupus/"],
  "polymyalgia-rheumatica": ["Polymyalgia rheumatica", "https://www.nhs.uk/conditions/polymyalgia-rheumatica/"],
  "reactive-arthritis": ["Reactive arthritis", "https://www.nhs.uk/conditions/reactive-arthritis/"],
  "fibromyalgia": ["Fibromyalgia", "https://www.nhs.uk/conditions/fibromyalgia/"],
};
const aliases: Record<string, string> = { polymyalgia: "polymyalgia-rheumatica", "what-is-gout": "gout", "gout-symptoms": "gout", "lupus-symptoms": "lupus" };

/** Stable medical-entity identities; external equivalence only where sourced. */
export function medicalEntityForRoute(route: string, fallback = "Arthritis information") {
  const parts = route.split("/").filter(Boolean);
  if (!["conditions", "library", "exercises"].includes(parts[0]) || !parts[1]) return undefined;
  const slug = aliases[parts[1]] || parts[1];
  const known = conditions[slug];
  return {
    "@type": parts[0] === "conditions" || known ? "MedicalCondition" : "MedicalEntity",
    "@id": `${BASE}${known ? `/conditions/${slug}` : `/${parts[0]}/${slug}`}#medical-entity`,
    name: known?.[0] || fallback,
    ...(known?.[1] ? { sameAs: [known[1]] } : {}),
  };
}

export function recordedRouteReview(route: string): string | undefined {
  const direct = (records.pages as Record<string, string>)[route];
  if (direct) return direct;
  const m = /^\/conditions\/([^/]+)\/(symptoms|treatment|exercises|diet)$/.exec(route);
  if (m && conditionSubpages[m[1]]) return records.conditionSubpage;
  const library = /^\/library\/([^/]+)$/.exec(route);
  if (library) {
    const entry = (libraryStatus as Record<string, { reviewStatus: string; lastReviewed?: string }>)[library[1]];
    return entry ? entry.reviewStatus === "reviewed" ? entry.lastReviewed : undefined : records.librarySitewide;
  }
  return undefined;
}

type Node = Record<string, unknown>;
/** Keep one page and one FAQ node after hydration, with recorded review only. */
export function normaliseRouteSchemaEntries(entries: unknown[], route: string, preferred: boolean[] = []): unknown[] {
  if (!/^\/(conditions|library|exercises)(\/|$)/.test(route) && route !== "/guides/benefits-pip") return entries;
  const review = recordedRouteReview(route);
  let pageSeen = false;
  let faqSeen = false;
  const visit = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(visit).filter(x => x !== null);
    if (!value || typeof value !== "object") return value;
    const node = { ...value } as Node;
    const types = [node["@type"]].flat();
    if (types.includes("FAQPage")) {
      if (faqSeen) return null;
      faqSeen = true;
    }
    if (types.some(t => ["WebPage", "MedicalWebPage"].includes(String(t)))) {
      if (pageSeen) return null;
      pageSeen = true;
      node["@id"] = `${BASE}${route}#webpage`;
      node.url = `${BASE}${route}`;
      node["@type"] = route === "/guides/benefits-pip" ? "WebPage" : "MedicalWebPage";
      const entity = medicalEntityForRoute(route, String((node.about as Node)?.name || node.headline || node.name || "Arthritis information"));
      if (entity) node.about = { ...((node.about && typeof node.about === "object" && !Array.isArray(node.about)) ? node.about as Node : {}), ...entity };
      delete node.reviewedBy;
      delete node.lastReviewed;
      if (review) {
        node.reviewedBy = { "@type": "Person", "@id": `${BASE}/authors/maxwell#person`, name: "Louis Maxwell", identifier: "HCPC PH128483" };
        node.lastReviewed = review;
      }
    }
    if (Array.isArray(node["@graph"])) node["@graph"] = visit(node["@graph"]);
    return node;
  };
  // Prefer app-owned nodes: static nodes may be removed by Helmet after this pass.
  // Keep output indices stable so each result is written to its original script.
  const output: unknown[] = new Array(entries.length);
  entries.map((value, index) => ({ value, index }))
    .sort((a, b) => Number(Boolean(preferred[b.index])) - Number(Boolean(preferred[a.index])))
    .forEach(({ value, index }) => { output[index] = visit(value); });
  return output;
        }
