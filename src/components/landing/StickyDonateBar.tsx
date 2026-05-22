import { memo, useEffect, useState } from "react";
import { Heart } from "lucide-react";

/**
 * Mobile-only sticky donate bar.
 * Hides itself once the inline donation widget (#donate-inline) scrolls into view,
 * and stays hidden after the user has reached the footer.
 */
const StickyDonateBar = memo(() => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("donate-inline");
    if (!target) return;

    // Show only after user has scrolled past the hero (~600px)
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Hide when the inline widget is visible
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(false);
      },
      { threshold: 0.2 }
    );
    io.observe(target);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const handleClick = () => {
    const target = document.getElementById("donate-inline");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 lg:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div className="mx-3 mb-3 rounded-full bg-foreground text-background shadow-2xl border border-background/10">
        <button
          type="button"
          onClick={handleClick}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-5 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Scroll to donation form"
        >
          <Heart className="w-4 h-4 fill-primary text-primary" aria-hidden="true" />
          Donate now — help keep it free
        </button>
      </div>
    </div>
  );
});

StickyDonateBar.displayName = "StickyDonateBar";
export default StickyDonateBar;
