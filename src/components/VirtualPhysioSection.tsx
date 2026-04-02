import { memo, useRef } from "react";
import physioMyth1 from "@/assets/physio-myth-1.jpg";
import physioMyth2 from "@/assets/physio-myth-2.jpg";
import physioMyth3 from "@/assets/physio-myth-3.jpg";
import physioMyth4 from "@/assets/physio-myth-4.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, X, Sparkles, ShieldCheck, BookOpen, ArrowRight, Activity, Users, Brain, Heart } from "lucide-react";
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

const mythIcons = [Activity, Users, Brain, Heart];

const sourceLabels = [
  "NHS, NICE & Cochrane Review",
  "Versus Arthritis UK Data",
  "Journal of the American Board of Family Medicine",
  "NICE Clinical Guidelines",
];

const keyStats = [
  { stat: "25–30%", label: "less pain with exercise" },
  { stat: "15,000", label: "UK children with JIA" },
  { stat: "60 years", label: "of knuckle-cracking studied" },
  { stat: "10M+", label: "people affected in UK" },
];

const MythCard = memo(({ item, index }: { item: PhysioMyth; index: number }) => {
  const imageSrc = item.image_url ? (imageMap[item.image_url] || item.image_url) : null;
  const IconComp = mythIcons[index % mythIcons.length];
  const stat = keyStats[index % keyStats.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="h-full bg-card rounded-2xl border border-border/30 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500">
        {/* Image with overlay badge */}
        {imageSrc && (
          <div className="relative h-56 overflow-hidden">
            <OptimizedImage
              src={imageSrc}
              alt={`Physiotherapy myth illustration: ${item.myth.slice(0, 50)}`}
              className="w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="text-[10px] font-bold text-white bg-primary px-3 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-md">
                Myth #{index + 1}
              </span>
            </div>
            {/* Key stat floating badge */}
            <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-md border border-border/20">
              <p className="text-xl font-bold text-primary leading-none">{stat.stat}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          </div>
        )}

        <div className="p-6 space-y-5">
          {/* Myth */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
              <X className="w-4.5 h-4.5 text-destructive" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-semibold text-destructive uppercase tracking-[0.15em] mb-1 block">
                Common Myth
              </span>
              <p className="text-foreground font-semibold text-[15px] leading-snug">
                "{item.myth}"
              </p>
            </div>
          </div>

          <div className="h-px bg-border/40" />

          {/* Fact */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
              <Check className="w-4.5 h-4.5 text-green-600" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-semibold text-green-600 uppercase tracking-[0.15em] mb-1 block">
                Evidence-Based Reality
              </span>
              <p className="text-muted-foreground text-sm leading-[1.8]">{item.fact}</p>
            </div>
          </div>

          {/* Source citation */}
          <div className="flex items-center gap-2 pt-2 border-t border-border/20">
            <ShieldCheck className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
            <p className="text-[11px] text-muted-foreground/60 italic">
              Source: {sourceLabels[index % sourceLabels.length]}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

MythCard.displayName = "MythCard";

const VirtualPhysioSection = memo(() => {
  const { data: myths, isLoading } = usePhysioMyths();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const ctaBgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-accent/30 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
        backgroundSize: '48px 48px'
      }} />

      <div className="container mx-auto px-6 md:px-10 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-5 py-2 mb-6">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em]">
              Physiotherapy Education
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-5 tracking-tight leading-tight">
            Virtual physio:{" "}
            <span className="text-primary italic">myths busted</span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Outdated beliefs prevent millions from getting effective arthritis treatment.
            Here's what the <strong className="text-foreground">latest clinical evidence</strong> actually says —
            reviewed by our HCPC-registered physiotherapists.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/60">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary/50" />
              HCPC Registered
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary/50" />
              NHS-Aligned
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary/50" />
              Evidence-Based
            </span>
          </div>
        </motion.div>

        {/* Myths grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border/20 overflow-hidden">
                <Skeleton className="h-56 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))
          ) : (
            myths?.map((item, index) => (
              <MythCard key={item.id} item={item} index={index} />
            ))
          )}
        </div>

        {/* Summary stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {[
            { value: "150 min", desc: "Weekly exercise recommended by NICE", icon: Activity },
            { value: "10M+", desc: "UK adults living with arthritis", icon: Users },
            { value: "1 in 6", desc: "Adults affected across the UK", icon: Heart },
            { value: "93%", desc: "Patients report improved mobility", icon: Check },
          ].map((s, i) => (
            <div key={i} className="bg-card rounded-xl border border-border/20 p-5 text-center">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-primary rounded-2xl p-12 lg:p-20 text-center text-white relative overflow-hidden"
        >
          <motion.div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" style={{ y: ctaBgY }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />

          <div className="relative max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-white/80">Appointments available this week</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4 leading-tight">
              Virtual physiotherapy isn't the future —{" "}
              <span className="italic font-normal opacity-90">it's the now.</span>
            </h3>
            <p className="text-white/50 mb-10 text-base sm:text-lg leading-relaxed">
              HCPC-registered physiotherapists. No waiting lists. No referral needed.
              Flexible sessions from the comfort of your home.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AppointmentModal
                trigger={
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 h-13 rounded-full text-sm font-semibold tracking-wide shadow-lg">
                    Book a Free Consultation
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                }
              />
              <p className="text-white/30 text-xs">Free · No obligation · Takes 2 minutes</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

VirtualPhysioSection.displayName = "VirtualPhysioSection";

export default VirtualPhysioSection;
