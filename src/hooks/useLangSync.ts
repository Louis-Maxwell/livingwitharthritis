import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import i18n from "@/i18n";

const SUPPORTED = ["en", "sv", "ur"] as const;
type LangCode = typeof SUPPORTED[number];

const URDU_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap";
const URDU_FONT_ID = "lwa-urdu-font";
const URDU_FONT_STACK =
  "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'Nafees Nastaleeq', serif";

const ensureUrduFont = () => {
  if (document.getElementById(URDU_FONT_ID)) return;
  const link = document.createElement("link");
  link.id = URDU_FONT_ID;
  link.rel = "stylesheet";
  link.href = URDU_FONT_HREF;
  document.head.appendChild(link);
};

export const applyLanguage = (code: LangCode) => {
  const html = document.documentElement;
  const isUrdu = code === "ur";
  html.setAttribute("lang", isUrdu ? "ur" : code === "sv" ? "sv" : "en-GB");
  html.setAttribute("dir", isUrdu ? "rtl" : "ltr");
  if (isUrdu) {
    ensureUrduFont();
    document.body.style.fontFamily = URDU_FONT_STACK;
  } else {
    document.body.style.fontFamily = "";
  }
};

const isSupported = (v: string | null): v is LangCode =>
  !!v && (SUPPORTED as readonly string[]).includes(v);

/**
 * Reads ?lang= from the URL on first load and on changes,
 * persists to localStorage, and applies to i18n + <html> dir/lang.
 * URL is the source of truth when present; otherwise falls back to localStorage.
 */
export const useLangSync = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlLang = params.get("lang");
    const stored = typeof window !== "undefined" ? localStorage.getItem("lwa-lang") : null;

    if (isSupported(urlLang)) {
      if (urlLang !== stored) localStorage.setItem("lwa-lang", urlLang);
      if (i18n.language !== urlLang) void i18n.changeLanguage(urlLang);
      applyLanguage(urlLang);
      return;
    }

    // No (or invalid) URL param — backfill it from stored choice so the link is shareable
    const fallback: LangCode = isSupported(stored) ? stored : "en";
    if (i18n.language !== fallback) void i18n.changeLanguage(fallback);
    applyLanguage(fallback);

    if (fallback !== "en") {
      params.set("lang", fallback);
      navigate(
        { pathname: location.pathname, search: `?${params.toString()}`, hash: location.hash },
        { replace: true },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
};
