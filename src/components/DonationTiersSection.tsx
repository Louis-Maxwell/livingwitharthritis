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
    "bg-secondary",
    "bg-primary",
    "bg-navy",
  ];

  return (
    <section className="py-20 lg:py-28 bg-background relative">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label text-primary mb-3 block">Support Us</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 tracking-tight">
            Make a <span className="text-primary">difference</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every donation directly supports research, patient care, and community programmes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border">
                <Skeleton className="h-10 w-32 mb-6" />
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            ))
          ) : (
            tiers?.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={`relative group h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-large ${
                  i === 1 ? 'ring-2 ring-primary/40 ring-offset-2' : ''
                }`}>
                  <div className={`${tierStyles[i] || 'bg-secondary'} p-8 lg:p-10 text-white h-full flex flex-col`}>
                    {i === 1 && (
                      <span className="text-xs font-semibold text-white/80 bg-white/15 px-3 py-1 rounded-full mb-4 self-start">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-4xl font-display font-bold mb-1 tracking-tight">{tier.amount}</h3>
                    <span className="section-label text-white/50 mb-6 block text-[10px]">Donation</span>
                    <div className="w-10 h-px bg-white/20 mb-6" />

                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-white/85 text-sm leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleDonate(tier.amount)}
                      className="w-full bg-white/15 hover:bg-white/25 text-white border border-white/20 hover:border-white/40 font-semibold py-5 rounded-full transition-all text-sm"
                    >
                      Donate {tier.amount}
                    </Button>
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