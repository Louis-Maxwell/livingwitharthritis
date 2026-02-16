import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
const heroImage = "/images/hero-community.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const orbX = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background">
      <motion.div className="gradient-orb w-[800px] h-[800px] bg-primary top-[-300px] right-[-300px]" style={{ x: orbX, y: orbY }} />
      <motion.div className="gradient-orb w-[600px] h-[600px] bg-secondary bottom-[-200px] left-[-200px]" style={{ x: useTransform(scrollYProgress, [0, 1], [0, -40]), y: useTransform(scrollYProgress, [0, 1], [0, 30]) }} />

      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center min-h-[calc(100vh-100px)] py-16 lg:py-0">
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
              className="mb-6"
            >
              <span className="section-label text-primary">Supporting 10 Million People</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold text-foreground mb-7 leading-[1.04]">
              Living well with{" "}
              <span className="text-primary italic">arthritis</span>{" "}
              starts here
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-[1.8] mb-10 max-w-md">
              Expert guidance, compassionate care, and a community that
              understands. We're with you every step of your journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/chat")}
                className="border border-border/80 text-foreground hover:bg-accent hover:border-primary/20 px-8 h-13 rounded-full text-sm font-medium transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 mr-2.5" />
                AI Assistant
              </Button>
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
              <motion.img
                src={heroImage}
                alt="Diverse community of people being active together in a park"
                className="w-full h-[300px] sm:h-[400px] lg:h-[560px] object-cover"
                width={918}
                height={560}
                loading="eager"
                fetchPriority="high"
                style={{ y: imageY, scale: imageScale }}
              />
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