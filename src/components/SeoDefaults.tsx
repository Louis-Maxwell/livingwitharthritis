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

/**
 * Global canonical + hreflang emitter. Emits a full hreflang cluster
 * for every supported language (EN/ES/FR/DE/PT) plus x-default → EN.
 */
export default function SeoDefaults() {
  const { pathname } = useLocation();
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
