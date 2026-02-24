import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, ArrowDown, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const HeroSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const orbX = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.18]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background">
      {/* Layered orbs for depth */}
      <motion.div
        className="gradient-orb glow-pulse w-[1000px] h-[1000px] bg-primary top-[-400px] right-[-400px]"
        style={{ x: orbX, y: orbY, scale: orbScale }}
      />
      <motion.div
        className="gradient-orb glow-pulse w-[800px] h-[800px] bg-secondary bottom-[-300px] left-[-300px]"
        style={{
          x: useTransform(scrollYProgress, [0, 1], [0, -40]),
          y: useTransform(scrollYProgress, [0, 1], [0, 30]),
        }}
      />
      <motion.div
        className="gradient-orb w-[500px] h-[500px] bg-gold top-[15%] left-[55%]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -60]) }}
      />
      {/* Subtle dot grid texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)] py-20 lg:py-0">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{ y: contentY }}
            className="max-w-[680px] text-center"
          >
            {/* Premium trust badge */}
            <motion.div variants={fadeUp} className="mb-8">
              <span className="inline-flex items-center gap-2.5 bg-card/80 backdrop-blur-xl border border-border/40 text-primary px-5 py-2.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase shadow-soft">
                <Heart className="w-3 h-3 fill-primary text-primary" />
                Supporting 10 Million People
                <Sparkles className="w-3 h-3 text-gold" />
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[5rem] font-display font-bold text-foreground mb-8 leading-[1.02] tracking-tight"
            >
              Living well with{" "}
              <span className="text-primary italic relative inline-block">
                arthritis
                <svg className="absolute -bottom-2.5 left-0 w-full h-3 text-gold/50" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0 8 Q50 0 100 6 T200 4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>{" "}
              <br className="hidden sm:block" />
              starts here
            </motion.h1>

            {/* Luxury divider */}
            <motion.div variants={fadeUp} className="luxury-divider mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-muted-foreground leading-[1.9] mb-12 max-w-[480px] mx-auto"
            >
              Expert guidance, compassionate care, and a community that
              understands. We're with you every step of your journey.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/chat")}
                className="btn-primary-cta px-9 h-14 rounded-full text-sm font-bold tracking-wider"
              >
                <MessageCircle className="w-4 h-4 mr-2.5" />
                Talk to AI Assistant
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="border border-border/60 text-foreground hover:bg-accent hover:border-primary/20 px-9 h-14 rounded-full text-sm font-medium transition-all duration-400 hover:shadow-medium"
              >
                Explore Services
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-20 flex items-center justify-center gap-2.5 text-muted-foreground/25"
            >
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span className="text-[10px] tracking-[0.25em] uppercase font-medium">Scroll to explore</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
