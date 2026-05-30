import { memo, useState, lazy, Suspense } from "react";
import { Heart, RefreshCw } from "lucide-react";
import { unsplashSrcSet, fullWidthSizes, portraitHeroWomenOutdoors } from "@/data/images";

const StripeDonationModal = lazy(() => import("@/components/StripeDonationModal"));

const PRESET_AMOUNTS = [25, 55, 100, 300, 500];

const InspiredHeroBand = memo(() => {
  const [recurring, setRecurring] = useState(false);
  const [amount, setAmount] = useState<number>(55);
  const [custom, setCustom] = useState("");
  const [open, setOpen] = useState(false);

  const finalAmount = custom ? Math.max(1, Math.floor(Number(custom) || 0)) : amount;

  const handleDonate = () => {
    if (finalAmount < 1) return;
    setOpen(true);
  };

  return (
    <section
      id="donate-inline"
      aria-labelledby="inspired-hero-heading"
      className="relative overflow-hidden bg-foreground text-background"
    >
      {/* Background portrait */}
      <div className="absolute inset-0">
        <img
          src={portraitHeroWomenOutdoors}
          srcSet={unsplashSrcSet(portraitHeroWomenOutdoors, [800, 1200, 1600, 1920])}
          sizes={fullWidthSizes}
          alt="People supported by Living With Arthritis UK walking outdoors"
          className="h-full w-full object-cover object-center opacity-90"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/55 to-transparent md:from-foreground/80 md:via-foreground/40"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-12 gap-10 items-center">
        {/* Headline */}
        <div className="lg:col-span-7 text-background">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-background/80 mb-5">
            <span className="w-8 h-px bg-primary" /> Help Conquer Arthritis
          </span>
          <h2
            id="inspired-hero-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
          >
            Your gift today helps{" "}
            <span className="text-primary">millions in the UK</span> live better
            with arthritis.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-background/80 max-w-xl leading-relaxed">
            Every pound funds clinician-reviewed physiotherapy, anti-inflammatory
            nutrition guidance and one-to-one support — for everyone, with no
            paywalls and no waiting lists.
          </p>
        </div>

        {/* Inline donation widget */}
        <div className="lg:col-span-5">
          <div className="bg-background text-foreground rounded-2xl shadow-2xl border border-border/40 p-6 sm:p-7">
            {/* One-time / Monthly toggle */}
            <div
              role="tablist"
              aria-label="Donation frequency"
              className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl mb-5"
            >
              <button
                type="button"
                role="tab"
                aria-selected={!recurring}
                onClick={() => setRecurring(false)}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  !recurring
                    ? "bg-background text-foreground shadow-sm border border-border/50"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart className="w-4 h-4" aria-hidden="true" /> One-time
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={recurring}
                onClick={() => setRecurring(true)}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  recurring
                    ? "bg-background text-foreground shadow-sm border border-border/50"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <RefreshCw className="w-4 h-4" aria-hidden="true" /> Monthly
              </button>
            </div>

            <p className="text-sm font-semibold text-foreground mb-3">
              Your gift helps real people
            </p>

            {/* Preset amounts */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {PRESET_AMOUNTS.map((a) => {
                const active = !custom && amount === a;
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => {
                      setAmount(a);
                      setCustom("");
                    }}
                    aria-pressed={active}
                    className={`py-3 rounded-lg text-sm font-bold border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      active
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground hover:border-primary/60"
                    }`}
                  >
                    £{a}
                  </button>
                );
              })}
            </div>

            {/* Custom amount */}
            <label className="block mb-4">
              <span className="sr-only">Custom amount in GBP</span>
              <div className="flex items-center rounded-lg border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <span className="pl-3 pr-1 text-muted-foreground font-semibold">£</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="Other amount"
                  className="w-full py-3 pr-3 bg-transparent outline-none text-foreground text-sm"
                  aria-label="Enter a custom donation amount"
                />
                <span className="pr-3 text-xs text-muted-foreground">GBP</span>
              </div>
            </label>

            {/* Gift Aid eligibility — shown before checkout */}
            <div
              role="note"
              aria-label="Gift Aid eligibility"
              className="mb-3 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-[12px] leading-relaxed text-foreground"
            >
              <span className="font-semibold text-primary">Gift Aid:</span>{" "}
              UK taxpayers can boost this gift by <strong>25%</strong> at no extra cost
              {!recurring && (
                <> — that's an extra <strong>£{(finalAmount * 0.25).toFixed(2)}</strong> from HMRC</>
              )}
              . You'll be asked to confirm eligibility on the next screen.
            </div>

            <button
              type="button"
              onClick={handleDonate}
              disabled={finalAmount < 1}
              aria-label={`Donate £${finalAmount} ${recurring ? "monthly" : "one-time"} to Living With Arthritis UK`}
              className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Donate £{finalAmount} {recurring ? "monthly" : "now"}
            </button>

            <p className="mt-3 text-[11px] text-muted-foreground text-center leading-relaxed">
              Secure checkout · Gift Aid declaration on next step · Cancel anytime
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground text-center leading-relaxed">
              By continuing you agree to our{" "}
              <a href="/privacy" className="underline hover:text-primary">privacy policy</a>.
              Gift Aid is optional and only applied if you confirm you're a UK taxpayer.
            </p>
          </div>
        </div>
      </div>

      {open && (
        <Suspense fallback={null}>
          <StripeDonationModal
            isOpen={open}
            onClose={() => setOpen(false)}
            amount={finalAmount}
            currency="GBP"
            fundType="support"
            recurring={recurring}
          />
        </Suspense>
      )}
    </section>
  );
});

InspiredHeroBand.displayName = "InspiredHeroBand";
export default InspiredHeroBand;
