import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalCTASection = memo(() => {
  const navigate = useNavigate();
  return (
    <section className="py-14 lg:py-20 bg-primary relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      {/* Decorative orbs */}
      <div className="absolute top-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-primary-foreground/5 blur-[100px] pointer-events-none" />

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
            className="w-20 h-20 rounded-3xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-10 backdrop-blur-sm border border-primary-foreground/[0.08]"
          >
            <Heart className="w-8 h-8 text-primary-foreground" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-foreground mb-7 leading-[1.08] text-balance">
            Your journey to a better life with arthritis{" "}
            <span className="text-primary-foreground/80">starts right now</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-12 max-w-md mx-auto leading-relaxed">
            Expert-backed, clinically reviewed, and completely free. No referral needed, no waiting list, no cost — ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/chat")} className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-10 h-[56px] text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full px-10 h-[56px] text-base border-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/40 transition-all duration-300 hover:-translate-y-1">
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