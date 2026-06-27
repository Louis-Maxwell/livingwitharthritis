import { useLocation } from "react-router-dom";
import { detectLangFromPath, translations, type Lang } from "@/lib/translations";

/**
 * Returns the active language and its translation dictionary based on the
 * URL prefix (e.g. "/es/..." → Spanish). Defaults to English.
 */
export function useTranslation() {
  const { pathname } = useLocation();
  const lang: Lang = detectLangFromPath(pathname);
  return { lang, t: translations[lang] };
}
