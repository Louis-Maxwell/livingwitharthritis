import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BENEFICIARIES = [
  {
    name: "Margaret T.",
    age: 67,
    location: "Leeds",
    condition: "Osteoarthritis",
    quote: "The exercise programmes gave me my independence back. I can walk to the shops again without dreading every step.",
    initial: "MT",
  },
  {
    name: "James R.",
    age: 45,
    location: "Glasgow",
    condition: "Rheumatoid Arthritis",
    quote: "Being diagnosed at 40 was terrifying. The AI assistant answered my questions at 2am when I couldn't sleep from the pain.",
    initial: "JR",
  },
  {
    name: "Priya K.",
    age: 58,
    location: "Birmingham",
    condition: "Psoriatic Arthritis",
    quote: "The anti-inflammatory diet plan changed everything. My flare-ups are less frequent and I've lost two stone.",
    initial: "PK",
  },
  {
    name: "David W.",
    age: 72,
    location: "Cardiff",
    condition: "Osteoarthritis",
    quote: "I thought I'd have to give up gardening forever. The hand exercises and community support kept me going.",
    initial: "DW",
  },
];

const BeneficiarySpotlight = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = () => setCurrent((c) => (c + 1) % BENEFICIARIES.length);
  const prev = () => setCurrent((c) => (c - 1 + BENEFICIARIES.length) % BENEFICIARIES.length);

  const person = BENEFICIARIES[current];

  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-10">
          <span className="section-label text-primary mb-4 block text-xs font-bold tracking-wider uppercase">Real Stories</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight">
            People we've <span className="text-gradient italic">helped</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm sm:text-base">
            Behind every statistic is a person whose life has been changed by your support.
          </p>
        </div>

        <div className="relative bg-card border border-border/30 rounded-3xl p-6 sm:p-10 shadow-xl">
          <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/10" />

          <div className="text-center">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-lg font-bold text-primary">{person.initial}</span>
            </div>

            {/* Quote */}
            <blockquote className="text-base sm:text-lg text-foreground italic leading-relaxed max-w-2xl mx-auto mb-6">
              "{person.quote}"
            </blockquote>

            {/* Details */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{person.name}</span>
              <span>•</span>
              <span>Age {person.age}</span>
              <span>•</span>
              <span>{person.location}</span>
              <span>•</span>
              <span className="text-primary font-medium">{person.condition}</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border/30 flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {BENEFICIARIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === current ? "bg-primary w-6" : "bg-muted-foreground/20 hover:bg-muted-foreground/40"
                  }`}
                  aria-label={`Go to story ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border/30 flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Next story"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Read more */}
          <div className="text-center mt-6">
            <Button
              variant="link"
              onClick={() => navigate("/impact")}
              className="text-primary font-semibold group"
            >
              Read their full stories
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeneficiarySpotlight;
