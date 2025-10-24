import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Heart } from "lucide-react";

const DonationImpactSection = () => {
  const [donationType, setDonationType] = useState<"monthly" | "single">("monthly");
  const [amount, setAmount] = useState([20]);

  // Calculate impact based on amount
  const calculateImpact = (value: number) => {
    return {
      foodSachets: Math.floor(value * 3.7),
      birthKits: Math.floor(value * 0.55),
      maizeSeed: Math.floor(value * 0.1),
      hygienePacks: Math.floor(value * 0.02)
    };
  };

  const impact = calculateImpact(amount[0]);

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8">
          <div className="h-1 w-16 bg-destructive mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-8">
            EXPLORE WHAT YOUR DONATION COULD ACHIEVE
          </h2>
        </div>

        {/* Donation Type Toggle */}
        <div className="flex gap-0 mb-8 max-w-2xl mx-auto">
          <button
            onClick={() => setDonationType("monthly")}
            className={`flex-1 py-4 px-8 text-base font-semibold transition-colors ${
              donationType === "monthly"
                ? "bg-destructive text-white"
                : "bg-muted text-foreground border border-input"
            }`}
          >
            MONTHLY
          </button>
          <button
            onClick={() => setDonationType("single")}
            className={`flex-1 py-4 px-8 text-base font-semibold transition-colors ${
              donationType === "single"
                ? "bg-destructive text-white"
                : "bg-muted text-foreground border border-input"
            }`}
          >
            SINGLE
          </button>
        </div>

        {/* Slider Section */}
        <div className="bg-muted/50 py-8 px-8 mb-8">
          <div className="flex items-center gap-8 max-w-4xl mx-auto">
            <div className="flex-1">
              <Slider
                value={amount}
                onValueChange={setAmount}
                min={5}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
            <div className="text-3xl font-bold text-destructive min-w-[100px] text-right">
              £{amount[0]}
            </div>
          </div>
        </div>

        {/* Impact Display */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl mb-2">🥫</div>
            <div className="text-3xl font-bold text-foreground mb-2">{impact.foodSachets}</div>
            <div className="text-xs font-medium text-foreground">
              malnutrition treating food sachets
            </div>
          </div>
          
          <div className="text-center flex flex-col items-center">
            <div className="text-muted-foreground text-sm mb-4">OR</div>
            <div className="text-4xl mb-2">💉</div>
            <div className="text-3xl font-bold text-foreground mb-2">{impact.birthKits}</div>
            <div className="text-xs font-medium text-foreground">
              midwives' birth kits
            </div>
          </div>
          
          <div className="text-center flex flex-col items-center">
            <div className="text-muted-foreground text-sm mb-4">OR</div>
            <div className="text-4xl mb-2">🌽</div>
            <div className="text-3xl font-bold text-foreground mb-2">{impact.maizeSeed}</div>
            <div className="text-xs font-medium text-foreground">
              kilos of maize seed
            </div>
          </div>
          
          <div className="text-center flex flex-col items-center">
            <div className="text-muted-foreground text-sm mb-4">OR</div>
            <div className="text-4xl mb-2">🧴</div>
            <div className="text-3xl font-bold text-foreground mb-2">{impact.hygienePacks}</div>
            <div className="text-xs font-medium text-foreground">
              family hygiene packs
            </div>
          </div>
        </div>

        {/* Donation Button */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="bg-destructive hover:bg-destructive/90 text-white px-8 py-4 text-base font-semibold"
          >
            <Heart className="mr-2 fill-current" />
            MAKE A DONATION
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DonationImpactSection;