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
  { attr: "property", value: "og:title" },
  { attr: "property", value: "og:description" },
  { attr: "name", value: "twitter:title" },
  { attr: "name", value: "twitter:description" },
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
}

/**
 * Global canonical + hreflang emitter. Emits a full hreflang cluster
 * for every supported language (EN/ES/FR/DE/PT) plus x-default → EN.
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
  const canonical = `${SITE_URL}${path}`;
  const currentLang = detectLangFromPath(path);
  const basePath = stripLangPrefix(path);
  // Only emit hreflang alternates when a translated route genuinely
  // exists for this page — otherwise we'd link to 404s on every one
  // of the ~800+ pages that aren't translated (see TRANSLATED_BASE_PATHS).
  const hasTranslations = TRANSLATED_BASE_PATHS.includes(basePath);

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      {hasTranslations && SUPPORTED_LANGS.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={HREFLANG_CODES[lang]}
          href={`${SITE_URL}${buildLangUrl(lang, basePath)}`}
        />
      ))}
      {hasTranslations && (
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${basePath}`} />
      )}
      <html lang={HREFLANG_CODES[currentLang]} />
    </Helmet>
  );
}
