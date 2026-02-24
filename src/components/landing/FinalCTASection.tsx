import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalCTASection = memo(() => {
  const navigate = useNavigate();
  return (
    <section className="py-28 lg:py-36 bg-background section-divider">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Heart className="w-10 h-10 text-primary mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
            Your journey to a better life with arthritis <span className="text-primary italic">starts today</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            Free, expert-backed resources — no referral, no waiting list, no cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/chat")} className="rounded-full btn-primary-cta px-8 h-13 text-base">
              Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full px-8 h-13 text-base border-border/50">
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
