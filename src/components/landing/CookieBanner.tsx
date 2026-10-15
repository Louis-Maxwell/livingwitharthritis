import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAnyOverlayOpen } from "@/hooks/useExclusiveOverlay";

interface CookieBannerProps {
  onAnalyticsChange?: (enabled: boolean) => void;
}

const CookieBanner = memo(({ onAnalyticsChange }: CookieBannerProps) => {
  const [show, setShow] = useState(
    () =>
      !localStorage.getItem("lwa_cv3") &&
      !localStorage.getItem("cookie-consent"),
  );
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState({ a: false, p: false, m: false });

  const save = (vals: typeof local) => {
    localStorage.setItem("lwa_cv3", JSON.stringify(vals));
    localStorage.setItem("cookie-consent", vals.a ? "accepted" : "declined");
    onAnalyticsChange?.(vals.a);
    setShow(false);
    if (vals.a) {
      window.dispatchEvent(new Event("cookie-consent-accepted"));
    }
  };


  // Step aside while a dialog, drawer or panel is open so the banner never
  // floats above a modal backdrop; it comes back when the popup closes.
  const overlayOpen = useAnyOverlayOpen();

  if (!show || overlayOpen) return null;

  return (
    <div
      className="fixed right-4 left-4 sm:left-auto z-[100] sm:max-w-sm max-w-full"
      // Sits just above the mobile bottom nav as a compact sheet, so it no
      // longer covers the page title on phones. It is above the help button
      // (z-50) while visible: one prompt at a time.
      style={{ bottom: "calc(var(--mobile-bottom-nav, 68px) + env(safe-area-inset-bottom, 0px) + 0.5rem)" }}
      role="region"
      aria-label="Cookie consent"
    >
      <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <Lock className="w-6 h-6 text-primary mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <h2 className="font-bold text-foreground text-base">We value your privacy</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Essential cookies keep this site working. Analytics (optional) help us improve.{" "}
                <Link to="/privacy" className="text-primary underline underline-offset-2">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>

          {open && (
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              {[
                { k: "a", l: "Analytics", d: "Understand how visitors use the site. Optional." },
                { k: "p", l: "Preferences", d: "Remember your settings between visits. Optional." },
                { k: "m", l: "Marketing", d: "Measure campaign effectiveness. Optional." },
              ].map((i) => (
                <label key={i.k} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent cursor-pointer">
                  <input
                    type="checkbox"
                    checked={local[i.k as keyof typeof local]}
                    onChange={(e) => setLocal((p) => ({ ...p, [i.k]: e.target.checked }))}
                    className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{i.l}</p>
                    <p className="text-xs text-muted-foreground">{i.d}</p>
                  </div>
                </label>
              ))}
            </div>
          )}

          <div className="mt-3 sm:mt-5 flex flex-wrap gap-2">
            {!open ? (
              <>
                <button
                  onClick={() => save({ a: true, p: true, m: true })}
                  className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={() => save({ a: false, p: false, m: false })}
                  className="flex-1 bg-accent text-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-accent/80 transition-colors"
                >
                  Essential Only
                </button>
                <button
                  onClick={() => setOpen(true)}
                  className="py-2.5 px-4 text-sm font-medium text-muted-foreground underline hover:text-foreground transition-colors"
                >
                  Customise
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => save(local)}
                  className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Save My Preferences
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="py-2.5 px-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

CookieBanner.displayName = "CookieBanner";
export default CookieBanner;
