import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { resolveSeoRedirect } from "@/lib/seoRedirects";

const SITE = "https://livingwitharthritis.org.uk";

/**
 * Client-side 301 fallback for hosts that serve the SPA shell for every
 * path (HTTP 200). Paired with `public/_redirects` for real 301s.
 */
export default function SeoRedirectGate({ children }: { children: ReactNode }) {
  const { pathname, search, hash } = useLocation();
  const dest = resolveSeoRedirect(pathname);

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
