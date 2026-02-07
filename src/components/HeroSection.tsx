import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, ArrowDown } from "lucide-react";
import { useRef } from "react";
const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax background layers */}
      <motion.div style={{
      y: bgY
    }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent/95 to-primary/80" />
        
        {/* Editorial geometric accents */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 0.06,
          scale: 1
        }} transition={{
          duration: 2,
          delay: 0.5
        }} className="absolute -top-1/4 -right-1/4 w-[900px] h-[900px] rounded-full border border-white/10" />
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 0.04
        }} transition={{
          duration: 3,
          delay: 1
        }} className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary rounded-full blur-[120px]" />
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 0.06
        }} transition={{
          duration: 3,
          delay: 1.5
        }} className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-secondary rounded-full blur-[100px]" />
        </div>
      </motion.div>

      {/* Subtle noise texture */}
      <div className="absolute inset-0 noise-overlay" />

      <motion.div style={{
      y: textY,
      opacity
    }} className="container relative mx-auto px-4 md:px-8 py-24 lg:py-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[80vh]">
          {/* Left column — Editorial typography */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Editorial kicker */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7
          }}>
              <span className="editorial-caption text-white/50 inline-flex items-center gap-3">
                
                Trusted by 10 Million+ People Worldwide
                <span className="w-8 h-px bg-white/30" />
              </span>
            </motion.div>

            {/* Main headline — dramatic serif */}
            <motion.h1 initial={{
            opacity: 0,
            y: 40
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 1,
            delay: 0.15,
            ease: [0.25, 0.46, 0.45, 0.94]
          }} className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-display font-bold text-white leading-[0.95] tracking-tight text-cinematic">
              We Are{" "}
              <span className="relative inline-block">
                Here
                <motion.span initial={{
                scaleX: 0
              }} animate={{
                scaleX: 1
              }} transition={{
                duration: 1,
                delay: 1.2,
                ease: "easeOut"
              }} className="absolute -bottom-2 left-0 w-full h-1.5 bg-primary/60 rounded-full origin-left" />
              </span>
              <br />
              <span className="font-display italic font-normal text-white/80">
                For You
              </span>
            </motion.h1>

            {/* Subhead — editorial sans */}
            <motion.p initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.3
          }} className="text-lg md:text-xl text-white/65 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
              Expert guidance, compassionate care, and a community that 
              understands — supporting you through every step of your 
              arthritis journey.
            </motion.p>

            {/* CTA group */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.45
          }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Button size="lg" className="group bg-white text-accent hover:bg-white/90 font-bold px-10 py-7 text-base rounded-full shadow-large transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.35)] hover:-translate-y-1 uppercase tracking-wider">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Button>
              <Button size="lg" variant="outline" className="group border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/40 font-semibold px-10 py-7 text-base rounded-full transition-all duration-500">
                <Play className="mr-2 w-4 h-4" />
                Watch Our Story
              </Button>
            </motion.div>
          </div>

          {/* Right column — Editorial stat card */}
          <motion.div initial={{
          opacity: 0,
          x: 60
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 1.2,
          delay: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }} className="lg:col-span-5 hidden lg:flex justify-end">
            <div className="relative w-full max-w-md">
              {/* Main editorial card */}
              <motion.div animate={{
              y: [0, -10, 0]
            }} transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }} className="relative z-10 bg-white/[0.07] backdrop-blur-2xl rounded-3xl p-10 border border-white/[0.12] shadow-2xl">
                <div className="space-y-8">
                  {/* Card header */}
                  <div className="flex items-center justify-between">
                    <span className="editorial-caption text-white/40">Impact Report</span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  </div>

                  {/* Large stat */}
                  <div>
                    <p className="text-7xl font-display font-bold text-white leading-none">10M+</p>
                    <p className="text-sm text-white/50 mt-2 font-medium">People helped globally</p>
                  </div>

                  <div className="h-px bg-white/10" />

                  {/* Stat grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-3xl font-display font-bold text-white">98%</p>
                      <p className="text-xs text-white/40 mt-1 font-medium">Satisfaction</p>
                    </div>
                    <div>
                      <p className="text-3xl font-display font-bold text-white">24/7</p>
                      <p className="text-xs text-white/40 mt-1 font-medium">Support Access</p>
                    </div>
                    <div>
                      <p className="text-3xl font-display font-bold text-white">100+</p>
                      <p className="text-xs text-white/40 mt-1 font-medium">Resources</p>
                    </div>
                    <div>
                      <p className="text-3xl font-display font-bold text-white">4.9</p>
                      <p className="text-xs text-white/40 mt-1 font-medium">User Rating</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating accent card */}
              <motion.div animate={{
              y: [0, 8, 0],
              rotate: [0, 1, 0]
            }} transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }} className="absolute -bottom-6 -left-6 bg-primary/20 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/10">
                <p className="text-sm text-white/90 font-medium">Always here to help ✨</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 1,
        delay: 1.5
      }} className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
          <span className="editorial-caption text-white/30">Scroll</span>
          <motion.div animate={{
          y: [0, 8, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}>
            <ArrowDown className="w-4 h-4 text-white/30" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>;
};
export default HeroSection;