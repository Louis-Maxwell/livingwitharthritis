import { memo, useState } from "react";
import physioMyth1 from "@/assets/physio-myth-1.jpg";
import physioMyth2 from "@/assets/physio-myth-2.jpg";
import physioMyth3 from "@/assets/physio-myth-3.jpg";
import physioMyth4 from "@/assets/physio-myth-4.jpg";
import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { usePhysioMyths, PhysioMyth } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";
import { AppointmentModal } from "@/components/AppointmentModal";

const imageMap: Record<string, string> = {
  "/assets/physio-myth-1.jpg": physioMyth1,
  "/assets/physio-myth-2.jpg": physioMyth2,
  "/assets/physio-myth-3.jpg": physioMyth3,
  "/assets/physio-myth-4.jpg": physioMyth4,
};

const MythCard = memo(({ item, index }: { item: PhysioMyth; index: number }) => {
  const imageSrc = item.image_url ? (imageMap[item.image_url] || item.image_url) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <div className="h-full bg-card rounded-2xl border border-border/50 hover:border-primary/20 hover:shadow-medium transition-all duration-300 overflow-hidden card-hover">
        {imageSrc && (
          <div className="relative h-48 overflow-hidden">
            <OptimizedImage
              src={imageSrc}
              alt={`Physiotherapy illustration ${index + 1}`}
              className="w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className="text-xs font-semibold text-white bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full">
                Myth {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
        )}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
              <X className="w-3.5 h-3.5 text-destructive" />
            </div>
            <div>
              <span className="section-label text-destructive mb-1 block text-[10px]">Myth</span>
              <p className="text-foreground font-medium text-sm leading-relaxed">"{item.myth}"</p>
            </div>
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5">
              <Check className="w-3.5 h-3.5 text-secondary" />
            </div>
            <div>
              <span className="section-label text-secondary mb-1 block text-[10px]">Reality</span>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.fact}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

MythCard.displayName = "MythCard";

const VirtualPhysioSection = memo(() => {
  const { data: myths, isLoading } = usePhysioMyths();

  return (
    <section className="py-20 lg:py-28 bg-accent relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label text-secondary mb-3 block">Physiotherapy</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 tracking-tight">
            Virtual physio: <span className="text-secondary">myths busted</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Think online physio is second-best? Think again. Thousands are recovering faster — all from home.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            ))
          ) : (
            myths?.map((item, index) => (
              <MythCard key={item.id} item={item} index={index} />
            ))
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-navy rounded-3xl p-10 lg:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
          <div className="relative max-w-2xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-display font-bold mb-3">
              Virtual physiotherapy isn't the future — <span className="text-gold italic font-normal">it's the now.</span>
            </h3>
            <p className="text-white/70 mb-8 text-lg">
              Flexible. Effective. Personal. And seriously convenient.
            </p>
            <AppointmentModal
              trigger={
                <Button size="lg" className="btn-primary-cta px-10 py-6 rounded-full text-base">
                  Talk to a Physio Today
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              }
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
});

VirtualPhysioSection.displayName = "VirtualPhysioSection";
export default VirtualPhysioSection;