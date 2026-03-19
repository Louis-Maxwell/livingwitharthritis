import { memo, useState, useCallback, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Heart, Loader2, Shield, Lock, Users, CheckCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const StripeDonationModal = lazy(() => import("@/components/StripeDonationModal"));

const GOAL = 50000;
const PRESET_AMOUNTS = [10, 25, 50, 100];

const FundraisingProgressSection = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
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
    if (!isNaN(num) && num > 0) {
      setSelectedAmount(num);
    }
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

  const formattedRaised = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalRaised);

  const formattedGoal = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(GOAL);

  return (
    <section id="involved" className="py-14 lg:py-20 bg-tint-rose section-divider">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="premium-card p-10 lg:p-14 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Help us reach our <span className="text-primary italic">goal</span>
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto">
            Every donation helps us provide free physiotherapy and support to more people living with arthritis.
          </p>

          {/* Progress bar */}
          <div className="max-w-md mx-auto mb-2">
            <Progress value={progressPercent} className="h-3 rounded-full" />
          </div>
          <div className="flex justify-between text-sm mb-8 max-w-md mx-auto">
            <span className="text-primary font-bold">{formattedRaised} raised</span>
            <span className="text-muted-foreground">{formattedGoal} goal</span>
          </div>

          {/* Donor count */}
          {donorCount > 0 && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Users className="w-4 h-4 text-primary/60" />
              <span><strong className="text-foreground">{donorCount}</strong> generous {donorCount === 1 ? "donor has" : "donors have"} contributed</span>
            </div>
          )}

          {/* Amount selector */}
          <div className="max-w-md mx-auto mb-6">
            <p className="text-sm font-medium text-foreground mb-3">Choose your amount</p>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handlePresetClick(amt)}
                  className={`py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border ${
                    !isCustom && selectedAmount === amt
                      ? "bg-primary text-primary-foreground border-primary shadow-md scale-[1.02]"
                      : "bg-card text-foreground border-border/50 hover:border-primary/40 hover:bg-primary/5"
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
                className={`pl-7 h-11 rounded-xl text-sm transition-all ${
                  isCustom && customAmount
                    ? "border-primary ring-1 ring-primary/20"
                    : "border-border/50"
                }`}
              />
            </div>
          </div>

          {/* CTA button */}
          <Button
            className="rounded-full btn-gold px-10 h-13 text-base font-semibold mb-6"
            onClick={handleDonate}
            disabled={isLoading}
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing…</>
            ) : (
              <><Heart className="w-4 h-4 mr-2" /> Donate £{getDonationAmount() || "..."}</>
            )}
          </Button>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-primary/50" />
              256-bit SSL Encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-primary/50" />
              Charity Reg. 1234567
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500/70" />
              Gift Aid Eligible
            </span>
          </div>

          {/* Impact statement */}
          <div className="bg-accent/50 rounded-xl px-5 py-3 max-w-sm mx-auto mb-5">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">88p of every £1</strong> goes directly to patient care and research. 
              Your donation is tax-deductible with Gift Aid.
            </p>
          </div>

          {/* Corporate giving link */}
          <button
            onClick={() => navigate("/corporate-giving")}
            className="inline-flex items-center gap-1.5 text-xs text-primary/70 hover:text-primary font-medium transition-colors"
          >
            <Building2 className="w-3.5 h-3.5" />
            Looking for corporate or matched giving?
          </button>
        </motion.div>
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
