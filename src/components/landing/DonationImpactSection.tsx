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
    <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-10">
          <span className="section-label text-primary mb-4 block text-xs font-bold tracking-wider uppercase">Your Impact</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight">
            See what your donation <span className="text-gradient italic">can achieve</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm sm:text-base">
            Every pound goes directly to supporting people living with arthritis across the UK.
          </p>
        </div>

        <div className="bg-card border border-border/30 rounded-3xl p-6 sm:p-10 shadow-xl">
          {/* Preset buttons */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-8">
            {PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  amount === preset
                    ? "bg-[hsl(0,72%,51%)] text-white shadow-lg shadow-red-500/20"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                £{preset}
              </button>
            ))}
          </div>

          {/* Slider */}
          <div className="mb-8 px-2">
            <Slider
              value={[amount]}
              onValueChange={(v) => setAmount(v[0])}
              min={5}
              max={150}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
              <span>£5</span>
              <span>£150</span>
            </div>
          </div>

          {/* Impact display */}
          <div className="text-center bg-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/10">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <p className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">£{amount}</p>
            <p className="text-sm sm:text-base text-muted-foreground">
              could fund <span className="font-semibold text-foreground">{currentImpact.label}</span>
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={() => navigate("/zakat-appeal")}
              className="px-10 h-14 rounded-full text-sm font-bold bg-[hsl(0,72%,51%)] hover:bg-[hsl(0,72%,45%)] text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all group"
            >
              <Heart className="w-5 h-5 mr-2 fill-white/30" />
              Donate £{amount} Now
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-[11px] text-muted-foreground mt-3">
              Secure payment via Stripe • Gift Aid eligible
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationImpactSection;
