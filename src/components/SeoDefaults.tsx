import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import {
  SUPPORTED_LANGS,
  HREFLANG_CODES,
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

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      {SUPPORTED_LANGS.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={HREFLANG_CODES[lang]}
          href={`${SITE_URL}${buildLangUrl(lang, basePath)}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${basePath}`} />
      <html lang={HREFLANG_CODES[currentLang]} />
    </Helmet>
  );
}
