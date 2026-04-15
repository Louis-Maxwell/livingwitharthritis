import { memo, useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const BackToTopButton = memo(() => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full bg-card shadow-lg ring-1 ring-border flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Scroll back to top of page"
      type="button"
    >
      <ChevronUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
});

BackToTopButton.displayName = "BackToTopButton";
export default BackToTopButton;
