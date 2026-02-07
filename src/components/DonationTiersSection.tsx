import { memo, useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useDonationTiers } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import PayPalDonationModal from "./PayPalDonationModal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const TierSkeleton = () => (
  <div className="bg-card rounded-3xl p-10 border border-border/50">
    <Skeleton className="h-10 w-32 mb-8" />
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  </div>
);

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

  return (
    <section className="py-28 lg:py-36 bg-muted/30 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/[0.03] rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="editorial-caption text-muted-foreground inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-border" />
            Support Us
            <span className="w-8 h-px bg-border" />
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 tracking-tight">
            Make a{" "}
            <span className="font-display italic font-normal text-gradient">Difference</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Every donation directly supports research, patient care, and community programmes.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <motion.div key={i} variants={itemVariants}>
                <TierSkeleton />
              </motion.div>
            ))
          ) : (
            tiers?.map((tier, i) => (
              <motion.div key={tier.id} variants={itemVariants}>
                <div className={`relative group h-full rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-2 ${
                  i === 1 ? 'ring-2 ring-primary/30' : ''
                }`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-90`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  <div className="relative p-10 lg:p-12 text-white">
                    {i === 1 && (
                      <span className="editorial-caption text-white/60 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-6 inline-block">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-4xl lg:text-5xl font-display font-bold mb-2 tracking-tight">
                      {tier.amount}
                    </h3>
                    <span className="editorial-caption text-white/50 mb-8 block">Donation</span>
                    
                    <div className="w-12 h-px bg-white/20 mb-8" />

                    <ul className="space-y-4 mb-10">
                      {tier.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-white/85 text-sm font-light leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleDonate(tier.amount)}
                      className="w-full bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white border border-white/20 hover:border-white/40 font-semibold py-6 rounded-full transition-all duration-500 uppercase tracking-wider text-xs"
                    >
                      Donate {tier.amount}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
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
