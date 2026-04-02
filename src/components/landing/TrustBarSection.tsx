import { memo } from "react";
import { motion } from "framer-motion";
import { Shield, Award, CheckCircle, BadgeCheck, Stethoscope } from "lucide-react";

const badges = [
  { icon: Shield, label: "NHS-Aligned Care", color: "text-primary bg-primary/10" },
  { icon: Award, label: "HCPC Registered", color: "text-primary bg-primary/10" },
  { icon: CheckCircle, label: "CSP Accredited", color: "text-primary bg-primary/10" },
  { icon: BadgeCheck, label: "Evidence-Based", color: "text-primary bg-primary/10" },
  { icon: Stethoscope, label: "NICE Guidelines", color: "text-primary bg-primary/10" },
];

const TrustBarSection = memo(() => (
  <section className="py-8 bg-accent/50 border-y border-border/20">
    <div className="container mx-auto px-6 md:px-10">
      <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
        {badges.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-background rounded-xl border border-border/40 hover:border-primary/20 hover:shadow-sm transition-all duration-200 group"
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${b.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-foreground/80 font-semibold text-sm">{b.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
));

TrustBarSection.displayName = "TrustBarSection";
export default TrustBarSection;
