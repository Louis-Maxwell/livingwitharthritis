import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://livingwitharthritis.org.uk";

/**
 * CanonicalEnforcer
 *
 * Guarantees exactly one <link rel="canonical"> in <head> on every route.
 *
 * - If a page renders its own canonical via <SeoHead>/Helmet, that one wins
 *   and any extras (e.g. legacy static tags) are removed.
 * - If no page-level canonical exists yet, a fallback canonical pointing at
 *   `${SITE_URL}${pathname}` is inserted so we never ship a route without one.
 * - Also removes the legacy `#static-canonical` shipped in index.html on
 *   first mount.
 */
export default function CanonicalEnforcer() {
  const { pathname } = useLocation();

  useEffect(() => {
    const head = document.head;
    const expected = `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;

    // Remove the legacy static homepage canonical if it's still present.
    const legacy = document.getElementById("static-canonical");
    if (legacy && legacy.parentNode) legacy.parentNode.removeChild(legacy);

    const reconcile = () => {
      const links = Array.from(
        head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'),
      );

      if (links.length === 0) {
        const link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        link.setAttribute("href", expected);
        link.setAttribute("data-managed", "global-canonical");
        head.appendChild(link);
        return;
      }

      // Prefer the last canonical (Helmet appends per-route ones last).
      const keep = links[links.length - 1];
      links.slice(0, -1).forEach((l) => l.parentNode?.removeChild(l));

      // If only our fallback exists, make sure its href matches the current path.
      if (
        links.length === 1 &&
        keep.getAttribute("data-managed") === "global-canonical" &&
        keep.getAttribute("href") !== expected
      ) {
        keep.setAttribute("href", expected);
      }
    };

    // Run now, then again after Helmet finishes mutating <head> on this tick.
    reconcile();
    const raf = window.requestAnimationFrame(reconcile);
    const timeout = window.setTimeout(reconcile, 0);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}
