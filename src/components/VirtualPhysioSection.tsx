import { memo } from "react";
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

// Map image URLs to local imports for fallback
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
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const MythCard = memo(({ item, index }: { item: PhysioMyth; index: number }) => {
  const imageSrc = item.image_url ? (imageMap[item.image_url] || item.image_url) : null;
  
  return (
    <motion.div variants={itemVariants} className="group">
      <div className="h-full bg-card rounded-2xl border border-border/50 hover:border-primary/20 hover:shadow-large transition-all duration-500 overflow-hidden">
        {imageSrc && (
          <div className="relative h-48 overflow-hidden">
            <OptimizedImage
              src={imageSrc}
              alt={`Virtual physiotherapy illustration ${index + 1}`}
              className="w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          </div>
        )}
        <div className="p-6 space-y-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
              <X className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <span className="text-xs font-bold text-destructive uppercase tracking-wider">
                Myth #{index + 1}
              </span>
              <p className="text-foreground font-medium mt-1 leading-relaxed">
                "{item.myth}"
              </p>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Reality
              </span>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
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
    <Skeleton className="h-48 w-full" />
    <div className="p-6 space-y-5">
      <div className="flex items-start gap-3">
        <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mt-1" />
        </div>
      </div>
      <Skeleton className="h-px w-full" />
      <div className="flex items-start gap-3">
        <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-3 w-12 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/6 mt-1" />
        </div>
      </div>
    </div>
  </div>
);

const VirtualPhysioSection = memo(() => {
  const { data: myths, isLoading } = usePhysioMyths();

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6"
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Virtual Physio: <span className="text-gradient">Myths Busted</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Think online physio is just "nice-to-have" or second-best? Think again. 
            Thousands are recovering faster and feeling better—all from home.
          </p>
        </motion.div>

        {/* Myths Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl p-10 lg:p-14 border border-border/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
            <div className="relative text-center max-w-2xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4">
                Virtual physiotherapy isn't the future—it's the now.
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Flexible. Effective. Personal. And seriously convenient.
              </p>
              <Button
                size="lg"
                className="btn-premium text-primary-foreground font-bold px-10 py-6 rounded-full text-base"
              >
                Talk to a Physio Today
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

VirtualPhysioSection.displayName = "VirtualPhysioSection";

export default VirtualPhysioSection;
