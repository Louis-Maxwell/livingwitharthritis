import { Helmet } from "react-helmet-async";

const SITE_URL = "https://livingwitharthritis.org.uk";
const SITE_NAME = "Living With Arthritis UK";
const DEFAULT_IMAGE = `${SITE_URL}/images/hero-community.jpg`;

interface SeoHeadProps {
  /** Page title (will be appended with site name unless includeSiteName=false) */
  title: string;
  /** Meta description, ideally 140–160 chars */
  description: string;
  /** Canonical path starting with "/" (e.g. "/about-us") */
  path: string;
  /** Optional absolute image URL for OG/Twitter cards */
  image?: string;
  /** Page type: "website" (default) or "article" */
  type?: "website" | "article";
  /** Set true to discourage indexing (admin, auth, success pages) */
  noindex?: boolean;
  /** Set false to use title verbatim without "| Site Name" suffix */
  includeSiteName?: boolean;
  /** Optional keyword string */
  keywords?: string;
}

/**
 * Centralised SEO head — outputs title, description, canonical,
 * Open Graph (Facebook/LinkedIn) and Twitter Card meta in one place.
 * UK English, en-GB locale.
 */
export default function SeoHead({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  includeSiteName = true,
  keywords,
}: SeoHeadProps) {
  const fullTitle = includeSiteName ? `${title} | ${SITE_NAME}` : title;
  const canonical = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow,max-image-preview:large" />
      )}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en-GB" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
      <meta name="geo.region" content="GB" />
      <meta name="theme-color" content="#e6002b" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
