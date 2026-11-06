import { useEffect, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { resolveSeoRedirect } from "@/lib/seoRedirects";

const SITE = "https://livingwitharthritis.org.uk";

/**
 * Resolve retired/aliased URLs synchronously during the first render.
 *
 * This matters for crawlers: waiting for an after-load dynamic import can
 * expose the SPA shell as a 200 before the redirect table is available,
 * which is reported as a soft 404 or broken page. The redirect map is kept
 * in the application bundle so both browsers and crawlers see the canonical
 * destination immediately. Host-level 301 rules and generated redirect
 * documents remain the preferred server-side path.
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
