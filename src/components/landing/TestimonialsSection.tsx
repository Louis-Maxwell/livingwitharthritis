import { memo } from "react";
import { Star, Quote, Verified, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { avatarMargaret, avatarPriya, avatarJames } from "@/data/images";

const testimonials = [
  { name: "Margaret T.", location: "Bristol", condition: "Osteoarthritis", text: "The virtual physiotherapy sessions changed my life. I can now garden again without constant pain. After 3 months, my GP reduced my painkillers.", rating: 5, highlight: "reduced my painkillers", verified: true, avatar: avatarMargaret, storySlug: "arthritis-and-gardening-uk" },
  { name: "Priya S.", location: "London", condition: "Psoriatic Arthritis", text: "The anti-inflammatory diet plan reduced my flare-ups significantly within just 3 months. My CRP levels dropped from 28 to 8.", rating: 5, highlight: "CRP levels dropped", verified: true, avatar: avatarPriya, storySlug: "best-diet-for-joint-pain-uk" },
  { name: "James W.", location: "Edinburgh", condition: "Knee OA", text: "I was sceptical at first, but the gentle exercise guides have made a real difference to my mobility. Walking distance up 40% in 8 weeks.", rating: 5, highlight: "40% in 8 weeks", verified: true, avatar: avatarJames, storySlug: "knee-arthritis-exercises-uk" },
];

const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
  const idx = text.indexOf(highlight);
  if (idx === -1) return <>&ldquo;{text}&rdquo;</>;
  return (
    <>
      &ldquo;{text.slice(0, idx)}
      <strong className="text-foreground font-semibold">{highlight}</strong>
      {text.slice(idx + highlight.length)}&rdquo;
    </>
  );
};

const TestimonialsSection = memo(() => (
  <section className="section-spacer relative bg-warm">
    <div className="container mx-auto px-6 md:px-12 max-w-6xl">
      <div className="text-center mb-20">
        <span className="section-label text-primary/70 mb-5 block">Patient Outcomes</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold text-foreground mb-6 tracking-tight leading-[1.08]">
          Real voices, real <span className="text-primary italic">transformations</span>
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Verified testimonials from patients whose lives have been measurably improved through our programmes.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="h-full p-8 lg:p-10 rounded-2xl border border-border/15 bg-card hover:shadow-large hover:-translate-y-1 transition-all duration-500 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <Quote className="w-8 h-8 text-primary/8 rotate-180" />
              {t.verified && (
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald tracking-wider uppercase">
                  <Verified className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
            <div className="flex gap-0.5 mb-6">
              {Array.from({ length: t.rating }).map((_, si) => (
                <Star key={si} className="w-3.5 h-3.5 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-[1.85] mb-6 flex-1">
              <HighlightedText text={t.text} highlight={t.highlight} />
            </p>
            
            {/* Read full story link */}
            <Link 
              to={`/blog/${t.storySlug}`}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary tracking-[0.15em] uppercase mb-8 hover:gap-2.5 transition-all"
            >
              Read full story <ArrowRight className="w-3 h-3" />
            </Link>

            <div className="flex items-center gap-3.5 pt-6 border-t border-border/10">
              <img 
                src={t.avatar} 
                alt={`${t.name} - ${t.condition} patient`}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary/10"
                loading="lazy"
                width={48}
                height={48}
              />
              <div>
                <p className="text-sm font-bold text-foreground">{t.name}</p>
                <p className="text-[11px] text-muted-foreground/60 tracking-wide">{t.location} · {t.condition}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-card border border-border/20">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-gold text-gold" />)}
          </div>
          <span className="text-sm font-bold text-foreground">4.9/5</span>
          <span className="text-xs text-muted-foreground/60 tracking-wide">from 2,400+ reviews</span>
        </div>
      </div>
    </div>
  </section>
));

TestimonialsSection.displayName = "TestimonialsSection";
export default TestimonialsSection;
