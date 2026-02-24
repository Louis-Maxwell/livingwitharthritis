import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, ArrowDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const HeroSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const orbX = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background">
      {/* Orbs with more presence */}
      <motion.div
        className="gradient-orb w-[900px] h-[900px] bg-primary top-[-350px] right-[-350px]"
        style={{ x: orbX, y: orbY, scale: orbScale }}
      />
      <motion.div
        className="gradient-orb w-[700px] h-[700px] bg-secondary bottom-[-250px] left-[-250px]"
        style={{
          x: useTransform(scrollYProgress, [0, 1], [0, -40]),
          y: useTransform(scrollYProgress, [0, 1], [0, 30]),
        }}
      />
      {/* Subtle gold accent orb */}
      <motion.div
        className="gradient-orb w-[400px] h-[400px] bg-gold top-[20%] left-[60%]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -60]) }}
      />

      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)] py-16 lg:py-0">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{ y: contentY }}
            className="max-w-2xl text-center"
          >
            {/* Trust badge */}
            <motion.div variants={fadeUp} className="mb-7">
              <span className="inline-flex items-center gap-2 bg-accent/80 backdrop-blur-sm border border-border/40 text-primary px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                <Heart className="w-3 h-3 fill-primary text-primary" />
                Supporting 10 Million People
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-display font-bold text-foreground mb-8 leading-[1.04]"
            >
              Living well with{" "}
              <span className="text-primary italic relative">
                arthritis
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-gold/40" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0 8 Q50 0 100 6 T200 4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>{" "}
              starts here
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-muted-foreground leading-[1.85] mb-11 max-w-md mx-auto"
            >
              Expert guidance, compassionate care, and a community that
              understands. We're with you every step of your journey.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/chat")}
                className="btn-primary-cta px-8 h-13 rounded-full text-sm font-bold tracking-wider"
              >
                <MessageCircle className="w-4 h-4 mr-2.5" />
                Talk to AI Assistant
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="border border-border/60 text-foreground hover:bg-accent hover:border-primary/20 px-8 h-13 rounded-full text-sm font-medium transition-all duration-300"
              >
                Explore Services
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-16 flex items-center justify-center gap-2 text-muted-foreground/30"
            >
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span className="text-xs tracking-wider uppercase">Scroll to explore</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
