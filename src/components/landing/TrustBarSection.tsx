import { memo } from "react";
import { motion } from "framer-motion";
import { Shield, Award, CheckCircle, BadgeCheck } from "lucide-react";

const badges = [
  { icon: Shield, label: "NHS-Aligned Care" },
  { icon: Award, label: "HCPC Registered" },
  { icon: CheckCircle, label: "CSP Accredited" },
  { icon: BadgeCheck, label: "Evidence-Based" },
];

const TrustBarSection = memo(() => (
  <section className="py-8 bg-accent/50 border-y border-border/20">
    <div className="container mx-auto px-6 md:px-10">
      <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-8">
        {badges.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg border border-border/40 hover:border-primary/20 transition-all duration-200 group"
            >
              <Icon className="w-4 h-4 text-primary" />
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
