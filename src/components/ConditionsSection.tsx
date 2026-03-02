import { memo, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useConditions } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

const CONDITION_SLUGS: Record<string, string> = {
  "Osteoarthritis": "/conditions/osteoarthritis",
  "Rheumatoid Arthritis": "/conditions/rheumatoid-arthritis",
  "Psoriatic Arthritis": "/conditions/psoriatic-arthritis",
};

const DiagnosisFlowChart = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.2 }}
    className="mt-16 mb-4"
  >
    <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground text-center mb-8">
      Understanding Your <span className="text-secondary italic">Diagnosis Journey</span>
    </h3>
    <div className="relative max-w-3xl mx-auto">
      {/* Flow chart steps */}
      {[
        { step: "1", title: "Symptoms Appear", desc: "Joint pain, stiffness, swelling or fatigue", color: "bg-primary/10 text-primary border-primary/20" },
        { step: "2", title: "Visit Your GP", desc: "Physical examination, medical history review", color: "bg-secondary/10 text-secondary border-secondary/20" },
        { step: "3", title: "Diagnostic Tests", desc: "Blood tests, X-rays, MRI scans, ultrasound", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
        { step: "4", title: "Specialist Referral", desc: "Rheumatologist assessment and diagnosis", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
        { step: "5", title: "Treatment Plan", desc: "Personalised therapy: exercise, diet, medication", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
      ].map((item, i) => (
        <div key={item.step} className="flex items-start gap-4 mb-1 last:mb-0">
          {/* Connector line */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full ${item.color} border-2 flex items-center justify-center font-display font-bold text-sm shrink-0`}>
              {item.step}
            </div>
            {i < 4 && <div className="w-0.5 h-8 bg-border/50" />}
          </div>
          <div className="pt-1.5 pb-4">
            <p className="font-display font-semibold text-foreground text-sm">{item.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
));
DiagnosisFlowChart.displayName = "DiagnosisFlowChart";

const ConditionsSection = memo(() => {
  const { data: conditions, isLoading } = useConditions();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} id="conditions" className="py-14 lg:py-20 bg-background relative overflow-hidden section-divider">
      <motion.div className="gradient-orb glow-pulse w-[700px] h-[700px] bg-secondary bottom-[-200px] right-[-250px]" style={{ y: orbY }} />

      <div className="container mx-auto px-6 md:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="section-label text-secondary mb-4 block">Conditions We Cover</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">
            Understanding your <span className="text-secondary italic">condition</span>
          </h2>
          <div className="luxury-divider">
            <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-card border-border/20 rounded-[2rem]">
                <CardHeader className="pb-3 p-8">
                  <Skeleton className="h-5 w-20 rounded-full mb-2" />
                  <Skeleton className="h-5 w-3/4" />
                </CardHeader>
                <CardContent className="px-8"><Skeleton className="h-12 w-full" /></CardContent>
              </Card>
            ))
          ) : (
            conditions?.map((condition, i) => {
              const href = CONDITION_SLUGS[condition.title];
              const imageUrl = (condition as any).image_url;
              const cardContent = (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  {imageUrl && (
                    <div className="w-full h-40 overflow-hidden rounded-t-[2rem]">
                      <img
                        src={imageUrl}
                        alt={`${condition.title} illustration`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <CardHeader className={`pb-2 relative ${imageUrl ? 'p-6 pt-4' : 'p-8'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`${condition.color} text-white text-[10px] font-bold px-3 py-0.5 rounded-full tracking-wider`}>
                        {condition.category}
                      </Badge>
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        className="w-9 h-9 rounded-full bg-accent flex items-center justify-center group-hover:bg-secondary/8 transition-colors duration-500"
                      >
                        <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-secondary transition-colors" />
                      </motion.div>
                    </div>
                    <CardTitle className="text-base sm:text-lg font-display font-semibold text-foreground group-hover:text-secondary transition-colors duration-300">
                      {condition.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`relative ${imageUrl ? 'px-6 pb-6' : 'px-8 pb-8'}`}>
                    <CardDescription className="text-muted-foreground leading-[1.75] text-[13px]">
                      {condition.description}
                    </CardDescription>
                    <div className="flex items-center text-xs font-bold text-secondary opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2 uppercase tracking-[0.2em] mt-5">
                      Read more <ArrowRight className="ml-2 w-3.5 h-3.5" />
                    </div>
                  </CardContent>
                </>
              );
              return (
                <motion.div
                  key={condition.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {href ? (
                    <Link to={href} className="block h-full no-underline">
                      <Card className="group h-full premium-card cursor-pointer overflow-hidden">
                        {cardContent}
                      </Card>
                    </Link>
                  ) : (
                    <Card className="group h-full premium-card cursor-pointer overflow-hidden">
                      {cardContent}
                    </Card>
                  )}
                </motion.div>
              );
            })
          )}
        </div>

        {/* Diagnosis Flow Chart */}
        <DiagnosisFlowChart />
      </div>
    </section>
  );
});

ConditionsSection.displayName = "ConditionsSection";
export default ConditionsSection;
