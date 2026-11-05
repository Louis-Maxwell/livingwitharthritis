/**
 * Site-wide safety net for broken images. A capture-phase `error` listener
 * catches failures on every <img>, including images inside guide HTML that
 * React never wires an onError to, and swaps in a branded card on disk.
 */
import { GUIDE_IMAGE_FALLBACK } from "@/lib/coverFallback";

export function swapToFallback(img: HTMLImageElement): boolean {
  if (img.dataset.coverFallback === "1") return false;
  const src = img.getAttribute("src") || "";
  // Only content imagery; leave icons, tracking pixels and data URIs alone.
  if (!src || src.startsWith("data:") || /\.(?:ico|svg)(?:\?|$)/i.test(src)) return false;
  img.dataset.coverFallback = "1";
  img.removeAttribute("srcset");
  img.src = GUIDE_IMAGE_FALLBACK;
  if (!img.getAttribute("alt")) img.setAttribute("alt", "");
  return true;
}

export function installImageFallback(doc: Document = document): void {
  doc.addEventListener(
    "error",
    (event) => {
      const t = event.target;
      if (t instanceof HTMLImageElement) swapToFallback(t);
    },
    true,
  );
}

/** Give guide-body images lazy loading and intrinsic size so they never shift layout. */
export function withImageDefaults(html: string): string {
  return html.replace(/<img\b([^>]*?)\s*\/?>/gi, (_m, attrs: string) => {
    let a = attrs;
    if (!/\salt=/i.test(a)) a += ' alt=""';
    if (!/\sloading=/i.test(a)) a += ' loading="lazy"';
    if (!/\sdecoding=/i.test(a)) a += ' decoding="async"';
    if (!/\swidth=/i.test(a) && !/\sheight=/i.test(a)) a += ' width="1200" height="800"';
    return `<img${a} />`;
  });
}
