#!/usr/bin/env node
/**
 * Evidence coverage audit for published medical blog articles.
 * Flags evidence gaps; it does not fabricate references or approve claims.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const POSTS = resolve("src/content/blog/posts");
const OUT = resolve("reports/medical-evidence-audit.json");
const AUTHORITIES = [
  { name: "NHS", domains: ["nhs.uk", "111.nhs.uk"] },
  { name: "NICE", domains: ["nice.org.uk"] },
  { name: "Versus Arthritis", domains: ["versusarthritis.org", "arthritis-uk.org"] },
  { name: "Arthritis Foundation", domains: ["arthritis.org"] },
  { name: "Peer-reviewed research", domains: ["pubmed.ncbi.nlm.nih.gov", "doi.org", "bmj.com", "thelancet.com", "jamanetwork.com", "cochranelibrary.com", "nature.com"] },
  { name: "GOV.UK", domains: ["gov.uk"] },
];
const MEDICAL_TERMS = /arthritis|osteoarthritis|rheumatoid|joint pain|mobility|exercise|nutrition|vitamin d|inflammation|frailty|healthy ageing|self-management|supplement|medicine|pain relief|fall/i;

function authorityFor(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\\./, "").toLowerCase();
    return AUTHORITIES.find((authority) => authority.domains.some((domain) => host === domain || host.endsWith("." + domain)))?.name ?? null;
  } catch {
    return null;
  }
}
function text(value) {
  return String(value ?? "").replace(/<[^>]*>/g, " ").replace(/\\s+/g, " ").trim();
}
if (!existsSync(POSTS)) throw new Error("Missing " + POSTS);
const posts = readdirSync(POSTS).filter((name) => name.endsWith(".json")).map((name) => JSON.parse(readFileSync(join(POSTS, name), "utf8"))).filter((post) => post.is_published);

const articles = posts.map((post) => {
  const urls = [
    ...(Array.isArray(post.citations) ? post.citations.map((citation) => citation.url) : []),
    ...[...String(post.content ?? "").matchAll(/href=["'](https?:\\/\\/[^"']+)["']/gi)].map((match) => match[1]),
  ];
  const authorities = [...new Set(urls.map(authorityFor).filter(Boolean))];
  const claimsText = text([post.title, post.excerpt, post.direct_answer, post.content].join(" "));
  const medical = MEDICAL_TERMS.test(claimsText);
  const issues = [];
  const recommendations = [];
  if (medical && authorities.length === 0) {
    issues.push("medical content has no recognised authoritative source");
    recommendations.push("Add relevant NHS or NICE guidance and peer-reviewed evidence before publication.");
  }
  if (medical && !post.citations?.length) {
    issues.push("structured citations are missing");
    recommendations.push("Add visible citations with label, absolute URL and publisher.");
  }
  if (medical && (!post.reviewed_by || !post.reviewer_credentials || !post.last_reviewed)) {
    issues.push("clinical reviewer, credentials or review date is incomplete");
    recommendations.push("Obtain clinical review and record the actual reviewer, credentials and date.");
  }
  if (medical && /cure|guarantee|miracle|detox|anti-inflammatory foods? (?:cure|reverse)/i.test(claimsText)) {
    issues.push("potentially overstated medical language requires clinical review");
    recommendations.push("Replace absolute claims with evidence-calibrated language and state limitations.");
  }
  return { slug: post.slug, title: post.title, category: post.category, medicalContent: medical, authoritySources: authorities, citationUrls: [...new Set(urls)], issues, recommendations, status: issues.length ? "needs-clinical-review" : "evidence-covered" };
});
const summary = {
  generatedAt: new Date().toISOString(),
  articleCount: articles.length,
  needsClinicalReview: articles.filter((article) => article.status === "needs-clinical-review").length,
  evidenceCovered: articles.filter((article) => article.status === "evidence-covered").length,
  authorityCoverage: Object.fromEntries(AUTHORITIES.map((authority) => [authority.name, articles.filter((article) => article.authoritySources.includes(authority.name)).length])),
  policy: "Flagging is advisory; no article is clinically approved by this script.",
};
writeFileSync(OUT, JSON.stringify({ summary, articles }, null, 2) + "\n");
console.log("[medical-evidence] audited " + articles.length + " published articles; report: " + OUT);
