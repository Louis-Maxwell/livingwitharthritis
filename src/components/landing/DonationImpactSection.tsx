import { useState } from "react";
import { Heart, ArrowRight, Stethoscope, Users, BookOpen, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";

const IMPACT_DATA = [
  { amount: 10, label: "a week of gentle online exercise classes for someone in pain", icon: Dumbbell },
  { amount: 25, label: "three guided physiotherapy sessions for a neighbour who can't afford private care", icon: Stethoscope },
  { amount: 50, label: "a month of warm, peer-led community support", icon: Users },
  { amount: 100, label: "a full self-help programme for one family living with arthritis", icon: BookOpen },
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
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-4xl">
        <div className="text-center mb-16">
          <span className="section-label text-primary mb-5 block">A small gift, a real difference</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.06]">
            Your kindness keeps this <span className="text-primary italic">free for everyone</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-lg mx-auto text-base sm:text-lg leading-relaxed">
            Every pound you give goes straight to helping a neighbour in the UK live a little better with arthritis. Thank you.
          </p>
        </div>

        <div className="bg-card border border-border/15 rounded-3xl p-10 sm:p-14 shadow-xl">
          {/* Preset buttons */}
          <div className="flex justify-center gap-3 mb-12">
            {PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset)}
                className={`px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  amount === preset
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-muted hover:bg-muted/70 text-foreground"
                }`}
              >
                £{preset}
              </button>
            ))}
          </div>

          {/* Slider */}
          <div className="mb-12 px-2">
            <Slider
              value={[amount]}
              onValueChange={(v) => setAmount(v[0])}
              min={5}
              max={150}
              step={5}
              className="w-full"
              aria-label="Monthly donation amount in pounds"
              aria-valuetext={`£${amount} per month`}
            />
            <div className="flex justify-between mt-3 text-[10px] text-muted-foreground tracking-[0.15em] uppercase">
              <span>£5</span>
              <span>£150</span>
            </div>
          </div>

          {/* Impact display */}
          <div className="text-center bg-primary/[0.02] rounded-2xl p-10 sm:p-12 border border-primary/[0.04]">
            <div className="w-18 h-18 rounded-2xl bg-primary/[0.06] flex items-center justify-center mx-auto mb-6">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <p className="text-5xl sm:text-6xl font-display font-bold text-foreground mb-4 tracking-tight">£{amount}</p>
            <p className="text-base sm:text-lg text-muted-foreground">
              from you could give someone <span className="font-semibold text-foreground">{currentImpact.label}</span>
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Button
              size="lg"
              onClick={() => navigate("/donate")}
              className="px-14 h-[62px] rounded-full text-sm font-bold btn-primary-cta tracking-wider group"
            >
              <Heart className="w-5 h-5 mr-2.5 fill-white/20" />
              Give £{amount} with kindness
              <ArrowRight className="w-4 h-4 ml-2.5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-[10px] text-muted-foreground mt-5 tracking-[0.15em] uppercase">
              Secure payment · Gift Aid adds 25p to every £1
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationImpactSection;
