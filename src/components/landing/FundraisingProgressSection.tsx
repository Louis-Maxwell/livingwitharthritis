import { memo, useState, useCallback, useEffect, useRef, lazy, Suspense } from "react";
import { Heart, Loader2, Shield, Lock, Users, CheckCircle, Building2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const StripeDonationModal = lazy(() => import("@/components/StripeDonationModal"));

const GOAL = 50000;
const PRESET_AMOUNTS = [10, 25, 50, 100];
const MILESTONES = [
  { at: 10000, label: "£10K" },
  { at: 25000, label: "£25K" },
  { at: 40000, label: "£40K" },
];

/** Thermometer bulb + tube — CSS-only animation */
const Thermometer = memo(({ percent }: { percent: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 2000;
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setAnimatedPercent(eased * percent);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, percent]);

  return (
    <div ref={ref} className="relative flex flex-col items-center" style={{ height: 280 }}>
      <div className="relative w-8 flex-1 rounded-t-full overflow-hidden bg-muted/40 border border-border/30">
        <div
          className="absolute bottom-0 left-0 right-0 rounded-t-full transition-all duration-[2000ms] ease-out"
          style={{
            height: `${animatedPercent}%`,
            background: "linear-gradient(to top, hsl(var(--primary)), hsl(var(--primary) / 0.7))",
          }}
        />
        {MILESTONES.map((m) => {
          const pos = (m.at / GOAL) * 100;
          return (
            <div key={m.at} className="absolute left-full ml-2 flex items-center gap-1" style={{ bottom: `${pos}%`, transform: "translateY(50%)" }}>
              <div className="w-2 h-px bg-border" />
              <span className="text-[9px] text-muted-foreground font-medium whitespace-nowrap">{m.label}</span>
            </div>
          );
        })}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 rounded-full opacity-60 blur-[2px]" style={{ height: `${animatedPercent}%`, background: "hsl(var(--primary))" }} />
      </div>
      <div className="relative w-16 h-16 rounded-full border-2 border-border/30 bg-muted/40 flex items-center justify-center -mt-1 z-10">
        <div className="absolute inset-1 rounded-full animate-pulse" style={{ background: "hsl(var(--primary))" }} />
        <Heart className="w-5 h-5 text-primary-foreground relative z-10" fill="currentColor" />
      </div>
    </div>
  );
});
Thermometer.displayName = "Thermometer";

