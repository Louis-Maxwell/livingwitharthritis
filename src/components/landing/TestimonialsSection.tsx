import { memo } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  { name: "Margaret T.", location: "Bristol", text: "The virtual physiotherapy sessions changed my life. I can now garden again without constant pain.", rating: 5 },
  { name: "David K.", location: "Manchester", text: "Finally found a community that truly understands what living with arthritis means day to day.", rating: 5 },
  { name: "Priya S.", location: "London", text: "The anti-inflammatory diet plan reduced my flare-ups significantly within just 3 months.", rating: 5 },
  { name: "James W.", location: "Edinburgh", text: "I was sceptical at first, but the gentle exercise guides have made a real difference to my mobility.", rating: 4 },
  { name: "Helen R.", location: "Cardiff", text: "Being able to speak with a physiotherapist from home is invaluable when you have limited mobility.", rating: 5 },
  { name: "Robert M.", location: "Birmingham", text: "The nutrition resources here are far more practical than anything my GP could offer.", rating: 5 },
];

const TestimonialsSection = memo(() => (
  <section className="py-24 lg:py-32 bg-accent/20 relative overflow-hidden section-divider">
    {/* Decorative background elements */}
    <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/[0.02] blur-3xl pointer-events-none" />
    <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-gold/[0.03] blur-3xl pointer-events-none" />

    <div className="container mx-auto px-6 md:px-10 max-w-7xl relative">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <span className="section-label text-primary mb-4 block">Patient Stories</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-5">
          Real voices, real <span className="text-primary italic">impact</span>
        </h2>
        <p className="text-base text-muted-foreground/70 max-w-lg mx-auto">Hear from people whose lives have been transformed.</p>
        <div className="w-12 h-[2px] bg-gradient-to-r from-gold to-amber mx-auto mt-5 rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
            <Card className="h-full p-7 rounded-3xl border-border/20 bg-card relative group card-hover overflow-hidden">
              {/* Shimmer overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/5 group-hover:text-primary/10 transition-colors duration-500" />
              <div className="relative">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, si) => <Star key={si} className="w-3.5 h-3.5 fill-gold text-gold" />)}
                  {Array.from({ length: 5 - t.rating }).map((_, si) => <Star key={si} className="w-3.5 h-3.5 text-border" />)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/8 flex items-center justify-center text-xs font-bold text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground/50">{t.location}</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

TestimonialsSection.displayName = "TestimonialsSection";
export default TestimonialsSection;
