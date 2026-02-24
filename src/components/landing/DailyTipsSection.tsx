import { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Lightbulb, Droplets, Sun, Moon, Footprints, Apple } from "lucide-react";

const tips = [
  { icon: Sun, title: "Morning Stretches", desc: "Start each day with 5 minutes of gentle stretching to ease morning stiffness." },
  { icon: Droplets, title: "Stay Hydrated", desc: "Aim for 6-8 glasses of water daily — dehydration can worsen joint stiffness." },
  { icon: Apple, title: "Anti-inflammatory Snacks", desc: "Keep walnuts, berries, and dark leafy greens handy for quick, joint-friendly snacking." },
  { icon: Footprints, title: "Walk 20 Minutes", desc: "A daily walk improves joint mobility, mood, and cardiovascular health." },
  { icon: Moon, title: "Prioritise Sleep", desc: "Quality sleep reduces inflammation — aim for 7-9 hours with a consistent schedule." },
  { icon: Lightbulb, title: "Pace Yourself", desc: "Balance activity with rest. Break tasks into smaller chunks to protect your joints." },
];

const DailyTipsSection = memo(() => (
  <section className="py-24 lg:py-32 bg-accent/30 section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="section-label text-primary mb-4 block">Daily Living</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-5">
          Tips for every <span className="text-primary italic">day</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Card className="p-6 rounded-3xl border-border/20 card-hover group flex gap-5">
                <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{tip.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
));

DailyTipsSection.displayName = "DailyTipsSection";
export default DailyTipsSection;
