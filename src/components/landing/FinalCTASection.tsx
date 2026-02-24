import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalCTASection = memo(() => {
  const navigate = useNavigate();
  return (
    <section className="py-28 lg:py-36 bg-background section-divider relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-3xl pointer-events-none" />

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
            className="w-16 h-16 rounded-full bg-primary/8 flex items-center justify-center mx-auto mb-8"
          >
            <Heart className="w-7 h-7 text-primary" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
            Your journey to a better life with arthritis{" "}
            <span className="text-primary italic relative">
              starts today
              <svg className="absolute -bottom-1 left-0 w-full h-2 text-gold/30" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0 6 Q50 0 100 4 T200 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="text-muted-foreground text-lg mb-11 max-w-md mx-auto leading-relaxed">
            Free, expert-backed resources — no referral, no waiting list, no cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/chat")} className="rounded-full btn-primary-cta px-8 h-13 text-base font-bold">
              Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full px-8 h-13 text-base border-border/40 hover:border-primary/20">
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
