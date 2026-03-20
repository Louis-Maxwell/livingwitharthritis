import { memo } from "react";
import { motion } from "framer-motion";
import { Download, Users, BookOpen, MessageCircle, Heart, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  { icon: Download, value: "9", label: "Free PDF guides available", detail: "Exercise, diet & tracking resources", color: "text-amber-600 bg-amber-500/8" },
  { icon: BookOpen, value: "40+", label: "Evidence-based blog articles", detail: "Covering exercise, nutrition & lifestyle", color: "text-sky-600 bg-sky-500/8" },
  { icon: MessageCircle, value: "24/7", label: "AI health assistant access", detail: "Personalised guidance anytime", color: "text-violet-600 bg-violet-500/8" },
  { icon: Users, value: "10M+", label: "People with arthritis in the UK", detail: "We're here for all of them", color: "text-primary bg-primary/8" },
  { icon: TrendingUp, value: "78%", label: "Report less pain with exercise", detail: "When following structured programmes", color: "text-emerald-600 bg-emerald-500/8" },
  { icon: Heart, value: "88p", label: "Of every £1 supports patients", detail: "Low admin costs, high impact", color: "text-rose-600 bg-rose-500/8" },
];

const ImpactMetricsSection = memo(() => (
  <section className="py-20 lg:py-28 bg-tint-mint" aria-labelledby="impact-heading">
    <div className="container mx-auto px-6 md:px-10 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="section-label text-primary mb-5 block">How Your Support Helps</span>
        <h2 id="impact-heading" className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
          Real Impact, <span className="text-primary italic">Real Numbers</span>
        </h2>
        <p className="text-muted-foreground mt-5 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          Every resource, guide and programme is funded by your generosity. Here's what we've built together.
        </p>
        <div className="luxury-divider mt-8">
          <div className="w-2 h-2 rounded-full bg-primary/30" />
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Card className="h-full border border-border/30 hover:border-primary/15 transition-all duration-400 hover:shadow-large hover:-translate-y-1 group rounded-2xl">
                <CardContent className="p-7 flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl ${m.color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-3xl font-display font-bold text-foreground tracking-tight">{m.value}</p>
                    <p className="text-sm font-semibold text-foreground mt-1">{m.label}</p>
                    <p className="text-xs text-muted-foreground mt-1.5">{m.detail}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
));

ImpactMetricsSection.displayName = "ImpactMetricsSection";
export default ImpactMetricsSection;
