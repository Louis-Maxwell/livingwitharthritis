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

import { createHash } from 'node:crypto';
import { parse } from 'parse5';

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
  return `<script id="fallback-noindex">(function(){try{var p=location.pathname;if(p==="/"||p==="/index.html")return;var r=${JSON.stringify(patterns).replace(/</g, '\\u003c')};for(var i=0;i<r.length;i++){if(new RegExp(r[i]).test(p))return;}var h=document.head,m=h.querySelectorAll('meta[name="robots"],meta[name="googlebot"],link[rel="canonical"]');for(var j=0;j<m.length;j++)m[j].parentNode.removeChild(m[j]);var n=document.createElement("meta");n.name="robots";n.content="noindex, follow";h.appendChild(n);}catch(e){}})();</script>`;
}

/** Insert the guard at the end of <head>, after the static robots/canonical tags it replaces. Idempotent. */
export function injectFallbackNoindex(html, patterns) {
  const source = String(html);
  const ranges = [];
  function findGuards(node) {
    if (node.tagName === 'script' && node.attrs?.some((attr) => attr.name === 'id' && attr.value === 'fallback-noindex')) {
      const loc = node.sourceCodeLocation;
      if (loc) ranges.push([loc.startOffset, loc.endOffset]);
    }
    for (const child of node.childNodes || []) findGuards(child);
    if (node.content) findGuards(node.content);
  }
  findGuards(parse(source, { sourceCodeLocationInfo: true }));
  let clean = source;
  for (const [start, end] of ranges.sort((a, b) => b[0] - a[0])) {
    let from = start;
    while (from > 0 && /[ \t]/.test(clean[from - 1])) from--;
    const to = clean[end] === '\n' ? end + 1 : end;
    clean = clean.slice(0, from) + clean.slice(to);
  }
  // Preserve the existing formatting so repeated injection is byte-stable.
  clean = clean.replace(/[ \t]+\n<\/head>/i, '</head>');
  const script = buildFallbackScript(patterns);
  const body = script.slice(script.indexOf('>') + 1, script.lastIndexOf('</script>'));
  const hash = `'sha256-${createHash('sha256').update(body).digest('base64')}'`;
  // Only this exact generated guard is allowed. Do not weaken script-src with
  // unsafe-inline: the live meta CSP otherwise blocks the fallback guard.
  const permitted = clean.replace(/(<meta\b[^>]*http-equiv=["']Content-Security-Policy["'][^>]*content=")([^"]*)(")/i, (_, start, policy, end) => {
    const next = policy.replace(/(^|;\s*)script-src\s+([^;]+)/i, (directive, prefix, sources) =>
      sources.includes(hash) ? directive : `${prefix}script-src ${sources.trim()} ${hash}`);
    return `${start}${next}${end}`;
  });
  return permitted.replace(/<\/head>/i, (m) => `    ${script}\n${m}`);
}
