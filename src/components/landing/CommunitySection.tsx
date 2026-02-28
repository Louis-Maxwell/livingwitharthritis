import { memo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Heart, TrendingUp } from "lucide-react";

const highlights = [
  { icon: Users, value: "12,000+", label: "Community Members", color: "bg-primary/8 text-primary" },
  { icon: MessageSquare, value: "5,400+", label: "Conversations", color: "bg-secondary/10 text-secondary" },
  { icon: Heart, value: "98%", label: "Satisfaction Rate", color: "bg-gold/10 text-gold-foreground" },
  { icon: TrendingUp, value: "85%", label: "Report Improvement", color: "bg-primary/8 text-primary" },
];

const CommunitySection = memo(() => {
  const navigate = useNavigate();
  return (
  <section className="py-14 lg:py-20 bg-background section-divider relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/[0.02] blur-3xl pointer-events-none" />

    <div className="container mx-auto px-6 md:px-10 max-w-6xl relative">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-label text-primary mb-4 block">Community</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-5">
            You're never <span className="text-primary italic">alone</span>
          </h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-gold to-amber rounded-full mb-6" />
          <p className="text-muted-foreground leading-[1.8] mb-4">
            Join thousands of people across the UK who share tips, encouragement, and understanding. Our community is a safe space to connect with others on the same journey.
          </p>
          <p className="text-sm text-muted-foreground/50 leading-relaxed mb-6">
            Whether you're newly diagnosed or have lived with arthritis for years, there's a place for you here.
          </p>
          <Button
            onClick={() => navigate("/chat")}
            className="rounded-full h-11 px-6 btn-primary-cta text-xs font-bold tracking-wide"
          >
            Join the Conversation
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 gap-5">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-card rounded-3xl border border-border/20 p-7 text-center card-hover group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.015] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className={`w-11 h-11 rounded-2xl ${h.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-1">{h.value}</div>
                <p className="text-[11px] text-muted-foreground/50 font-medium tracking-wider uppercase">{h.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
  );
});

CommunitySection.displayName = "CommunitySection";
export default CommunitySection;
