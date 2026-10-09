/** Add the general English catch-all while retaining British English and defaults.
 * Never label translated pages as English or fabricate country/language versions.
 */
export function patchEnglishAlternates(html, route, base) {
  if (/^\/(es|fr|de|pt)(?:\/|$)/.test(route)) return html;
  const path = route === "/" ? "/" : route.replace(/\/+$/, "");
  const url = `${base}${path}`;
  const attr = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  let out = html;
  for (const lang of ["en", "en-GB", "x-default"]) {
    // Remove only this English cluster; leave genuine translated alternates intact.
    out = out.replace(/<link\b[^>]*>/gi, (tag) => {
      const rel = /\brel=["']([^"']+)["']/i.exec(tag)?.[1];
      const code = /\bhreflang=["']([^"']+)["']/i.exec(tag)?.[1];
      return rel?.toLowerCase() === "alternate" && code?.toLowerCase() === lang.toLowerCase() ? "" : tag;
    });
  }
  const links = ["en", "en-GB", "x-default"].map((lang) => `  <link rel="alternate" hreflang="${lang}" href="${attr(url)}" />`).join("\n");
  return out.replace(/<\/head>/i, `${links}\n</head>`);
}
