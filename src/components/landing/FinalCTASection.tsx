import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalCTASection = memo(() => {
  const navigate = useNavigate();
  return (
    <section className="py-14 lg:py-20 bg-primary relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="w-16 h-16 rounded-full bg-primary-foreground/15 flex items-center justify-center mx-auto mb-8"
          >
            <Heart className="w-7 h-7 text-primary-foreground" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-foreground mb-6 leading-tight">
            Your journey to a better life with arthritis{" "}
            <span className="text-secondary">starts today</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Free, expert-backed resources — no referral, no waiting list, no cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/chat")} className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 h-14 text-base font-bold shadow-lg">
              Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full px-8 h-14 text-base border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50">
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
