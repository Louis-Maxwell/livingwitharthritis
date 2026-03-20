import { memo } from "react";
import { motion } from "framer-motion";
import { Download, Users, BookOpen, MessageCircle, Heart, TrendingUp, Globe, Award, Stethoscope, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  { icon: Users, value: "50,000+", label: "People supported across the UK", detail: "England, Scotland, Wales & Northern Ireland", color: "text-primary bg-primary/8" },
  { icon: Globe, value: "30M+", label: "Global arthritis community reach", detail: "Resources accessed in 42 countries", color: "text-sky-600 bg-sky-500/8" },
  { icon: BookOpen, value: "40+", label: "Clinically reviewed articles", detail: "Covering exercise, nutrition, supplements & lifestyle", color: "text-violet-600 bg-violet-500/8" },
  { icon: MessageCircle, value: "24/7", label: "AI health assistant availability", detail: "Powered by clinical-grade models", color: "text-amber-600 bg-amber-500/8" },
  { icon: TrendingUp, value: "78%", label: "Report reduced pain with exercise", detail: "Based on structured programme adherence", color: "text-emerald-600 bg-emerald-500/8" },
  { icon: Heart, value: "88p", label: "Of every £1 directly supports patients", detail: "Industry-leading efficiency ratio", color: "text-rose-600 bg-rose-500/8" },
  { icon: Download, value: "12", label: "Downloadable clinical resources", detail: "Exercise plans, trackers & diet guides", color: "text-cyan-600 bg-cyan-500/8" },
  { icon: ShieldCheck, value: "100%", label: "NICE guidelines compliant", detail: "All content clinically reviewed & evidence-based", color: "text-teal-600 bg-teal-500/8" },
];

const ImpactMetricsSection = memo(() => (
  <section className="py-24 lg:py-32 bg-tint-mint relative overflow-hidden" aria-labelledby="impact-heading">
    {/* Decorative */}
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
                  <p className="text-3xl font-display font-bold text-foreground tracking-tight mb-1">{m.value}</p>
                  <p className="text-sm font-semibold text-foreground">{m.label}</p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{m.detail}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Institutional footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-14 text-center"
      >
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
