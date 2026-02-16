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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="h-full bg-card rounded-3xl border border-border/20 hover:border-primary/10 hover:shadow-large transition-all duration-500 overflow-hidden card-hover">
        {imageSrc && (
          <div className="relative h-48 overflow-hidden">
            <OptimizedImage
              src={imageSrc}
              alt={`Physiotherapy illustration ${index + 1}`}
              className="w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/5 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="text-[10px] font-bold text-white bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-widest">
                Myth {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
        )}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-destructive/6 flex items-center justify-center mt-0.5">
              <X className="w-3.5 h-3.5 text-destructive" />
            </div>
            <div>
              <span className="section-label text-destructive mb-1.5 block text-[10px]">Myth</span>
              <p className="text-foreground font-medium text-sm leading-relaxed">"{item.myth}"</p>
            </div>
          </div>
          <div className="h-px bg-border/40" />
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary/6 flex items-center justify-center mt-0.5">
              <Check className="w-3.5 h-3.5 text-secondary" />
            </div>
            <div>
              <span className="section-label text-secondary mb-1.5 block text-[10px]">Reality</span>
              <p className="text-muted-foreground text-sm leading-[1.7]">{item.fact}</p>
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
    <section className="py-24 lg:py-36 bg-accent/30 relative">
      <div className="container mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label text-secondary mb-4 block">Physiotherapy</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-display font-bold text-foreground mb-5 tracking-tight">
            Virtual physio: <span className="text-secondary italic">myths busted</span>
          </h2>
          <p className="text-base text-muted-foreground/70 max-w-xl mx-auto leading-relaxed">
            Think online physio is second-best? Think again. Thousands are recovering faster — all from home.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card rounded-3xl border border-border/20 overflow-hidden">
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-navy rounded-[2rem] p-12 lg:p-20 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
          <div className="relative max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4">
              Virtual physiotherapy isn't the future — <span className="text-gold italic font-normal">it's the now.</span>
            </h3>
            <p className="text-white/40 mb-10 text-base sm:text-lg leading-relaxed">
              Flexible. Effective. Personal. And seriously convenient.
            </p>
            <AppointmentModal
              trigger={
                <Button size="lg" className="btn-primary-cta px-10 h-14 rounded-full text-sm tracking-wider">
                  Talk to a Physio Today
                  <Sparkles className="ml-2.5 w-4 h-4" />
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