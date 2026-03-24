import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const benefits = [
  "NHS-aligned & clinically reviewed",
  "No waiting lists — instant access",
  "50,000+ people supported",
  "HCPC & CSP registered team",
  "Available across all UK nations",
];

const FinalCTASection = memo(() => {
  const navigate = useNavigate();
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border/40" />

      <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6 text-primary" />
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
            Start your journey to{" "}
            <span className="text-primary">better living</span>
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Evidence-based arthritis care, completely free. No referral needed, 
            no waiting list. Trusted by thousands across the UK.
          </p>

          {/* Benefits as a clean checklist */}
          <div className="flex flex-col items-center gap-2.5 text-sm text-foreground/80">
            {benefits.map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              onClick={() => navigate("/chat")}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-10 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full px-10 h-14 text-base border border-border text-foreground hover:bg-muted transition-all duration-300"
            >
              Explore Services
            </Button>
          </div>

          {/* Social proof */}
          <p className="text-muted-foreground text-xs tracking-wide pt-2">
            Rated 4.9/5 by 2,400+ patients · Used in 42 countries
          </p>
        </motion.div>
      </div>
    </section>
  );
});

FinalCTASection.displayName = "FinalCTASection";
export default FinalCTASection;