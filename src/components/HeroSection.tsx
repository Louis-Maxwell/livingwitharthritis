import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { ArrowDown, MessageCircle, BookOpen, Heart, Shield, Award, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("section:nth-of-type(2)");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  const impactStats = [
    { number: "10M+", label: "People Supported" },
    { number: "100+", label: "Conditions Covered" },
    { number: "24/7", label: "Support Available" },
    { number: "£2.5M", label: "Research Funded" },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-secondary">
      {/* Rich multi-layer gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-secondary/80" />
      <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px]" />

      <div className="absolute inset-0 noise-overlay" />

      <motion.div style={{ opacity }} className="container relative mx-auto px-4 md:px-8 py-24 lg:py-0">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <div className="trust-badge text-white/70">
              <Shield className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs font-medium">Registered Charity</span>
            </div>
            <div className="trust-badge text-white/70">
              <Award className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs font-medium">Award-Winning</span>
            </div>
            <div className="trust-badge text-white/70">
              <Heart className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs font-medium">Since 2024</span>
            </div>
          </motion.div>

          <span className="editorial-caption text-white/50 inline-flex items-center gap-3">
            <span className="w-8 h-px bg-white/30" />
            Physical Health &amp; Wellness
            <span className="w-8 h-px bg-white/30" />
          </span>

          <h1 className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-display font-bold text-white leading-[0.95] tracking-tight text-cinematic">
            We Are{" "}
            <span className="relative inline-block">
              Here
              <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-gold/80 rounded-full" />
            </span>
            <br />
            <span className="font-display italic font-normal text-white/80">
              For You
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl font-light font-editorial">
            Expert guidance, compassionate care, and a community that
            understands — supporting you through every step of your
            arthritis journey.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={scrollToAbout}
              className="btn-gold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 uppercase tracking-wider text-sm"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Explore Resources
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/chat")}
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-bold px-8 py-6 rounded-full shadow-lg transition-all duration-500 hover:-translate-y-1 uppercase tracking-wider text-sm"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Talk to Our Assistant
            </Button>
          </div>

          {/* Helpline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex items-center gap-2 text-white/40"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="text-sm font-light">Free Helpline: <strong className="text-white/60">07760 512 084</strong></span>
          </motion.div>

          {/* Impact counter strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full max-w-3xl"
          >
            {impactStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs text-white/40 mt-1 editorial-caption">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
          <span className="editorial-caption text-white/30">Scroll</span>
          <ArrowDown className="w-4 h-4 text-white/30" />
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
