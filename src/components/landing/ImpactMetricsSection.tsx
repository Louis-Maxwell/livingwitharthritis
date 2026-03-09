import { memo } from "react";
import { motion } from "framer-motion";
import { Download, Users, BookOpen, MessageCircle, Heart, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  { icon: Download, value: "9", label: "Free PDF guides available", detail: "Exercise, diet & tracking resources", color: "text-amber-600 bg-amber-500/10" },
  { icon: BookOpen, value: "40+", label: "Evidence-based blog articles", detail: "Covering exercise, nutrition & lifestyle", color: "text-sky-600 bg-sky-500/10" },
  { icon: MessageCircle, value: "24/7", label: "AI health assistant access", detail: "Personalised guidance anytime", color: "text-violet-600 bg-violet-500/10" },
  { icon: Users, value: "10M+", label: "People with arthritis in the UK", detail: "We're here for all of them", color: "text-primary bg-primary/10" },
  { icon: TrendingUp, value: "78%", label: "Report less pain with exercise", detail: "When following structured programmes", color: "text-emerald-600 bg-emerald-500/10" },
  { icon: Heart, value: "88p", label: "Of every £1 supports patients", detail: "Low admin costs, high impact", color: "text-rose-600 bg-rose-500/10" },
];

const ImpactMetricsSection = memo(() => (
  <section className="py-16 lg:py-20 bg-tint-mint" aria-labelledby="impact-heading">
    <div className="container mx-auto px-6 md:px-10 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <span className="section-label text-primary mb-4 block">How Your Support Helps</span>
        <h2 id="impact-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
          Real Impact, <span className="text-primary">Real Numbers</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm leading-relaxed">
          Every resource, guide and programme is funded by your generosity. Here's what we've built together.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div key={m.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Card className="h-full border border-border/40 hover:border-primary/20 transition-all hover:shadow-md">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${m.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-foreground">{m.value}</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{m.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{m.detail}</p>
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