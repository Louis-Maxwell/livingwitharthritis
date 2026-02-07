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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const MythCard = memo(({ item, index }: { item: PhysioMyth; index: number }) => {
  const imageSrc = item.image_url ? (imageMap[item.image_url] || item.image_url) : null;
  
  return (
    <motion.div variants={itemVariants} className="group">
      <div className="h-full bg-card rounded-2xl border border-border/50 hover:border-primary/20 hover:shadow-large transition-all duration-700 overflow-hidden">
        {imageSrc && (
          <div className="relative h-52 overflow-hidden">
            <OptimizedImage
              src={imageSrc}
              alt={`Virtual physiotherapy illustration ${index + 1}`}
              className="w-full h-full transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="editorial-caption text-white/70 bg-foreground/30 backdrop-blur-sm px-3 py-1 rounded-full">
                Myth {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
        )}
        <div className="p-7 space-y-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
              <X className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <span className="editorial-caption text-destructive mb-1 block">Myth</span>
              <p className="text-foreground font-medium leading-relaxed">
                "{item.myth}"
              </p>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span className="editorial-caption text-primary mb-1 block">Reality</span>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">
                {item.fact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

MythCard.displayName = "MythCard";

const MythSkeleton = () => (
  <div className="h-full bg-card rounded-2xl border border-border/50 overflow-hidden">
    <Skeleton className="h-52 w-full" />
    <div className="p-7 space-y-5">
      <div className="flex items-start gap-3">
        <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <Skeleton className="h-px w-full" />
      <div className="flex items-start gap-3">
        <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-3 w-12 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  </div>
);

const VirtualPhysioSection = memo(() => {
  const { data: myths, isLoading } = usePhysioMyths();

  return (
    <section className="py-28 lg:py-36 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/[0.03] rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative">
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="editorial-caption text-muted-foreground inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-border" />
            Physiotherapy
            <span className="w-8 h-px bg-border" />
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 tracking-tight">
            Virtual Physio:{" "}
            <span className="font-display italic font-normal text-gradient">Myths Busted</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Think online physio is just "nice-to-have" or second-best? Think again. 
            Thousands are recovering faster and feeling better — all from home.
          </p>
        </motion.div>

        {/* Myths Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20"
        >
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <motion.div key={i} variants={itemVariants}>
                <MythSkeleton />
              </motion.div>
            ))
          ) : (
            myths?.map((item, index) => (
              <MythCard key={item.id} item={item} index={index} />
            ))
          )}
        </motion.div>

        {/* Editorial CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative bg-accent rounded-3xl p-12 lg:p-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
            <div className="relative text-center max-w-2xl mx-auto">
              <span className="editorial-caption text-accent-foreground/40 mb-6 block">Get Started</span>
              <h3 className="text-3xl lg:text-4xl font-display font-bold text-accent-foreground mb-4 leading-tight">
                Virtual physiotherapy isn't the future —{" "}
                <span className="italic font-normal">it's the now.</span>
              </h3>
              <p className="text-accent-foreground/60 mb-10 text-lg font-light">
                Flexible. Effective. Personal. And seriously convenient.
              </p>
              <AppointmentModal
                trigger={
                  <Button
                    size="lg"
                    className="btn-premium text-primary-foreground font-bold px-12 py-7 rounded-full text-sm uppercase tracking-wider"
                  >
                    Talk to a Physio Today
                    <Sparkles className="ml-2 w-5 h-5" />
                  </Button>
                }
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

VirtualPhysioSection.displayName = "VirtualPhysioSection";

export default VirtualPhysioSection;
