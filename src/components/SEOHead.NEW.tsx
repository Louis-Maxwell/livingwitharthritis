import { Helmet } from "react-helmet-async";

/**
 * SEOHead — single reusable component for page metadata, including Open
 * Graph tags with sensible defaults. Solves "Missing Open Graph Tags"
 * (Frase report, 1 page flagged — but worth using everywhere so it never
 * recurs) by falling back to site-wide defaults for og:image and
 * og:site_name if a page doesn't specify its own.
 *
 * Usage:
 *   <SEOHead
 *     title="Osteoarthritis | Living With Arthritis UK"
 *     description="..."
 *     canonical="https://livingwitharthritis.org.uk/conditions/osteoarthritis"
 *   />
 */

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string; // defaults to site-wide social share image if omitted
  ogType?: "website" | "article";
  noindex?: boolean;
}

const SITE_NAME = "Living With Arthritis UK";
const DEFAULT_OG_IMAGE = "https://livingwitharthritis.org.uk/og-default.jpg"; // ensure this file exists in /public

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
}: SEOHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

      {/* Open Graph — the exact tags Frase flagged as missing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Card — same data, different tags, no extra effort */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
