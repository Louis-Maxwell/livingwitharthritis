import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Moves keyboard/screen-reader focus to the new page heading after SPA
 * navigation. The initial load is left alone so focus is not stolen from the
 * browser address bar or a deep link.
 */
export default function RouteFocus() {
  const { pathname, hash } = useLocation();
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (hash) return;

    let attempts = 0;
    const focusHeading = () => {
      const heading = document.querySelector<HTMLElement>(
        "#main-content h1, main h1, h1",
      );
      if (!heading) {
        attempts += 1;
        if (attempts < 100) return;
        window.clearInterval(interval);
        return;
      }

      window.clearInterval(interval);
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    const interval = window.setInterval(focusHeading, 50);
    focusHeading();
    return () => window.clearInterval(interval);
  }, [pathname, hash]);

  return null;
}
