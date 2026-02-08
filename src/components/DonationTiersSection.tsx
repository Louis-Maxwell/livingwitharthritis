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

  const tierGradients = [
    "bg-gradient-to-br from-secondary to-secondary/80",
    "bg-gradient-to-br from-primary to-primary/80",
    "bg-gradient-to-br from-navy to-navy/90",
  ];

  return (
    <section className="py-16 lg:py-24 bg-background relative overflow-hidden section-divider">
      <div className="gradient-orb w-[400px] h-[400px] bg-primary bottom-[-80px] left-[-100px]" />

      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label text-primary mb-3 block">Support Us</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-3 tracking-tight">
            Make a <span className="text-primary">difference</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Every donation supports research, patient care, and community programmes.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
            tiers?.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className={`relative group h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-large ${
                  i === 1 ? 'ring-2 ring-primary/40 ring-offset-2 ring-offset-background' : ''
                }`}>
                  <div className={`${tierGradients[i] || tierGradients[0]} p-7 sm:p-8 lg:p-10 text-white h-full flex flex-col relative`}>
                    {/* Subtle pattern */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }} />

                    <div className="relative flex-1 flex flex-col">
                      {i === 1 && (
                        <span className="text-[10px] font-semibold text-white/80 bg-white/15 px-3 py-1 rounded-full mb-4 self-start uppercase tracking-wider">
                          Most Popular
                        </span>
                      )}
                      <h3 className="text-3xl sm:text-4xl font-display font-bold mb-1 tracking-tight">{tier.amount}</h3>
                      <span className="section-label text-white/50 mb-5 block text-[10px]">Donation</span>
                      <div className="w-8 h-px bg-white/20 mb-5" />

                      <ul className="space-y-3 mb-7 flex-1">
                        {tier.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                            <span className="text-white/85 text-sm leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        onClick={() => handleDonate(tier.amount)}
                        className="w-full bg-white/15 hover:bg-white/25 text-white border border-white/20 hover:border-white/40 font-semibold py-4 rounded-full transition-all text-sm"
                      >
                        Donate {tier.amount}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
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