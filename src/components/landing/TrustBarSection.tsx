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
  <section className="py-10 bg-background border-y border-border/20">
    <div className="container mx-auto px-6 md:px-10">
      <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-10">
        {badges.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-accent/60 backdrop-blur-sm rounded-full border border-border/30 hover:border-primary/20 hover:bg-accent transition-all duration-300 group"
            >
              <Icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="text-foreground/70 font-medium text-sm group-hover:text-foreground transition-colors duration-300">{b.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
));

TrustBarSection.displayName = "TrustBarSection";
export default TrustBarSection;
