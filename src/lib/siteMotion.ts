/** Card selection and arming for SiteMotion (kept apart for fast refresh). */
export const CARD_SELECTOR = [
  "main :is(ul, ol).grid > li",
  "main .grid > :is(a, article, div, section)[class*='rounded']",
  "main :is(article, aside, section, a)[class*='rounded-'][class*='border']",
  "main div[class*='rounded-2xl'][class*='border']",
  "main div[class*='rounded-xl'][class*='border']",
].join(", ");

const EXCLUDE =
  "header, footer, nav, [role='dialog'], form, .prose, .blog-prose, [data-no-motion], [role='alert'], [role='status'], .article-callout, .key-takeaways, .editorial-review-note, [role='note'], [aria-expanded], [aria-haspopup], [aria-pressed], [role='tab'], [role='switch']";

function eligible(el: HTMLElement): boolean {
  if (el.closest(EXCLUDE)) return false;
  // Prefer individual cards over a rounded panel that contains a card grid.
  if (el.querySelector(CARD_SELECTOR)) return false;
  if (el.querySelector("form, input, select, textarea, h1, [role='alert'], .article-callout, .key-takeaways, [aria-expanded], [aria-haspopup], [role='dialog']")) return false;
  // Skip items inside horizontal scrollers (carousels): they enter sideways.
  for (
    let p = el.parentElement;
    p && p !== document.body;
    p = p.parentElement
  ) {
    if (/(auto|scroll)/.test(getComputedStyle(p).overflowX)) return false;
  }
  // One level only: do not move a card that sits inside another moving card.
  if (el.parentElement?.closest("[data-site-reveal], [data-site-lift], [data-site-depth='card']"))
    return false;
  return true;
}

/** Arms below-the-fold cards and tags interactive ones for hover lift. */
export function applySiteMotion(
  root: ParentNode,
  viewportHeight: number,
  observe: (el: Element) => void,
): number {
  let armed = 0;
  const unseen = Array.from(root.querySelectorAll<HTMLElement>(CARD_SELECTOR))
    .filter((el) => !el.hasAttribute("data-site-seen"));
  // Read eligibility and geometry before setting any motion attributes. Large
  // listings must not force a style/layout flush once per card.
  const cards = unseen.filter(eligible).map((el) => ({ el, rect: el.getBoundingClientRect() }));
  unseen.forEach((el) => el.setAttribute("data-site-seen", ""));
  cards.forEach(({ el, rect }) => {
    if (
      el.matches("a[href]") ||
      el.querySelector(":scope > a[href], :scope > * > a[href]")
    ) {
      el.setAttribute("data-site-lift", "");
    }
    // Only substantial interactive cards get 3D, not pills, badges, large
    // sections or static advice panels. Existing 2D reveals remain separate.
    if (el.hasAttribute("data-site-lift") && rect.width >= 160 && rect.height >= 80 && rect.height <= 800)
      el.setAttribute("data-site-depth", "card");
    if (el.closest(".reveal")) return; // existing reveal owns its entrance
    if (rect.height === 0 || rect.top < viewportHeight) return; // on screen or hidden: leave alone
    el.setAttribute("data-site-reveal", "armed");
    observe(el);
    armed += 1;
  });
  return armed;
}

/** Shared actions get a short depth press, never movement of their text alone.
 * CSS gates it by pointer and motion preference; no pointer-move listeners,
 * perpetual render loop, canvas or extra asset downloads are needed. */
export function applyActionDepth(root: ParentNode): void {
  root.querySelectorAll<HTMLElement>("main .btn-map, main [data-depth-action]").forEach((el) => {
    if (el.closest(EXCLUDE) || el.hasAttribute("disabled") || el.getAttribute("aria-disabled") === "true") return;
    if (el.closest("[data-site-depth='card']")) return;
    el.setAttribute("data-site-depth", "action");
  });
}
