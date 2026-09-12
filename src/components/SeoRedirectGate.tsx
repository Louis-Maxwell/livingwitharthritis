import { useEffect, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { resolveSeoRedirect } from "@/lib/seoRedirects";

const SITE = "https://livingwitharthritis.org.uk";

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
  const dest = resolveSeoRedirect(pathname);

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
