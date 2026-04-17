import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { applyLanguage } from "@/hooks/useLangSync";
import i18n from "@/i18n";

const LANGUAGES = [
  { code: "sv", label: "Svenska" },
  { code: "ur", label: "اردو" },
  { code: "en", label: "English" },
] as const;

type LangCode = typeof LANGUAGES[number]["code"];

const URDU_FONT_STACK =
  "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'Nafees Nastaleeq', serif";

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<LangCode>("en");
  const [pending, setPending] = useState<LangCode>("en");
  const ref = useRef<HTMLDivElement>(null);

  // Keep local state in sync with the URL (?lang=) / stored choice
  useEffect(() => {
    const urlLang = new URLSearchParams(location.search).get("lang");
    const stored = (localStorage.getItem("lwa-lang") as LangCode | null) ?? "en";
    const active = (LANGUAGES.some((l) => l.code === urlLang) ? urlLang : stored) as LangCode;
    setSelected(active);
    setPending(active);
  }, [location.search]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const save = () => {
    setSelected(pending);
    localStorage.setItem("lwa-lang", pending);
    applyLanguage(pending);
    void i18n.changeLanguage(pending);

    const params = new URLSearchParams(location.search);
    if (pending === "en") params.delete("lang");
    else params.set("lang", pending);
    const search = params.toString();
    navigate(
      { pathname: location.pathname, search: search ? `?${search}` : "", hash: location.hash },
      { replace: true },
    );
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-lg h-9 w-9"
        onClick={() => {
          setPending(selected);
          setOpen((v) => !v);
        }}
        aria-label={t("language.change")}
        aria-expanded={open}
      >
        <Globe className="w-4 h-4" />
      </Button>

      {open && (
        <div
          role="dialog"
          aria-label={t("language.title")}
          dir="ltr"
          className="absolute end-0 mt-2 w-64 rounded-2xl border border-border bg-background shadow-xl shadow-black/10 p-4 z-[100] animate-in fade-in-0 zoom-in-95 duration-150"
          style={{ right: 0 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
              <Globe className="w-4 h-4 text-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">{t("language.title")}</span>
          </div>

          <ul className="space-y-1 mb-3">
            {LANGUAGES.map((lang) => {
              const isPending = pending === lang.code;
              return (
                <li key={lang.code}>
                  <button
                    onClick={() => setPending(lang.code)}
                    className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                      isPending
                        ? "bg-accent text-foreground font-semibold"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                    }`}
                    dir={lang.code === "ur" ? "rtl" : "ltr"}
                    style={lang.code === "ur" ? { fontFamily: URDU_FONT_STACK } : undefined}
                  >
                    <span>{lang.label}</span>
                    {isPending && <Check className="w-4 h-4" />}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex justify-end">
            <Button
              size="sm"
              onClick={save}
              className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-5"
            >
              {t("language.save")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
