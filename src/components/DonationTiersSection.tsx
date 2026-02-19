import { memo, useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useDonationTiers } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import PayPalDonationModal from "./PayPalDonationModal";

const DonationTiersSection = memo(() => {
  const { data: tiers, isLoading } = useDonationTiers();
  const [paypalOpen, setPaypalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);

  const parseAmount = (amount: string): number => {
    const num = parseFloat(amount.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  const handleDonate = (amount: string) => {
    setSelectedAmount(parseAmount(amount));
    setPaypalOpen(true);
  };

  const tierStyles = [
    { bg: "bg-secondary", ring: "" },
    { bg: "bg-primary", ring: "ring-2 ring-primary/30 ring-offset-2 ring-offset-background" },
    { bg: "bg-navy", ring: "" },
  ];

  return (
    <section className="py-14 lg:py-18 bg-background relative overflow-hidden section-divider">
      <div className="gradient-orb w-[500px] h-[500px] bg-primary bottom-[-100px] left-[-150px]" />

      <div className="container mx-auto px-5 md:px-8 max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="section-label text-primary mb-2 block">Support Us</span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2 tracking-tight">
            Make a <span className="text-primary">difference</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Every donation supports research, patient care, and community programmes.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border">
                <Skeleton className="h-10 w-28 mb-6" />
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, j) => <Skeleton key={j} className="h-4 w-full" />)}
                </div>
              </div>
            ))
          ) : (
            tiers?.map((tier, i) => {
              const style = tierStyles[i] || tierStyles[0];
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <div className={`relative group h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-large ${style.ring}`}>
                    <div className={`${style.bg} p-5 sm:p-6 text-white h-full flex flex-col relative`}>
                      <div className="relative flex-1 flex flex-col">
                        {i === 1 && (
                          <span className="text-[10px] font-semibold text-white/70 bg-white/12 px-3 py-1 rounded-full mb-3 self-start uppercase tracking-wider">
                            Most Popular
                          </span>
                        )}
                        <h3 className="text-2xl sm:text-3xl font-display font-bold mb-1 tracking-tight">{tier.amount}</h3>
                        <span className="section-label text-white/40 mb-3 block text-[10px]">Donation</span>
                        <div className="w-8 h-px bg-white/15 mb-3" />

                        <ul className="space-y-2 mb-5 flex-1">
                          {tier.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="flex-shrink-0 w-3.5 h-3.5 rounded-full bg-white/15 flex items-center justify-center mt-0.5">
                                <Check className="w-2 h-2 text-white" />
                              </div>
                              <span className="text-white/75 text-xs leading-relaxed">{benefit}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          onClick={() => handleDonate(tier.amount)}
                          className="w-full bg-white/12 hover:bg-white/20 text-white border border-white/15 hover:border-white/30 font-semibold h-10 rounded-full transition-all text-xs"
                        >
                          Donate {tier.amount}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      <PayPalDonationModal
        isOpen={paypalOpen}
        onClose={() => setPaypalOpen(false)}
        amount={selectedAmount}
        currency="GBP"
        fundType="general"
      />
    </section>
  );
});

DonationTiersSection.displayName = "DonationTiersSection";
export default DonationTiersSection;
