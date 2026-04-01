import { useState } from "react";
import { Heart, ArrowRight, Stethoscope, Users, BookOpen, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";

const IMPACT_DATA = [
  { amount: 10, label: "a week of online exercise classes", icon: Dumbbell },
  { amount: 25, label: "3 guided physiotherapy sessions", icon: Stethoscope },
  { amount: 50, label: "a month of community support for one person", icon: Users },
  { amount: 100, label: "a full arthritis self-management programme", icon: BookOpen },
];

const PRESETS = [10, 25, 50, 100];

const DonationImpactSection = () => {
  const [amount, setAmount] = useState(25);
  const navigate = useNavigate();

  const currentImpact = IMPACT_DATA.reduce((closest, item) =>
    Math.abs(item.amount - amount) < Math.abs(closest.amount - amount) ? item : closest
  , IMPACT_DATA[0]);

  const Icon = currentImpact.icon;

  return (
    <section className="section-spacer">
      <div className="container mx-auto px-6 sm:px-8 max-w-4xl">
        <div className="text-center mb-14">
          <span className="section-label text-primary/70 mb-5 block">Your Impact</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold text-foreground tracking-tight leading-[1.08]">
            See what your donation <span className="text-gradient italic">can achieve</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-base leading-relaxed">
            Every pound goes directly to supporting people living with arthritis across the UK.
          </p>
        </div>

        <div className="bg-card border border-border/20 rounded-3xl p-8 sm:p-12 shadow-xl">
          {/* Preset buttons */}
          <div className="flex justify-center gap-3 mb-10">
            {PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  amount === preset
                    ? "bg-primary text-primary-foreground shadow-primary"
                    : "bg-muted hover:bg-muted/70 text-foreground"
                }`}
              >
                £{preset}
              </button>
            ))}
          </div>

          {/* Slider */}
          <div className="mb-10 px-2">
            <Slider
              value={[amount]}
              onValueChange={(v) => setAmount(v[0])}
              min={5}
              max={150}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between mt-2.5 text-[10px] text-muted-foreground/50 tracking-wider">
              <span>£5</span>
              <span>£150</span>
            </div>
          </div>

          {/* Impact display */}
          <div className="text-center bg-primary/[0.03] rounded-2xl p-8 sm:p-10 border border-primary/6">
            <div className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-5">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <p className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-3 tracking-tight">£{amount}</p>
            <p className="text-sm sm:text-base text-muted-foreground">
              could fund <span className="font-semibold text-foreground">{currentImpact.label}</span>
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <Button
              size="lg"
              onClick={() => navigate("/zakat-appeal")}
              className="px-12 h-[58px] rounded-full text-sm font-bold btn-primary-cta tracking-wider group"
            >
              <Heart className="w-5 h-5 mr-2.5 fill-white/20" />
              Donate £{amount} Now
              <ArrowRight className="w-4 h-4 ml-2.5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-[11px] text-muted-foreground/50 mt-4 tracking-wider">
              Secure payment via Stripe • Gift Aid eligible
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationImpactSection;
