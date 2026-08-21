import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  SUPPORTED_LANGS,
  LANG_LABELS,
  detectLangFromPath,
  stripLangPrefix,
  buildLangUrl,
  type Lang,
} from "@/lib/translations";

const STORAGE_KEY = "lwa.lang";

/**
 * Header dropdown to switch between English, Spanish, French, German
 * and Portuguese. Persists the choice in localStorage and (on first
 * visit) auto-redirects when the browser language matches a supported
 * non-English locale.
 */
export default function LanguageSwitcher() {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();
  const currentLang: Lang = detectLangFromPath(pathname);
  const [open, setOpen] = useState(false);

  // First-visit browser language auto-redirect (one-shot, opt-out via cookie).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored) return; // user has chosen — respect it
    const browser = (navigator.language || "en").slice(0, 2).toLowerCase() as Lang;
    if (
      browser !== "en" &&
      (SUPPORTED_LANGS as string[]).includes(browser) &&
      currentLang === "en"
    ) {
      window.localStorage.setItem(STORAGE_KEY, browser);
      const basePath = stripLangPrefix(pathname);
      navigate(buildLangUrl(browser, basePath) + search + hash, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (lang: Lang) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
    const basePath = stripLangPrefix(pathname);
    navigate(buildLangUrl(lang, basePath) + search + hash);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-11 min-w-11 px-2 gap-1.5 text-xs font-semibold sm:h-9"
          aria-label={`Change language. Current: ${LANG_LABELS[currentLang].native}`}
        >
          <Globe className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">{LANG_LABELS[currentLang].native}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        <DropdownMenuLabel className="text-[11px] uppercase tracking-wide text-muted-foreground">
          Language / Idioma
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SUPPORTED_LANGS.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onSelect={(e) => {
              e.preventDefault();
              handleSelect(lang);
            }}
            className="flex items-center justify-between gap-2 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span aria-hidden="true">{LANG_LABELS[lang].flag}</span>
              <span>{LANG_LABELS[lang].native}</span>
            </span>
            {currentLang === lang && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
