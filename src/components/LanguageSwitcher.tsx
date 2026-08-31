import { useState } from "react";
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
  TRANSLATED_BASE_PATHS,
  detectLangFromPath,
  stripLangPrefix,
  buildLangUrl,
  type Lang,
} from "@/lib/translations";

const STORAGE_KEY = "lwa.lang";

/**
 * Header dropdown to switch between English, Spanish, French, German
 * and Portuguese. Only prefixes URLs that have a real translated route
 * (see TRANSLATED_BASE_PATHS). Every other page switches to the locale
 * homepage so we do not mint empty /fr/... stubs for Google to crawl.
 */
export default function LanguageSwitcher() {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();
  const currentLang: Lang = detectLangFromPath(pathname);
  const [open, setOpen] = useState(false);

  const handleSelect = (lang: Lang) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
    const basePath = stripLangPrefix(pathname);
    if (basePath === "/404") {
      navigate(buildLangUrl(lang, "/"));
      setOpen(false);
      return;
    }
    const targetBase = TRANSLATED_BASE_PATHS.includes(basePath) ? basePath : "/";
    navigate(buildLangUrl(lang, targetBase) + (targetBase === basePath ? search + hash : ""));
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-2 gap-1.5 text-xs font-semibold"
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
