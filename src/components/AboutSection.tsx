import { memo, useRef } from "react";
import { Activity, Users, Briefcase, Database, BookOpen, HeartHandshake, LucideIcon, Sparkles, Shield, Stethoscope } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const iconMap: Record<string, LucideIcon> = { Users, Activity, Briefcase, Database, BookOpen, HeartHandshake };

/* Decorative DNA helix SVG */
const DNAGraphic = () => (
  <svg viewBox="0 0 80 200" className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-40 opacity-[0.06]" fill="none">
    {[0, 40, 80, 120, 160].map((y) => (
      <g key={y}>
        <path d={`M10 ${y} Q40 ${y + 10}, 70 ${y}`} stroke="hsl(var(--primary))" strokeWidth="2" />
        <path d={`M10 ${y + 20} Q40 ${y + 10}, 70 ${y + 20}`} stroke="hsl(var(--secondary))" strokeWidth="2" />
        <circle cx="10" cy={y} r="3" fill="hsl(var(--primary))" />
        <circle cx="70" cy={y} r="3" fill="hsl(var(--secondary))" />
      </g>
    ))}
  </svg>
);

/* Decorative joint illustration */
const JointGraphic = () => (
  <svg viewBox="0 0 120 120" className="w-24 h-24 opacity-[0.08]" fill="none">
    <circle cx="60" cy="40" r="25" stroke="hsl(var(--primary))" strokeWidth="3" />
    <circle cx="60" cy="80" r="25" stroke="hsl(var(--primary))" strokeWidth="3" />
    <ellipse cx="60" cy="60" rx="15" ry="8" fill="hsl(var(--primary))" opacity="0.3" />
  </svg>
);


const AboutSection = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="resources" className="py-14 lg:py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0">
          <DNAGraphic />
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-7xl relative">
        {/* Header with graphic */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3.5 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              About Our Mission
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 text-foreground leading-[1.08]">
              Transforming arthritis care for{" "}
              <span className="text-primary">everyone</span>
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-1 rounded-full bg-primary" />
              <div className="w-6 h-1 rounded-full bg-secondary" />
              <div className="w-3 h-1 rounded-full bg-primary/40" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-border/20">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm mb-1">Did you know?</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Arthritis isn't a single condition — it's a complex family of over <strong className="text-foreground">100 distinct types</strong>, each demanding its own approach.
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We unite patients, clinicians, researchers and community advocates — supporting 
                over <strong className="text-primary">30 million people</strong> globally through evidence-based care, 
                cutting-edge technology and unwavering compassion.
              </p>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/20">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">HCPC Registered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">CSP Accredited</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Statistics removed per user request */}

        {/* Quote with colorful accent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary/8 via-background to-secondary/8 rounded-2xl p-8 sm:p-12 relative border border-border/15 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
          <div className="relative text-center max-w-2xl mx-auto">
            <div className="text-5xl text-primary/20 font-serif mb-2">"</div>
            <blockquote className="text-lg sm:text-xl font-bold leading-[1.5] text-foreground -mt-6">
              You are never alone in your arthritis journey. Your healthcare team guides you, but you hold the power to shape your path forward.
            </blockquote>
            <cite className="text-xs text-muted-foreground not-italic font-semibold mt-4 block">— Living With Arthritis Clinical Advisory Board</cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;
