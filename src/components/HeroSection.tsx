import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, CalendarCheck, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { AppointmentModal } from "@/components/AppointmentModal";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Disable parallax on mobile to prevent layout gaps and jank
  const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "12%"]);
  const orbX = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 60]);
  const orbY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -40]);

  // Pre-compute second orb transforms (hooks can't be called inline conditionally)
  const orb2X = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -40]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 30]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background pb-0">
      <motion.div className="gradient-orb w-[800px] h-[800px] bg-primary top-[-300px] right-[-300px]" style={{ x: orbX, y: orbY }} />
      <motion.div className="gradient-orb w-[600px] h-[600px] bg-secondary bottom-[-200px] left-[-200px]" style={{ x: orb2X, y: orb2Y }} />

      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center lg:min-h-[calc(100vh-100px)] py-12 sm:py-16 lg:py-0">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: contentY }}
            className="order-2 lg:order-1 max-w-xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="section-label text-primary">Free NHS-Friendly Support · UK Charity</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold text-foreground mb-5 leading-[1.04]">
              Expert arthritis{" "}
              <span className="text-primary italic">care</span>{" "}
              for every UK patient
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-[1.8] mb-4 max-w-md">
              Join over 10 million people in the UK managing arthritis with confidence. Get personalised physiotherapy, nutrition guidance, and ongoing support — all in one place.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-4 mb-8 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-primary" /> NHS-aligned care</span>
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-primary" /> 10M+ UK patients</span>
              <span className="flex items-center gap-1.5"><CalendarCheck className="w-3.5 h-3.5 text-primary" /> Free consultation</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <AppointmentModal
                trigger={
                  <Button
                    size="lg"
                    className="btn-primary-cta px-8 h-13 rounded-full text-sm font-bold tracking-wide shadow-large hover:shadow-xl transition-all duration-300"
                  >
                    <CalendarCheck className="w-4 h-4 mr-2.5" />
                    Book Free Consultation
                  </Button>
                }
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-16 hidden lg:flex items-center gap-2 text-muted-foreground/40"
            >
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span className="text-xs tracking-wider uppercase">Scroll to explore</span>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-large">
            <motion.div style={{ y: imageY, scale: imageScale }} className="block w-full h-[300px] sm:h-[400px] lg:h-[560px]">
                <picture>
                  {/* WebP — modern browsers */}
                  <source
                    type="image/webp"
                    srcSet="/images/hero-community.webp 1280w"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                  {/* JPEG fallback */}
                  <img
                    src="/images/hero-community.jpg"
                    srcSet="/images/hero-community.jpg 918w"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                    alt="British community of people being active together in a UK park — walking, cycling and stretching"
                    className="w-full h-full object-cover"
                    width={1280}
                    height={720}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-primary/5 -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl bg-secondary/5 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;