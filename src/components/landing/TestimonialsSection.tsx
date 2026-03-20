import { memo } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Margaret T.", location: "Bristol", text: "The virtual physiotherapy sessions changed my life. I can now garden again without constant pain.", rating: 5, highlight: "garden again" },
  { name: "David K.", location: "Manchester", text: "Finally found a community that truly understands what living with arthritis means day to day.", rating: 5, highlight: "truly understands" },
  { name: "Priya S.", location: "London", text: "The anti-inflammatory diet plan reduced my flare-ups significantly within just 3 months.", rating: 5, highlight: "3 months" },
  { name: "James W.", location: "Edinburgh", text: "I was sceptical at first, but the gentle exercise guides have made a real difference to my mobility.", rating: 4, highlight: "real difference" },
  { name: "Helen R.", location: "Cardiff", text: "Being able to speak with a physiotherapist from home is invaluable when you have limited mobility.", rating: 5, highlight: "invaluable" },
  { name: "Robert M.", location: "Birmingham", text: "The nutrition resources here are far more practical than anything my GP could offer.", rating: 5, highlight: "far more practical" },
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
  <section className="py-20 lg:py-28 relative overflow-hidden section-divider bg-tint-green">

    <div className="container mx-auto px-6 md:px-10 max-w-7xl relative">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
        <span className="section-label text-primary mb-5 block">Patient Stories</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-6 tracking-tight">
          Real voices, real <span className="text-primary italic">impact</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">Hear from people whose lives have been transformed by our community.</p>
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
                  <Quote className="w-8 h-8 text-primary/10 mb-4 rotate-180" />
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: t.rating }).map((_, si) => <Star key={si} className="w-4 h-4 fill-secondary text-secondary" />)}
                    {Array.from({ length: 5 - t.rating }).map((_, si) => <Star key={`e${si}`} className="w-4 h-4 text-border" />)}
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
                      <p className="text-xs text-muted-foreground">{t.location}, UK</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
));

TestimonialsSection.displayName = "TestimonialsSection";
export default TestimonialsSection;
