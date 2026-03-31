import { memo } from "react";
import { Star, Quote, Verified } from "lucide-react";

const testimonials = [
  { name: "Margaret T.", location: "Bristol", condition: "Osteoarthritis", text: "The virtual physiotherapy sessions changed my life. I can now garden again without constant pain. After 3 months, my GP reduced my painkillers.", rating: 5, highlight: "reduced my painkillers", verified: true },
  { name: "Priya S.", location: "London", condition: "Psoriatic Arthritis", text: "The anti-inflammatory diet plan reduced my flare-ups significantly within just 3 months. My CRP levels dropped from 28 to 8.", rating: 5, highlight: "CRP levels dropped", verified: true },
  { name: "James W.", location: "Edinburgh", condition: "Knee OA", text: "I was sceptical at first, but the gentle exercise guides have made a real difference to my mobility. Walking distance up 40% in 8 weeks.", rating: 5, highlight: "40% in 8 weeks", verified: true },
];

const avatarColors = [
  "bg-blue-500/12 text-blue-700",
  "bg-violet-500/12 text-violet-700",
  "bg-amber-500/12 text-amber-700",
];

const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
  const idx = text.indexOf(highlight);
  if (idx === -1) return <>&ldquo;{text}&rdquo;</>;
  return (
    <>
      &ldquo;{text.slice(0, idx)}
      <strong className="text-primary font-bold">{highlight}</strong>
      {text.slice(idx + highlight.length)}&rdquo;
    </>
  );
};

const TestimonialsSection = memo(() => (
  <section className="section-spacer relative">
    <div className="container mx-auto px-6 md:px-10 max-w-6xl">
      <div className="text-center mb-16">
        <span className="section-label text-primary mb-5 block">Patient Outcomes</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
          Real voices, real <span className="text-primary italic">transformations</span>
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Verified testimonials from patients whose lives have been measurably improved through our programmes.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
          >
            <div className="h-full p-8 rounded-2xl border border-border/25 bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-7 h-7 text-primary/10 rotate-180" />
                {t.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                    <Verified className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-[1.8] mb-7">
                <HighlightedText text={t.text} highlight={t.highlight} />
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-border/15">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${avatarColors[i]}`}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location} · {t.condition}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center animate-in fade-in duration-500" style={{ animationDelay: "300ms" }}>
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border/30">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-secondary text-secondary" />)}
          </div>
          <span className="text-sm font-bold text-foreground">4.9/5</span>
          <span className="text-xs text-muted-foreground">from 2,400+ reviews</span>
        </div>
      </div>
    </div>
  </section>
));

TestimonialsSection.displayName = "TestimonialsSection";
export default TestimonialsSection;
