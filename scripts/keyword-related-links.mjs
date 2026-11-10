import { readFileSync } from 'node:fs';
const links = JSON.parse(readFileSync('src/data/keywordRelatedLinks.generated.json','utf8'));
const journey = JSON.parse(readFileSync('src/data/readerJourneyLinks.json','utf8'));
const esc = value => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
export function keywordRelatedLinks(article) {
 const path = `/blog/${article?.slug}`;
 const rows = journey[path] || links[path] || [];
 return rows.length ? `<nav aria-label="Related reading"><h2>Related reading</h2><ul>${rows.map(row=>`<li><a href="${esc(row.href)}">${esc(row.title)}</a></li>`).join('')}</ul></nav>` : '';
}
