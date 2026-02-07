import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { ArrowDown, MessageCircle, BookOpen } from "lucide-react";
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

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Full-screen video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="absolute inset-0 noise-overlay" />

      <motion.div style={{ opacity }} className="container relative mx-auto px-4 md:px-8 py-24 lg:py-0">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <span className="editorial-caption text-white/50 inline-flex items-center gap-3">
            <span className="w-8 h-px bg-white/30" />
            Physical Health &amp; Wellness
            <span className="w-8 h-px bg-white/30" />
          </span>

          <h1 className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-display font-bold text-white leading-[0.95] tracking-tight text-cinematic">
            We Are{" "}
            <span className="relative inline-block">
              Here
              <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-primary/60 rounded-full" />
            </span>
            <br />
            <span className="font-display italic font-normal text-white/80">
              For You
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl font-light">
            Expert guidance, compassionate care, and a community that
            understands — supporting you through every step of your
            arthritis journey.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={scrollToAbout}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 uppercase tracking-wider text-sm"
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
