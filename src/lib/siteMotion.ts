/** Card selection and arming for SiteMotion (kept apart for fast refresh). */
export const CARD_SELECTOR = [
  "main :is(ul, ol).grid > li",
  "main .grid > :is(a, article, div, section)[class*='rounded']",
  "main :is(article, aside, section, a)[class*='rounded-'][class*='border']",
  "main div[class*='rounded-2xl'][class*='border']",
  "main div[class*='rounded-xl'][class*='border']",
].join(", ");

const EXCLUDE =
  "header, footer, nav[aria-label='breadcrumb'], [role='dialog'], form, .prose, .blog-prose, [data-no-motion], .reveal";

function eligible(el: HTMLElement): boolean {
  if (el.closest(EXCLUDE)) return false;
  if (el.querySelector("form, input, select, textarea, h1")) return false;
  // Skip items inside horizontal scrollers (carousels): they enter sideways.
  for (
    let p = el.parentElement;
    p && p !== document.body;
    p = p.parentElement
  ) {
    if (/(auto|scroll)/.test(getComputedStyle(p).overflowX)) return false;
  }
  // One level only: do not move a card that sits inside another moving card.
  if (el.parentElement?.closest("[data-site-reveal], [data-site-lift]"))
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
  root.querySelectorAll<HTMLElement>(CARD_SELECTOR).forEach((el) => {
    if (el.hasAttribute("data-site-seen")) return;
    el.setAttribute("data-site-seen", "");
    if (!eligible(el)) return;
    if (
      el.matches("a[href]") ||
      el.querySelector(":scope > a[href], :scope > * > a[href]")
    ) {
      el.setAttribute("data-site-lift", "");
    }
    const rect = el.getBoundingClientRect();
    if (rect.height === 0 || rect.top < viewportHeight) return; // on screen or hidden: leave alone
    el.setAttribute("data-site-reveal", "armed");
    observe(el);
    armed += 1;
  });
  return armed;
}
