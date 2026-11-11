import { useEffect } from "react";
import { motionAllowed } from "@/lib/motion";
import { applySiteMotion } from "@/lib/siteMotion";

/**
 * Site-wide micro-motion for cards, applied after hydration (see
 * src/lib/siteMotion.ts for which elements qualify).
 *
 * Armed cards are revealed once when their top crosses 92% of the viewport,
 * or as soon as they are already above it (fast scrolls and jump links never
 * leave a card offset). One passive, rAF-batched scroll listener; it detaches
 * once nothing is left to reveal or the route changes.
 */
export default function SiteMotion() {
  useEffect(() => {
    if (!motionAllowed()) return;
    const pending = new Set<Element>();
    let frame = 0;
    let timer = 0;

    const check = () => {
      frame = 0;
      const line = window.innerHeight * 0.92;
      for (const el of pending) {
        if (el.getBoundingClientRect().top < line) {
          el.setAttribute("data-site-reveal", "shown");
          pending.delete(el);
        }
      }
    };
    const onScroll = () => {
      if (!frame && pending.size) frame = window.requestAnimationFrame(check);
    };
    const scan = () => {
      timer = 0;
      const main = document.querySelector("main");
      if (main)
        applySiteMotion(
          main.parentElement ?? document,
          window.innerHeight,
          (el) => pending.add(el),
        );
    };
    const schedule = () => {
      if (!timer) timer = window.setTimeout(scan, 150);
    };

    const raf = window.requestAnimationFrame(scan);
    // Lazy sections mount after the route renders.
    const mo =
      typeof MutationObserver !== "undefined"
        ? new MutationObserver(schedule)
        : null;
    mo?.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf);
      if (frame) window.cancelAnimationFrame(frame);
      if (timer) window.clearTimeout(timer);
      mo?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return null;
}
