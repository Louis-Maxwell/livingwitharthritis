/**
 * Soft-404 guard for the SPA fallback shell (dist/index.html).
 *
 * Lovable hosting ignores _redirects and serves dist/index.html with HTTP 200
 * for every URL without its own file. Every indexable route is prerendered to
 * its own file, so the shell only ever answers for "/" (the homepage), app
 * routes that are not prerendered, and junk URLs. This inline script runs
 * before hydration: if the path is not "/" and matches no known route, it
 * switches robots to noindex and drops the homepage canonical, so unknown
 * URLs stop being indexable while real routes keep "index".
 *
 * The script is a same-origin file. The live host applies the meta-tag CSP,
 * whose script-src does not allow inline scripts, so an inline copy is blocked
 * and logs a console error on every page including the homepage.
 */

/** Turn React Router paths into anchored regex sources. */
export function routePatterns(paths) {
  const out = new Set();
  for (const p of paths) {
    if (!p || p === '*' || p === '/') continue;
    const src = p
      .replace(/\/+$/, '')
      .split('/')
      .map((seg) => (seg === '*' ? '.*' : seg.startsWith(':') ? '[^/]+' : seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
      .join('/');
    out.add(`^${src}${p.endsWith('/*') ? '' : '/?$'}`);
  }
  return [...out].sort();
}

/** Executable source. Kept out of the HTML so the meta CSP (script-src 'self') can run it. */
export function fallbackNoindexSource(patterns) {
  return `(function(){try{var p=location.pathname;if(p==="/"||p==="/index.html")return;var r=${JSON.stringify(patterns)};for(var i=0;i<r.length;i++){if(new RegExp(r[i]).test(p))return;}var h=document.head,m=h.querySelectorAll('meta[name="robots"],meta[name="googlebot"],link[rel="canonical"]');for(var j=0;j<m.length;j++)m[j].parentNode.removeChild(m[j]);var n=document.createElement("meta");n.name="robots";n.content="noindex, follow";h.appendChild(n);}catch(e){}})();\n`;
}

export const FALLBACK_NOINDEX_SRC = "/security/fallback-noindex.js";

/** Insert a same-origin script tag. An inline copy is blocked by the meta CSP. Idempotent. */
export function injectFallbackNoindex(html) {
  const clean = String(html)
    .replace(/[ \t]*<script id="fallback-noindex">[\s\S]*?<\/script>\n?/g, "")
    .replace(/[ \t]*<script id="fallback-noindex" src="\/security\/fallback-noindex\.js"><\/script>\n?/g, "");
  return clean.replace(
    /<\/head>/i,
    (m) => `    <script id="fallback-noindex" src="${FALLBACK_NOINDEX_SRC}"></script>\n${m}`,
  );
}
