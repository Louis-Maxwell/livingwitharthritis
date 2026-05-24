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
      <strong className="text-foreground font-semibold bg-primary/10 px-1 rounded">{highlight}</strong>
      {text.slice(idx + highlight.length)}&rdquo;
    </>
  );
};

const TestimonialsSection = memo(() => (
  <section className="py-24 lg:py-32 relative bg-background overflow-hidden">
    {/* Decorative orb */}
    <div className="absolute -top-40 -end-40 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-[100px] pointer-events-none" />
    
    <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl relative">
      <div className="text-center mb-20">
        <span className="section-label text-primary/60 mb-5 block">Patient Outcomes</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[3.5rem] font-bold text-foreground mb-6 tracking-tight leading-[1.06]">
          Real voices, real <span className="text-primary italic">transformations</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Verified testimonials from patients whose lives have been measurably improved through our programmes.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-7">
        {testimonials.map((t, i) => (
          <div key={i} className="h-full p-9 lg:p-10 rounded-2xl border border-border/10 bg-card hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col group relative overflow-hidden">
            {/* Hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.01] to-primary/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-9 h-9 text-primary/[0.08] rotate-180 group-hover:text-primary/[0.15] transition-colors duration-500" />
                {t.verified && (
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-primary tracking-[0.15em] uppercase bg-primary/5 px-3 py-1 rounded-full">
                    <Verified className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <div className="flex gap-0.5 mb-7">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-[1.9] mb-7 flex-1">
                <HighlightedText text={t.text} highlight={t.highlight} />
              </p>
              
              <Link 
                to={`/blog/${t.storySlug}`}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary tracking-[0.15em] uppercase mb-8 hover:gap-2.5 transition-all group/link"
              >
                Read full story <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>

              <div className="flex items-center gap-4 pt-7 border-t border-border/8">
                <img 
                  src={t.avatar} 
                  alt={`${t.name} - ${t.condition} patient`}
                  className="w-13 h-13 rounded-full object-cover border-2 border-primary/10 group-hover:border-primary/25 transition-colors duration-500"
                  loading="lazy"
                  width={52}
                  height={52}
                />
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-[11px] text-muted-foreground tracking-wide">{t.location} · {t.condition}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-card border border-border/15 shadow-soft hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300 cursor-default">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-primary text-primary" />)}
          </div>
          <span className="text-base font-bold text-foreground">4.9/5</span>
          <span className="text-xs text-muted-foreground tracking-wide">from 2,400+ reviews</span>
        </div>
      </div>
    </div>
  </section>
));

TestimonialsSection.displayName = "TestimonialsSection";
export default TestimonialsSection;