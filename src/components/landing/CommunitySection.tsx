import { memo } from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, Heart, TrendingUp } from "lucide-react";

const highlights = [
  { icon: Users, value: "12,000+", label: "Community Members" },
  { icon: MessageSquare, value: "5,400+", label: "Conversations" },
  { icon: Heart, value: "98%", label: "Satisfaction Rate" },
  { icon: TrendingUp, value: "85%", label: "Report Improvement" },
];

const CommunitySection = memo(() => (
  <section className="py-24 lg:py-32 bg-background section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-6xl">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-label text-primary mb-4 block">Community</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-5">
            You're never <span className="text-primary italic">alone</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Join thousands of people across the UK who share tips, encouragement, and understanding. Our community is a safe space to connect with others on the same journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-5">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-card rounded-3xl border border-border/20 p-6 text-center card-hover">
                <Icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <div className="text-2xl font-display font-bold text-foreground">{h.value}</div>
                <p className="text-xs text-muted-foreground/60 mt-1">{h.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
));

CommunitySection.displayName = "CommunitySection";
export default CommunitySection;
