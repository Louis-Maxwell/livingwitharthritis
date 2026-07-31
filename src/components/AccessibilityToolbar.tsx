import { useState, useEffect } from "react";
import { Type, Moon, Sun, RotateCcw, Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";

const FONT_SIZES = ["default", "large", "x-large", "xx-large"] as const;
type FontSize = typeof FONT_SIZES[number];

const fontSizeMap: Record<FontSize, string> = {
  default: "100%",
  large: "115%",
  "x-large": "135%",
  "xx-large": "160%",
};

const fontSizeLabels: Record<FontSize, string> = {
  default: "Normal",
  large: "Large",
  "x-large": "Extra Large",
  "xx-large": "Largest",
};

export default function AccessibilityToolbar() {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>("default");
  const [highContrast, setHighContrast] = useState(false);

  // Load saved prefs
  useEffect(() => {
    const saved = localStorage.getItem("a11y-prefs");
    if (saved) {
      try {
        const prefs = JSON.parse(saved);
        if (prefs.fontSize) setFontSize(prefs.fontSize);
        if (prefs.highContrast) setHighContrast(prefs.highContrast);
      } catch {
        // Silently ignore parse errors — corrupted localStorage data falls back to defaults
      }
    }
  }, []);

  // Apply prefs
  useEffect(() => {
    document.documentElement.style.fontSize = fontSizeMap[fontSize];
    document.documentElement.classList.toggle("high-contrast", highContrast);
    localStorage.setItem("a11y-prefs", JSON.stringify({ fontSize, highContrast }));
  }, [fontSize, highContrast]);

  const cycleFontSize = () => {
    const idx = FONT_SIZES.indexOf(fontSize);
    setFontSize(FONT_SIZES[(idx + 1) % FONT_SIZES.length]);
  };

  const reset = () => {
    setFontSize("default");
    setHighContrast(false);
  };

  return (
    <div className="fixed left-3 bottom-20 sm:bottom-4 z-50">
      {open && (
        <div className="mb-2 bg-background border border-border rounded-xl shadow-xl p-3 space-y-2 min-w-[180px] animate-in slide-in-from-bottom-2 fade-in duration-200">
          <p className="text-xs font-bold text-foreground px-1">Accessibility</p>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-xs h-9"
            onClick={cycleFontSize}
            aria-label={`Font size: ${fontSizeLabels[fontSize]}`}
          >
            <Type className="w-4 h-4 shrink-0" />
            Font: {fontSizeLabels[fontSize]}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-xs h-9"
            onClick={() => setHighContrast(!highContrast)}
            aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
          >
            {highContrast ? <Sun className="w-4 h-4 shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
            High Contrast: {highContrast ? "On" : "Off"}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-xs h-9 text-muted-foreground"
            onClick={reset}
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            Reset All
          </Button>
        </div>
      )}

      <Button
        size="icon"
        variant="outline"
        className="w-11 h-11 rounded-full shadow-lg bg-background border-border hover:bg-accent"
        onClick={() => setOpen(!open)}
        aria-label="Accessibility settings"
        aria-expanded={open}
      >
        <Accessibility className="w-5 h-5" />
      </Button>
    </div>
  );
}