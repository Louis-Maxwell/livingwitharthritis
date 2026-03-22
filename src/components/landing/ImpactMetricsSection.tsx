import { memo } from "react";
import { motion } from "framer-motion";
import { Download, Users, BookOpen, MessageCircle, Heart, TrendingUp, Globe, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const metrics = [
  { icon: Users, target: 50000, suffix: "+", compact: true, label: "People supported across the UK", detail: "England, Scotland, Wales & Northern Ireland", color: "text-primary bg-primary/8" },
  { icon: Globe, target: 30000000, suffix: "+", compact: true, label: "Global arthritis community reach", detail: "Resources accessed in 42 countries", color: "text-sky-600 bg-sky-500/8" },
  { icon: BookOpen, target: 40, suffix: "+", compact: false, label: "Clinically reviewed articles", detail: "Covering exercise, nutrition, supplements & lifestyle", color: "text-violet-600 bg-violet-500/8" },
  { icon: MessageCircle, display: "24/7", target: 0, suffix: "", compact: false, label: "AI health assistant availability", detail: "Powered by clinical-grade models", color: "text-amber-600 bg-amber-500/8" },
  { icon: TrendingUp, target: 78, suffix: "%", compact: false, label: "Report reduced pain with exercise", detail: "Based on structured programme adherence", color: "text-emerald-600 bg-emerald-500/8" },
  { icon: Heart, display: "88p", target: 0, suffix: "", compact: false, label: "Of every £1 directly supports patients", detail: "Industry-leading efficiency ratio", color: "text-rose-600 bg-rose-500/8" },
  { icon: Download, target: 12, suffix: "", compact: false, label: "Downloadable clinical resources", detail: "Exercise plans, trackers & diet guides", color: "text-cyan-600 bg-cyan-500/8" },
  { icon: ShieldCheck, target: 100, suffix: "%", compact: false, label: "NICE guidelines compliant", detail: "All content clinically reviewed & evidence-based", color: "text-teal-600 bg-teal-500/8" },
];

const ImpactMetricsSection = memo(() => (
  <section className="py-24 lg:py-32 bg-tint-mint relative overflow-hidden" aria-labelledby="impact-heading">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/5 rounded-full blur-[180px] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

    <div className="container mx-auto px-6 md:px-10 max-w-7xl relative">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
        <span className="section-label text-primary mb-5 block">Our Impact in Numbers</span>
        <h2 id="impact-heading" className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.06]">
          Measurable impact, <span className="text-primary italic">transparent results</span>
        </h2>
        <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Every resource, programme and consultation is funded by your generosity. Here's the difference we're making together — verified, audited and publicly reported.
        </p>
        <div className="luxury-divider mt-8">
          <div className="w-2 h-2 rounded-full bg-primary/30" />
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="h-full border border-border/30 hover:border-primary/15 transition-all duration-400 hover:shadow-large hover:-translate-y-1 group rounded-2xl">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${m.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-3xl font-display font-bold text-foreground tracking-tight mb-1">
                    <AnimatedCounter
                      target={m.target}
                      suffix={m.suffix}
                      compact={m.compact}
                      display={"display" in m ? (m as any).display : undefined}
                    />
                  </p>
                  <p className="text-sm font-semibold text-foreground">{m.label}</p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{m.detail}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-14 text-center">
        <p className="text-xs text-muted-foreground/60 max-w-xl mx-auto leading-relaxed">
          All impact figures are self-reported and based on platform analytics as of March 2026.
          Financial transparency data available in our annual report. Registered with the Charity Commission (pending).
        </p>
      </motion.div>
    </div>
  </section>
));

ImpactMetricsSection.displayName = "ImpactMetricsSection";
export default ImpactMetricsSection;
