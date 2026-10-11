const ORIGIN = 'https://livingwitharthritis.org.uk';

/** Published records provide identity and dates; never infer clinical review. */
export function articleJsonLd(url, data) {
  const article = data?.article;
  if (!article?.slug || !article?.content) return null;
  const name = article.author || 'Living With Arthritis Editorial Team';
  const author = /\bmaxwell\b/i.test(name)
    ? { '@type': 'Person', name, url: `${ORIGIN}/authors/maxwell` }
    : { '@type': 'Organization', name };
  const published = /^\d{4}-\d{2}-\d{2}/.test(article.date ?? '') ? article.date : undefined;
  const modified = /^\d{4}-\d{2}-\d{2}/.test(article.updated_at ?? '') ? article.updated_at : published;
  const citations = Array.isArray(article.citations) ? article.citations : [];
  return {
    '@context': 'https://schema.org', '@type': 'Article', '@id': `${url}#article`,
    headline: article.title, description: data.description, image: data.ogImage,
    datePublished: published, dateModified: modified, author,
    publisher: { '@id': `${ORIGIN}/#organization` },
    mainEntityOfPage: { '@id': `${url}#webpage` },
    inLanguage: 'en-GB', isAccessibleForFree: true, articleSection: article.category || 'Health',
    ...(citations.length ? { citation: citations.map((c) => ({ '@type': 'CreativeWork', name: c.label, url: c.url })) } : {}),
  };
}

/** Refresh builds can reuse full article HTML; add only a missing Article node. */
export function ensureArticleJsonLd(html, url, data) {
  const article = articleJsonLd(url, data);
  if (!article) return html;
  for (const match of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const node = JSON.parse(match[1]);
      if (node['@type'] === 'Article' && node['@id'] === article['@id']) return html;
    } catch { /* Other malformed nodes are reported by schema checks. */ }
  }
  const payload = JSON.stringify(article).replace(/</g, '\\u003c');
  return html.replace(/<\/head>/i, `<script type="application/ld+json">${payload}</script>\n</head>`);
}