const FundraisingProgressSection = memo(() => {
  const [totalRaised, setTotalRaised] = useState(0);
  const [donorCount, setDonorCount] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotal = async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("amount")
        .eq("status", "completed");

      if (!error && data) {
        const sum = data.reduce((acc, d) => acc + Number(d.amount), 0);
        setTotalRaised(sum);
        setDonorCount(data.length);
      }
    };
    fetchTotal();
  }, []);

  const progressPercent = Math.min((totalRaised / GOAL) * 100, 100);

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleCustomChange = (value: string) => {
    setCustomAmount(value);
    setIsCustom(true);
    const num = parseFloat(value);
    if (!isNaN(num) && num > 0) setSelectedAmount(num);
  };

  const getDonationAmount = () => {
    if (isCustom) {
      const num = parseFloat(customAmount);
      return !isNaN(num) && num > 0 ? num : 0;
    }
    return selectedAmount;
  };

  const handleDonate = useCallback(() => {
    const amount = getDonationAmount();
    if (amount <= 0) {
      toast.error("Please select or enter a donation amount");
      return;
    }
    setIsModalOpen(true);
  }, [selectedAmount, customAmount, isCustom]);

  const formattedGoal = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(GOAL);

  return (
    <section id="involved" className="py-16 lg:py-24 bg-tint-rose section-divider relative overflow-hidden">
      <div className="gradient-orb w-[600px] h-[600px] bg-primary top-[-200px] right-[-200px]" />
      <div className="gradient-orb w-[400px] h-[400px] bg-secondary bottom-[-100px] left-[-100px]" />

      <div className="container mx-auto px-6 md:px-10 max-w-5xl relative">
        <div className="text-center mb-10">
          <span className="section-label text-primary mb-2 block">Fundraising</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3 tracking-tight">
            Help us reach <span className="text-primary italic">our goal</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Every pound brings us closer to free physiotherapy, cutting-edge research, and life-changing support for thousands.
          </p>
        </div>

        <div className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-14 items-start">
          {/* Thermometer column */}
          <div className="hidden lg:flex flex-col items-center gap-4">
            <Thermometer percent={progressPercent} />
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-foreground">
                <AnimatedCounter target={totalRaised} prefix="£" compact duration={2200} className="text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">of {formattedGoal} goal</p>
            </div>
          </div>

          {/* Main card */}
          <div className="premium-card p-8 lg:p-12">
            {/* Mobile progress bar */}
            <div className="lg:hidden mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-primary font-bold">
                  <AnimatedCounter target={totalRaised} prefix="£" compact duration={2000} />
                  <span className="text-muted-foreground font-normal"> raised</span>
                </span>
                <span className="text-muted-foreground">{formattedGoal} goal</span>
              </div>
              <div className="relative h-4 rounded-full bg-muted/50 overflow-hidden border border-border/20">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-[2000ms] ease-out"
                  style={{
                    width: `${progressPercent}%`,
                    background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.75))",
                  }}
                />
              </div>
            </div>

            {/* Stats row — real data only */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Users, label: "Donors", value: donorCount, suffix: "" },
                { icon: TrendingUp, label: "Progress", value: Math.round(progressPercent), suffix: "%" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-accent/40 border border-border/20">
                  <stat.icon className="w-4 h-4 mx-auto mb-1 text-primary/60" />
                  <div className="text-lg font-display font-bold text-foreground">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={1800} />
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Amount selector */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-3">Choose your impact</p>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {PRESET_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handlePresetClick(amt)}
                    className={`py-3 rounded-xl text-sm font-bold transition-all duration-200 border ${
                      !isCustom && selectedAmount === amt
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-[1.03]"
                        : "bg-card text-foreground border-border/40 hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    £{amt}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">£</span>
                <Input
                  type="number"
                  min="1"
                  max="100000"
                  placeholder="Other amount"
                  value={customAmount}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  onFocus={() => setIsCustom(true)}
                  className={`pl-7 h-12 rounded-xl text-sm transition-all ${
                    isCustom && customAmount
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border/40"
                  }`}
                />
              </div>
            </div>

            {/* CTA */}
            <Button
              className="w-full rounded-full btn-gold h-14 text-base font-semibold mb-6 shadow-lg shadow-primary/15"
              onClick={handleDonate}
            >
              <Heart className="w-5 h-5 mr-2" /> Donate £{getDonationAmount() || "..."}
            </Button>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground mb-5">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-primary/50" /> 256-bit SSL
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-primary/50" /> UK Registered
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-primary/70" /> Gift Aid Eligible
              </span>
            </div>

            {/* Impact note */}
            <div className="bg-accent/40 rounded-xl px-5 py-3 text-center mb-4">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">88p of every £1</strong> goes directly to patient care & research. Tax-deductible with Gift Aid.
              </p>
            </div>

            <button
              onClick={() => navigate("/corporate-giving")}
              className="inline-flex items-center gap-1.5 text-xs text-primary/70 hover:text-primary font-medium transition-colors mx-auto w-full justify-center"
            >
              <Building2 className="w-3.5 h-3.5" /> Corporate & matched giving →
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Suspense fallback={null}>
          <StripeDonationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            amount={getDonationAmount()}
            currency="GBP"
            fundType="general"
          />
        </Suspense>
      )}
    </section>
  );
});

FundraisingProgressSection.displayName = "FundraisingProgressSection";
export default FundraisingProgressSection;
