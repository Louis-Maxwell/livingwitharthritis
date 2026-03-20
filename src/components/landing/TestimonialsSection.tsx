import { memo } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Verified } from "lucide-react";

const testimonials = [
  { name: "Margaret T.", location: "Bristol", condition: "Osteoarthritis", text: "The virtual physiotherapy sessions changed my life. I can now garden again without constant pain. After 3 months, my GP reduced my painkillers.", rating: 5, highlight: "reduced my painkillers", verified: true },
  { name: "David K.", location: "Manchester", condition: "Rheumatoid Arthritis", text: "Finally found a community that truly understands what living with arthritis means day to day. The exercises are tailored perfectly.", rating: 5, highlight: "truly understands", verified: true },
  { name: "Priya S.", location: "London", condition: "Psoriatic Arthritis", text: "The anti-inflammatory diet plan reduced my flare-ups significantly within just 3 months. My CRP levels dropped from 28 to 8.", rating: 5, highlight: "CRP levels dropped", verified: true },
  { name: "James W.", location: "Edinburgh", condition: "Knee OA", text: "I was sceptical at first, but the gentle exercise guides have made a real difference to my mobility. Walking distance up 40% in 8 weeks.", rating: 5, highlight: "40% in 8 weeks", verified: true },
  { name: "Helen R.", location: "Cardiff", condition: "Hip Arthritis", text: "Being able to consult a physiotherapist from home is invaluable when you have limited mobility. The quality rivals private clinics.", rating: 5, highlight: "rivals private clinics", verified: true },
  { name: "Robert M.", location: "Birmingham", condition: "Osteoarthritis", text: "The nutrition resources here are far more practical than anything my GP could offer. Lost 2 stone and my knees feel 10 years younger.", rating: 5, highlight: "10 years younger", verified: true },
];

const avatarColors = [
  "bg-blue-500/12 text-blue-700",
  "bg-emerald-500/12 text-emerald-700",
  "bg-violet-500/12 text-violet-700",
  "bg-amber-500/12 text-amber-700",
  "bg-rose-500/12 text-rose-700",
  "bg-cyan-500/12 text-cyan-700",
];

const TestimonialsSection = memo(() => (
  <section className="py-24 lg:py-32 relative overflow-hidden section-divider bg-tint-green">
    <div className="container mx-auto px-6 md:px-10 max-w-7xl relative">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
        <span className="section-label text-primary mb-5 block">Patient Outcomes</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-6 tracking-tight">
          Real voices, real <span className="text-primary italic">transformations</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Verified testimonials from real patients whose lives have been measurably improved through our programmes. All stories shared with consent.
        </p>
        <div className="luxury-divider mt-8">
          <Star className="w-4 h-4 text-primary/30 fill-primary/30" />
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => {
          const highlightedText = t.text.replace(
            t.highlight,
            `<strong class="text-primary font-bold">${t.highlight}</strong>`
          );
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}>
              <div className="h-full p-8 rounded-3xl border border-border/25 bg-card relative group hover-lift overflow-hidden">
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Top accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-8 h-8 text-primary/10 rotate-180" />
                    {t.verified && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                        <Verified className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: t.rating }).map((_, si) => <Star key={si} className="w-4 h-4 fill-secondary text-secondary" />)}
                  </div>
                  <p
                    className="text-sm text-muted-foreground leading-[1.8] mb-7"
                    dangerouslySetInnerHTML={{ __html: `"${highlightedText}"` }}
                  />
                  <div className="flex items-center gap-3 pt-5 border-t border-border/15">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold ${avatarColors[i % avatarColors.length]}`}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.location} · {t.condition}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Aggregate rating */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-14 text-center"
      >
        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-card border border-border/30 shadow-soft">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-secondary text-secondary" />)}
          </div>
          <span className="text-sm font-bold text-foreground">4.9/5</span>
          <span className="text-xs text-muted-foreground">from 2,400+ patient reviews</span>
        </div>
      </motion.div>
    </div>
  </section>
));

TestimonialsSection.displayName = "TestimonialsSection";
export default TestimonialsSection;
