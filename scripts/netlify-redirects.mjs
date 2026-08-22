export function parseBlogRedirects(source) {
  return [...source.matchAll(/^\s*"([^"]+)"\s*:\s*"([^"]+)",?\s*$/gm)].map(
    (match) => [match[1], match[2]],
  );
}

export function buildRedirectsFile(pairs) {
  const lines = [
    "# Generated from src/data/blogRedirects.ts — do not edit by hand.",
    "# Recreate with: node scripts/generate-netlify-redirects.mjs",
    "",
    "# Permanent blog consolidations (Phase 2 — real HTTP 301s on Netlify)",
  ];
  for (const [from, to] of pairs) {
    lines.push(`/blog/${from} /blog/${to} 301`);
  }
  lines.push(
    "",
    "# Private SPA routes that are not prerendered. Everything else missing",
    "# from dist/ is served as public/404.html with HTTP 404 (no catch-all 200).",
    "/auth /index.html 200",
    "/admin/* /index.html 200",
    "/dashboard /index.html 200",
    "/checkout /index.html 200",
    "/callback /index.html 200",
    "/donation-result /index.html 200",
    "/unsubscribe /index.html 200",
    "",
  );
  return lines.join("\n");
}
