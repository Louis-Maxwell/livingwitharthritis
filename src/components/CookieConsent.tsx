import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[90] p-4 sm:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-2xl mx-auto bg-card border border-border/50 rounded-2xl shadow-xl p-5 sm:p-6 relative">
        <button
          onClick={decline}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors"
          aria-label="Close cookie banner"
        >
          <X className="w-3.5 h-3.5 text-muted-foreground" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Cookie className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground text-sm mb-1">We use cookies</h3>
            <p className="text-muted-foreground text-xs leading-relaxed mb-4">
              We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve your experience. Read our{" "}
              <Link to="/cookies" className="text-primary hover:underline">Cookies Policy</Link> and{" "}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={accept} className="rounded-full text-xs font-semibold px-5 h-9">
                Accept All
              </Button>
              <Button size="sm" variant="outline" onClick={decline} className="rounded-full text-xs font-semibold px-5 h-9">
                Essential Only
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
