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

export function buildFallbackScript(patterns) {
  return `<script id="fallback-noindex">(function(){try{var p=location.pathname;if(p==="/"||p==="/index.html")return;var r=${JSON.stringify(patterns)};for(var i=0;i<r.length;i++){if(new RegExp(r[i]).test(p))return;}var h=document.head,m=h.querySelectorAll('meta[name="robots"],meta[name="googlebot"],link[rel="canonical"]');for(var j=0;j<m.length;j++)m[j].parentNode.removeChild(m[j]);var n=document.createElement("meta");n.name="robots";n.content="noindex, follow";h.appendChild(n);}catch(e){}})();</script>`;
}

/** Insert the guard at the end of <head>, after the static robots/canonical tags it replaces. Idempotent. */
export function injectFallbackNoindex(html, patterns) {
  const clean = String(html).replace(/[ \t]*<script id="fallback-noindex">[\s\S]*?<\/script>\n?/g, '');
  return clean.replace(/<\/head>/i, (m) => `    ${buildFallbackScript(patterns)}\n${m}`);
}
