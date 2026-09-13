import { Helmet } from "react-helmet-async";
import { enforceTitle, enforceDescription } from "@/lib/seoMeta";
import { DEFAULT_OG_PATH } from "@/lib/articleImages";
import { governanceJsonLd, type EditorialGovernance } from "@/lib/editorialGovernance";

const SITE_URL = "https://livingwitharthritis.org.uk";
const SITE_NAME = "Living With Arthritis UK";
const DEFAULT_IMAGE = `${SITE_URL}${DEFAULT_OG_PATH}`;

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  includeSiteName?: boolean;
  keywords?: string;
  /** Explicit YMYL governance metadata. No fictitious reviewer is inferred. */
  editorial?: EditorialGovernance;
}

/**
 * Centralised SEO head. Indexable routes must use a unique title, description
 * and canonical path. Medical/article routes can additionally provide explicit
 * author, reviewer, evidence and source metadata for trustworthy machine and
 * human interpretation.
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
  editorial,
}: SeoHeadProps) {
  const fullTitle = enforceTitle(title, { includeSiteName, route: path });
  const safeDescription = enforceDescription(description, path);
  const canonical = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const absoluteImage = /^https?:\/\//i.test(image)
    ? image
    : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;
  const imageAlt = `${title} — ${SITE_NAME}`;
  const isArticle = type === "article" || Boolean(editorial);

  const jsonLd = editorial
    ? {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: fullTitle,
        description: safeDescription,
        url: canonical,
        inLanguage: "en-GB",
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        ...(isArticle ? { ...governanceJsonLd(editorial) } : {}),
      }
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={safeDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content={
          noindex
            ? "noindex,follow"
            : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        }
      />
      <meta name="geo.region" content="GB" />
      <meta name="theme-color" content="#D60000" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
