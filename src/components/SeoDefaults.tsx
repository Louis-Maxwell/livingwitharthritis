import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import {
  SUPPORTED_LANGS,
  HREFLANG_CODES,
  TRANSLATED_BASE_PATHS,
  detectLangFromPath,
  stripLangPrefix,
  buildLangUrl,
} from "@/lib/translations";

const SITE_URL = "https://livingwitharthritis.org.uk";

/** Bing Webmaster Tools meta — set VITE_BING_SITE_VERIFICATION once Louis has the code. Never invent a token. */
function bingSiteVerification(): string | null {
  const raw = import.meta.env.VITE_BING_SITE_VERIFICATION as string | undefined;
  if (!raw) return null;
  const v = raw.trim();
  // Bing codes are typically alphanumeric; reject empties / obvious placeholders.
  if (!v || v.length < 8 || /^(TODO|REPLACE|YOUR_|XXX)/i.test(v)) return null;
  return v;
}

// index.html ships static <meta name="description">/og:title/og:description/
// twitter:title/twitter:description tags as a fallback for non-JS crawlers
// (see index.html's own comment). react-helmet-async has no awareness of
// those pre-existing tags — it only dedupes elements it manages itself
// (marked data-rh="true") — so once a page's <SeoHead> mounts, the real
// per-page tag is INSERTED alongside the static one rather than replacing
// it. Any consumer that reads the first matching tag in DOM order (the
// static one comes first) sees the generic homepage fallback instead of
// the page's real, unique description on every single route. This prunes
// the static duplicate the moment Helmet's own version appears, for
// JS-executing consumers only — the static tags are untouched for true
// non-JS crawlers, which never run this effect.
const MANAGED_META = [
  { attr: "name", value: "description" },
  // Static index.html ships an index,follow default; without pruning it the
  // first match wins and noindex routes (404, unknown author slugs) leak.
  { attr: "name", value: "robots" },

  { attr: "property", value: "og:title" },
  { attr: "property", value: "og:description" },
  { attr: "property", value: "og:type" },
  { attr: "property", value: "og:url" },
  { attr: "property", value: "og:site_name" },
  { attr: "property", value: "og:locale" },
  { attr: "property", value: "og:image" },
  { attr: "property", value: "og:image:width" },
  { attr: "property", value: "og:image:height" },
  { attr: "property", value: "og:image:alt" },
  { attr: "name", value: "twitter:card" },
  { attr: "name", value: "twitter:title" },
  { attr: "name", value: "twitter:description" },
  { attr: "name", value: "twitter:image" },
  { attr: "name", value: "twitter:image:alt" },
] as const;


function pruneStaticMetaDuplicates() {
  for (const { attr, value } of MANAGED_META) {
    const matches = document.head.querySelectorAll(`meta[${attr}="${value}"]`);
    if (matches.length < 2) continue;
    const hasHelmetVersion = Array.from(matches).some((el) => el.hasAttribute("data-rh"));
    if (!hasHelmetVersion) continue;
    for (const el of Array.from(matches)) {
      if (!el.hasAttribute("data-rh")) el.remove();
    }
  }

  // Exactly one self-referencing <link rel="canonical"> per page. Helmet
  // does not dedupe <link> by rel, so once <SeoHead> mounts its canonical
  // (data-rh="true") the static one from index.html must go, or the page
  // ships two canonicals.
  const canonicals = Array.from(
    document.head.querySelectorAll('link[rel="canonical"]'),
  );
  if (canonicals.length > 1 && canonicals.some((el) => el.hasAttribute("data-rh"))) {
    for (const el of canonicals) {
      if (!el.hasAttribute("data-rh")) el.remove();
    }
  }
}

/**
 * Global hreflang emitter. Translated routes get a full language cluster.
 * Every other route gets self-referencing en-GB + x-default tags (not
 * homepage-only). Canonical <link> tags are emitted by <SeoHead>.
 */
export default function SeoDefaults() {
  const { pathname } = useLocation();

  useEffect(() => {
    pruneStaticMetaDuplicates();
    const observer = new MutationObserver(pruneStaticMetaDuplicates);
    observer.observe(document.head, { childList: true });
    return () => observer.disconnect();
  }, []);

  const cleanPath = pathname.replace(/\/{2,}/g, "/");
  const path = cleanPath !== "/" && cleanPath.endsWith("/")
    ? cleanPath.slice(0, -1)
    : cleanPath;
  const currentLang = detectLangFromPath(path);
  const basePath = stripLangPrefix(path);
  // A /es|/fr|/de|/pt URL with no translated route serves the English page,
  // so it must not be indexed alongside the English URL.
  const untranslatedLangPath = basePath !== path && !TRANSLATED_BASE_PATHS.includes(basePath);
  const pagePath = untranslatedLangPath ? basePath : path;
  const pageUrl = `${SITE_URL}${pagePath === "/" ? "/" : pagePath}`;
  // Full hreflang cluster only when a translated route genuinely exists
  // (see TRANSLATED_BASE_PATHS). Other routes get self-referencing en-GB
  // + x-default so they are not all pointed at the homepage.
  const hasTranslations = TRANSLATED_BASE_PATHS.includes(basePath);
  const bingVerify = bingSiteVerification();

  return (
    <Helmet>
      {untranslatedLangPath && <meta name="robots" content="noindex,follow" />}
      {bingVerify && (
        <meta name="msvalidate.01" content={bingVerify} />
      )}
      {/* Exactly one self-referencing canonical per page. Emitted here so
          every route gets one, including pages that use raw Helmet rather
          than <SeoHead />. The static index.html canonical is pruned above
          once this one mounts. */}
      <link rel="canonical" key="canonical" href={pageUrl} />
      {hasTranslations ? (
        <>
          {SUPPORTED_LANGS.map((lang) => (
            <link
              key={lang}
              rel="alternate"
              hrefLang={HREFLANG_CODES[lang]}
              href={`${SITE_URL}${buildLangUrl(lang, basePath)}`}
            />
          ))}
          <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${basePath}`} />
        </>
      ) : (
        <>
          <link rel="alternate" hrefLang="en-GB" href={pageUrl} />
          <link rel="alternate" hrefLang="x-default" href={pageUrl} />
        </>
      )}
      <html lang={HREFLANG_CODES[currentLang]} />
    </Helmet>
  );
}
