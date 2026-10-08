import { readFileSync } from "node:fs";

const esc = (text) => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// The React directory and static crawler HTML consume the same verified records.
export function internationalResourceHead() {
  const data = JSON.parse(readFileSync(new URL("../src/data/internationalResources.json", import.meta.url), "utf8"));
  return {
    "/resources-directory": {
      title: data.title,
      description: data.description,
      question: data.question,
      answer: data.answer,
      breadcrumb: "Resources",
      pageType: "CollectionPage",
      international: true,
      bodyHtml: `<h2>International arthritis resources</h2><ul>${data.resources.map(r => `<li><h3>${esc(r.region)}</h3><a href="${esc(r.url)}">${esc(r.name)}</a><p>${esc(r.description)}</p></li>`).join("")}</ul><h2>Free self-management guides</h2><ul>${data.guides.map(g => `<li><a href="${esc(g.href)}">${esc(g.label)}</a></li>`).join("")}</ul><p>The UK directory includes health services, charities, benefits, equipment and research opportunities. UK services and eligibility rules apply to UK readers.</p>`
    }
  };
}
