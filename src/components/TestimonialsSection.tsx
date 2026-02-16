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
    <section className="py-24 lg:py-36 bg-background relative overflow-hidden section-divider">
      <div className="gradient-orb w-[600px] h-[600px] bg-gold top-[-150px] left-[10%]" />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label text-gold mb-4 block">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
            Real stories, <span className="text-gold italic">real lives</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-card rounded-[2rem] p-8 sm:p-12 lg:p-16 border border-border/20 shadow-medium relative overflow-hidden"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-gold/6" />

              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <blockquote className="text-base sm:text-lg lg:text-xl font-display text-foreground leading-[1.6] mb-8 italic">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground/50 mt-1 tracking-wide">
                    {t.condition} · Age {t.age} · {t.location}
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <Button variant="outline" size="icon" onClick={prev} className="rounded-full w-10 h-10 border-border/30 hover:border-primary hover:text-primary transition-all duration-300">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={next} className="rounded-full w-10 h-10 border-border/30 hover:border-primary hover:text-primary transition-all duration-300">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/30"
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