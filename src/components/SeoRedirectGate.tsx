import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SITE = "https://livingwitharthritis.org.uk";

type Resolver = (pathname: string) => string | null;
let resolverPromise: Promise<Resolver> | null = null;
let resolver: Resolver | null = null;

/**
 * The redirect tables (blog slug renames, city aliases, locale rules) are
 * ~60 KB of data that almost no visit needs, so they are loaded in their own
 * chunk instead of the entry bundle. Once loaded, resolution is synchronous.
 */
function loadResolver(): Promise<Resolver> {
  resolverPromise ??= import("@/lib/seoRedirects").then((m) => {
    resolver = m.resolveSeoRedirect;
    return resolver;
  });
  return resolverPromise;
}

/**
 * Client-side redirect for hosts that serve the SPA shell for every path
 * (HTTP 200). Paired with:
 *   - public/_redirects          — Netlify / static-host 301s
 *   - dist/<path>/index.html     — static noindex+canonical+refresh stubs
 *     written by scripts/write-redirect-html.mjs for Lovable's SPA host,
 *     which ignores _redirects and otherwise returns the homepage shell.
 */
export default function SeoRedirectGate({ children }: { children: ReactNode }) {
  const { pathname, search, hash } = useLocation();
  const [dest, setDest] = useState<string | null>(() => (resolver ? resolver(pathname) : null));

  useEffect(() => {
    let cancelled = false;
    if (resolver) {
      setDest(resolver(pathname));
      return;
    }
    loadResolver()
      .then((resolve) => {
        if (!cancelled) setDest(resolve(pathname));
      })
      .catch(() => {
        // Redirect tables unavailable (offline / chunk error): the host-level
        // 301s and static redirect stubs still cover crawlers.
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    if (!dest) return;
    const next = `${dest}${search}${hash}`;
    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== next) {
      window.location.replace(next);
    }
  }, [dest, search, hash]);

  if (!dest) return <>{children}</>;

  const href = `${dest}${search}${hash}`;

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`${SITE}${dest}`} />
        <meta name="robots" content="noindex,follow" />
        <meta httpEquiv="refresh" content={`0;url=${href}`} />
      </Helmet>
      <Navigate to={href} replace />
    </>
  );
}
