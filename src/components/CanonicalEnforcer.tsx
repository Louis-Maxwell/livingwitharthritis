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
        // No page-level canonical yet — insert fallback pointing at the current path.
        const link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        link.setAttribute("href", expected);
        link.setAttribute("data-managed", "global-canonical");
        head.appendChild(link);
        return;
      }

      // Deduplicate: keep the Helmet-emitted canonical (last one) and remove any
      // stale fallback or legacy tags. Never mutate the href of a Helmet canonical —
      // doing so on every route change is what triggers third-party crawlers to
      // log "Canonical URL changed" warnings.
      const keep = links[links.length - 1];
      links.slice(0, -1).forEach((l) => l.parentNode?.removeChild(l));

      // Only update the href if THIS tag is our own fallback and the path drifted.
      if (
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
