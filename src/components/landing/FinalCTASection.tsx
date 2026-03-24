import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Clock, Users, Award, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const benefits = [
  { icon: Shield, text: "NHS-aligned & clinically reviewed" },
  { icon: Clock, text: "No waiting lists, instant access" },
  { icon: Users, text: "Join 50,000+ people we've supported" },
  { icon: Award, text: "HCPC & CSP registered team" },
  { icon: Globe, text: "Available across all UK nations" },
];

const FinalCTASection = memo(() => {
  const navigate = useNavigate();
  return (
    <section className="py-28 lg:py-36 bg-primary relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
      
      {/* Soft glow */}
      <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-secondary/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] rounded-full bg-gold/10 blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="w-20 h-20 rounded-3xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-12 border border-primary-foreground/[0.06]"
          >
            <Heart className="w-8 h-8 text-primary-foreground" />
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-primary-foreground mb-8 leading-[1.06] text-balance tracking-tight">
            Your journey to a better life with arthritis{" "}
            <span className="text-primary-foreground/90 italic font-extrabold">starts right now</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg sm:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            World-class, evidence-based arthritis care — completely free. No referral needed, no waiting list, 
            no cost. Trusted by over 50,000 people across the United Kingdom.
          </p>

          {/* Benefit pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-foreground/[0.08] border border-primary-foreground/[0.1] text-primary-foreground/80 text-xs font-medium hover:bg-primary-foreground/[0.14] transition-colors duration-300">
                  <Icon className="w-3.5 h-3.5" />
                  {b.text}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/chat")} className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-12 h-[58px] text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full px-12 h-[58px] text-base border-2 border-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/8 hover:border-primary-foreground/30 transition-all duration-300 hover:-translate-y-1">
              Explore Services
            </Button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-10 text-primary-foreground/50 text-xs tracking-wider"
          >
            Rated 4.9/5 by 2,400+ patients · Resources accessed in 42 countries
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
});

FinalCTASection.displayName = "FinalCTASection";
export default FinalCTASection;