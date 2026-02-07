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
    quote: "Living With Arthritis completely changed how I manage my condition. The virtual physiotherapy sessions fit around my schedule, and the nutrition guide helped me reduce my flare-ups significantly. I finally feel in control.",
    rating: 5,
  },
  {
    name: "James Okonkwo",
    age: 58,
    condition: "Osteoarthritis",
    location: "Birmingham",
    quote: "After my diagnosis, I felt lost. The community here gave me hope and practical advice. The online resources are better than anything my GP could point me to. I've recommended it to everyone I know.",
    rating: 5,
  },
  {
    name: "Emily Chen",
    age: 35,
    condition: "Psoriatic Arthritis",
    location: "London",
    quote: "The AI assistant answered questions I was too embarrassed to ask my doctor. Having 24/7 access to reliable information has been life-changing. This charity does more than most hospitals in terms of patient education.",
    rating: 5,
  },
  {
    name: "David Thomson",
    age: 67,
    condition: "Gout",
    location: "Edinburgh",
    quote: "The dietary advice on this site helped me understand my triggers better than 20 years of medical appointments. My flare-ups have reduced dramatically since following the nutrition guidance.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-28 lg:py-36 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8 relative max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="editorial-caption text-muted-foreground inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-border" />
            Testimonials
            <span className="w-8 h-px bg-border" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight">
            Real Stories,{" "}
            <span className="font-display italic font-normal text-gradient-gold">Real Lives</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-3xl p-10 lg:p-16 border border-border/50 shadow-medium relative overflow-hidden"
            >
              <Quote className="absolute top-8 right-8 w-16 h-16 text-gold/10" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <blockquote className="text-xl lg:text-2xl font-editorial text-foreground/90 leading-relaxed mb-10 italic">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-lg text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground font-light">
                    {t.condition} · Age {t.age} · {t.location}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prev}
                    className="rounded-full w-10 h-10 border-border/50 hover:border-gold hover:text-gold"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={next}
                    className="rounded-full w-10 h-10 border-border/50 hover:border-gold hover:text-gold"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-gold" : "bg-border hover:bg-muted-foreground/30"
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
