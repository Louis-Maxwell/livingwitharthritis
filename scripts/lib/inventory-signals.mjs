import { parse, serialize } from 'parse5';
import { auditVisibleText } from './audit-visible-text.mjs';

/** Build-output audit data, not a sanitizer or proof of browser visibility. */
export function inspectInventoryHtml(html, pageUrl) {
  const root = parse(String(html));
  const elements = [];
  function visit(node) {
    if (node.tagName === 'template') return;
    if (node.tagName) elements.push(node);
    for (const child of node.childNodes || []) visit(child);
  }
  visit(root);
  const attr = (node, name) => node?.attrs?.find(a => a.name === name)?.value ?? '';
  const text = node => node ? auditVisibleText(serialize(node)) : '';
  const first = tag => elements.find(n => n.tagName === tag);
  const meta = name => attr(elements.find(n => n.tagName === 'meta' && attr(n, 'name').toLowerCase() === name), 'content');
  const canonical = attr(elements.find(n => n.tagName === 'link' && attr(n, 'rel').toLowerCase().split(/\s+/).includes('canonical')), 'href').trim();
  const nodes = [];
  function addSchema(value) {
    if (Array.isArray(value)) { value.forEach(addSchema); return; }
    if (!value || typeof value !== 'object') return;
    nodes.push(value);
    if (Array.isArray(value['@graph'])) value['@graph'].forEach(addSchema);
  }
  for (const node of elements.filter(n => n.tagName === 'script' && attr(n, 'type').toLowerCase() === 'application/ld+json')) {
    try { addSchema(JSON.parse((node.childNodes || []).map(n => n.value || '').join(''))); }
    catch { /* The separate structured-data validator owns invalid JSON failures. */ }
  }
  const page = new URL(pageUrl);
  const normalize = value => {
    try { const u = new URL(value, page); return u.href.replace(/\/$/, ''); }
    catch { return ''; }
  };
  let internalLinks = 0;
  let externalLinks = 0;
  for (const node of elements.filter(n => n.tagName === 'a')) {
    const href = attr(node, 'href');
    if (!href.trim()) continue;
    try {
      const url = new URL(href, page);
      if (!['https:', 'http:'].includes(url.protocol)) continue;
      if (url.origin === page.origin) internalLinks++;
      else externalLinks++;
    } catch { /* Malformed targets do not count as valid links. */ }
  }
  const images = elements.filter(n => n.tagName === 'img');
  const articleText = text(first('main'));
  return {
    title: text(first('title')), h1: text(first('h1')),
    description: meta('description'), keywords: meta('keywords'), robots: meta('robots'), canonical, nodes,
    canonicalMatchesUrl: Boolean(canonical) && normalize(canonical) === normalize(page.href),
    h2Count: elements.filter(n => n.tagName === 'h2').length,
    imageCount: images.length,
    // Empty alt is valid for decorative images; this counts absent attributes only.
    imagesMissingAlt: images.filter(n => !n.attrs.some(a => a.name === 'alt')).length,
    internalLinkCount: internalLinks, externalLinkCount: externalLinks,
    articleWordCount: (articleText.match(/[\p{L}\p{N}]+(?:['’_-][\p{L}\p{N}]+)*/gu) || []).length,
    structuredDataTypes: [...new Set(nodes.flatMap(n => Array.isArray(n['@type']) ? n['@type'] : [n['@type']]).filter(t => typeof t === 'string'))].sort().join('|'),
    htmlBytes: Buffer.byteLength(String(html), 'utf8'),
  };
}
