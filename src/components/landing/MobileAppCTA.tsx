import { memo } from "react";
import { motion } from "framer-motion";
import { Smartphone, Bell, BarChart3 } from "lucide-react";

const features = [
  { icon: Bell, text: "Daily exercise reminders" },
  { icon: BarChart3, text: "Track your pain & progress" },
  { icon: Smartphone, text: "Access everything offline" },
];

const MobileAppCTA = memo(() => (
  <section className="py-24 lg:py-32 bg-accent/30 section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-6xl">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-label text-primary mb-4 block">Coming Soon</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-5">
            Take us with you — <span className="text-primary italic">anywhere</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Our mobile app is in development, bringing all the tools you love right to your pocket.
          </p>
          <div className="space-y-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/6 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground font-medium">{f.text}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="flex justify-center">
          <div className="w-64 h-[500px] bg-navy/5 rounded-[3rem] border-4 border-border/20 relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-0 inset-x-0 h-8 bg-navy/5 rounded-b-3xl flex justify-center">
              <div className="w-20 h-5 bg-navy/10 rounded-b-xl" />
            </div>
            <Smartphone className="w-12 h-12 text-muted-foreground/20" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
));

MobileAppCTA.displayName = "MobileAppCTA";
export default MobileAppCTA;
