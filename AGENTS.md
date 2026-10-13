
- Blog guides are served only from src/content/blog/posts/*.json; the legacy blog_articles table is not read by the site, so content fixes go in the JSON files first.
- Article-page link checks use src/data/faqSlugs.ts (kept in sync by test), not the full FAQ text, to keep article downloads small.
