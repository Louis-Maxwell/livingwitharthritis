import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Sarah Mitchell",
    age: 42,
    condition: "Rheumatoid Arthritis",
    location: "Manchester",
    quote: "Living With Arthritis completely changed how I manage my condition. The virtual physiotherapy sessions fit around my schedule, and the nutrition guide helped me reduce my flare-ups significantly.",
    rating: 5,
  },
  {
    name: "James Okonkwo",
    age: 58,
    condition: "Osteoarthritis",
    location: "Birmingham",
    quote: "After my diagnosis, I felt lost. The community here gave me hope and practical advice. The online resources are better than anything my GP could point me to.",
    rating: 5,
  },
  {
    name: "Emily Chen",
    age: 35,
    condition: "Psoriatic Arthritis",
    location: "London",
    quote: "The AI assistant answered questions I was too embarrassed to ask my doctor. Having 24/7 access to reliable information has been life-changing.",
    rating: 5,
  },
  {
    name: "David Thomson",
    age: 67,
    condition: "Gout",
    location: "Edinburgh",
    quote: "The dietary advice helped me understand my triggers better than 20 years of medical appointments. My flare-ups have reduced dramatically.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[current];

  return (
    <section className="py-16 lg:py-24 bg-background relative overflow-hidden section-divider">
      <div className="gradient-orb w-[400px] h-[400px] bg-gold top-[-50px] left-[20%]" />

      <div className="container mx-auto px-4 md:px-8 max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="section-label text-gold mb-3 block">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
            Real stories, <span className="text-gold">real lives</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="bg-card rounded-3xl p-6 sm:p-10 lg:p-14 border border-border/50 shadow-medium relative overflow-hidden"
            >
              {/* Warm accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl" />
              <Quote className="absolute top-5 right-5 w-10 h-10 text-gold/10" />

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <blockquote className="text-base sm:text-lg lg:text-xl font-display text-foreground leading-relaxed mb-6 italic">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="font-bold text-foreground text-sm sm:text-base">{t.name}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {t.condition} · Age {t.age} · {t.location}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={prev} className="rounded-full w-9 h-9 border-border hover:border-primary hover:text-primary">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={next} className="rounded-full w-9 h-9 border-border hover:border-primary hover:text-primary">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-7 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;