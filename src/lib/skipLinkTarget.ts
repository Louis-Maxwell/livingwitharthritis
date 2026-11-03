/**
 * Make sure the skip link always has a target. Some pages render no
 * `#main-content` (or no <main> at all), which left the skip link pointing
 * nowhere. Prefer an existing <main>; otherwise fall back to the page's H1.
 */
export function ensureMainContentTarget(doc: Document = document): boolean {
  if (doc.getElementById("main-content")) return true;
  const target = doc.querySelector("main") ?? doc.querySelector("h1");
  if (!target) return false;
  target.id = "main-content";
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  return true;
}
