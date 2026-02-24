import { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Lightbulb, Droplets, Sun, Moon, Footprints, Apple } from "lucide-react";
import { Link } from "react-router-dom";
import { dailyTips } from "@/data/dailyTips";

const iconMap: Record<string, React.ElementType> = {
  Sun, Droplets, Apple, Footprints, Moon, Lightbulb,
};

const DailyTipsSection = memo(() => (
  <section className="py-24 lg:py-32 bg-accent/30 section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="section-label text-primary mb-4 block">Daily Living</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-5">
          Tips for every <span className="text-primary italic">day</span>
        </h2>
        <Link
          to="/daily-tips/overview"
          className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors"
        >
          Learn more about daily living for joint health →
        </Link>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dailyTips.map((tip, i) => {
          const Icon = iconMap[tip.icon];
          return (
            <motion.div key={tip.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link to={`/daily-tips/${tip.slug}`}>
                <Card className="rounded-3xl border-border/20 card-hover group overflow-hidden">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="p-5 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                      {Icon && <Icon className="w-5 h-5 text-gold" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{tip.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
));

DailyTipsSection.displayName = "DailyTipsSection";
export default DailyTipsSection;
