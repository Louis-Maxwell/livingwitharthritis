import { Suspense, useState } from "react";
import { useLocation } from "react-router-dom";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lazyWithRetry } from "@/lib/chunkRecovery";
import { LANG_LABELS, detectLangFromPath, type Lang } from "@/lib/translations";

const LanguageSwitcherMenu = lazyWithRetry(() => import("@/components/LanguageSwitcherMenu"));

/**
 * Header language switcher. Renders a lightweight button first and only
 * loads the Radix dropdown (≈50 KB with its focus/scroll-lock helpers) when
 * the visitor actually opens it, keeping it out of every page's entry JS.
 * The full menu lives in LanguageSwitcherMenu.
 */
export default function LanguageSwitcher() {
  const { pathname } = useLocation();
  const currentLang: Lang = detectLangFromPath(pathname);
  const [activated, setActivated] = useState(false);

  const trigger = (
    <Button
      variant="ghost"
      size="sm"
      className="h-9 px-2 gap-1.5 text-xs font-semibold"
      aria-label={`Change language. Current: ${LANG_LABELS[currentLang].native}`}
      aria-haspopup="menu"
      aria-expanded={false}
      onClick={() => setActivated(true)}
      onPointerEnter={() => {
        void import("@/components/LanguageSwitcherMenu");
      }}
    >
      <Globe className="w-4 h-4" aria-hidden="true" />
      <span className="hidden sm:inline">{LANG_LABELS[currentLang].native}</span>
    </Button>
  );

  if (!activated) return trigger;

  return (
    <Suspense fallback={trigger}>
      <LanguageSwitcherMenu defaultOpen />
    </Suspense>
  );
}
