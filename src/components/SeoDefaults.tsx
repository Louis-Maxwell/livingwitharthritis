import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://livingwitharthritis.org.uk";

/**
 * Global canonical + hreflang emitter.
 *
 * Mounted once at the app root. Computes the canonical URL for the
 * current route and emits matching self-referencing hreflang tags
 * (en-GB + x-default), so every route ships exactly one canonical and
 * one alternate set pointing at itself. Solves the "hreflang conflict"
 * pattern caused by static index.html alternates that always pointed
 * back at the homepage.
 *
 * Per-route SeoHead no longer emits canonical/hreflang — this component
 * owns those globally to avoid duplicate <link> tags (Helmet does not
 * dedupe <link> by rel).
 */
export default function SeoDefaults() {
  const { pathname } = useLocation();
  // Strip trailing slash except for root; normalise //
  const cleanPath = pathname.replace(/\/{2,}/g, "/");
  const path = cleanPath !== "/" && cleanPath.endsWith("/")
    ? cleanPath.slice(0, -1)
    : cleanPath;
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en-GB" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
    </Helmet>
  );
}
