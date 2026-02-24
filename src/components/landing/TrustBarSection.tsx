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
  <section className="py-12 bg-background border-y border-border/30">
    <div className="container mx-auto px-6 md:px-10">
      <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
        {badges.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="trust-badge">
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-foreground/70 font-medium">{b.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
));

TrustBarSection.displayName = "TrustBarSection";
export default TrustBarSection;
