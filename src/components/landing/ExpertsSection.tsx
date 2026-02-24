import { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";

const experts = [
  { name: "Dr. Sarah Mitchell", role: "Rheumatology Consultant", specialty: "Autoimmune Arthritis" },
  { name: "James Clarke, MSc", role: "Senior Physiotherapist", specialty: "Joint Rehabilitation" },
  { name: "Dr. Amara Obi", role: "Nutritional Scientist", specialty: "Anti-inflammatory Diets" },
  { name: "Louise Patel, BSc", role: "Occupational Therapist", specialty: "Daily Living Support" },
];

const ExpertsSection = memo(() => (
  <section className="py-24 lg:py-32 bg-accent/20 section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="section-label text-primary mb-4 block">Our Team</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-5">
          Led by <span className="text-primary italic">experts</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">Our multidisciplinary team brings decades of clinical experience.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {experts.map((e, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <Card className="p-7 rounded-3xl border-border/20 text-center card-hover group">
              <div className="w-16 h-16 rounded-full bg-primary/6 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/10 transition-colors">
                <Stethoscope className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">{e.name}</h3>
              <p className="text-xs text-primary font-medium mb-2">{e.role}</p>
              <p className="text-xs text-muted-foreground/60">{e.specialty}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

ExpertsSection.displayName = "ExpertsSection";
export default ExpertsSection;
