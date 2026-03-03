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
  <section className="py-14 lg:py-20 section-rose section-divider section-texture">
    <div className="container mx-auto px-6 md:px-10 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
        <span className="section-label text-primary mb-4 block">Daily Living</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
          Tips for every <span className="text-primary italic">day</span>
        </h2>
        <div className="luxury-divider mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
        </div>
        <Link
          to="/daily-tips/overview"
          className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors"
        >
          Learn more about daily living for joint health →
        </Link>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {dailyTips.map((tip, i) => {
          const Icon = iconMap[tip.icon];
          return (
            <motion.div key={tip.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.6 }}>
              <Link to={`/daily-tips/${tip.slug}`}>
                <Card className="premium-card group">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="p-6 flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors duration-500">
                      {Icon && <Icon className="w-5 h-5 text-gold" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">{tip.title}</h3>
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
