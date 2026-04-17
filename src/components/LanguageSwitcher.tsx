import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const LANGUAGES = [
  { code: "sv", label: "Svenska" },
  { code: "ur", label: "اردو" },
  { code: "en", label: "English" },
] as const;

type LangCode = typeof LANGUAGES[number]["code"];

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<LangCode>("en");
  const [pending, setPending] = useState<LangCode>("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = (localStorage.getItem("lwa-lang") as LangCode | null) ?? "en";
    setSelected(stored);
    setPending(stored);
  }, []);

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
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe className="w-4 h-4" />
      </Button>

      {open && (
        <div
          role="dialog"
          aria-label="Language"
          className="absolute right-0 mt-2 w-64 rounded-2xl border border-border bg-background shadow-xl shadow-black/10 p-4 z-[100] animate-in fade-in-0 zoom-in-95 duration-150"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
              <Globe className="w-4 h-4 text-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">Language</span>
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
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
