import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const benefits = [
  { icon: Shield, text: "NHS-aligned & clinically reviewed" },
  { icon: Clock, text: "No waiting lists, instant access" },
  { icon: Users, text: "Join 15,000+ people we've helped" },
];

const FinalCTASection = memo(() => {
  const navigate = useNavigate();
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-foreground via-foreground to-primary/20 relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      {/* Decorative orbs */}
      <div className="absolute top-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full bg-primary/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />

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
            className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center mx-auto mb-10 backdrop-blur-sm border border-primary/10"
          >
            <Heart className="w-8 h-8 text-primary" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-background mb-7 leading-[1.08] text-balance">
            Your journey to a better life with arthritis{" "}
            <span className="text-primary">starts right now</span>
          </h2>
          <p className="text-background/60 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Expert-backed, clinically reviewed, and completely free. No referral needed, no waiting list, no cost — ever.
          </p>

          {/* Benefit pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/[0.06] border border-background/[0.08] text-background/70 text-xs font-medium">
                  <Icon className="w-3.5 h-3.5" />
                  {b.text}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/chat")} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-10 h-[56px] text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full px-10 h-[56px] text-base border-2 border-background/20 text-background hover:bg-background/10 hover:border-background/40 transition-all duration-300 hover:-translate-y-1">
              Explore Services
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

FinalCTASection.displayName = "FinalCTASection";
export default FinalCTASection;