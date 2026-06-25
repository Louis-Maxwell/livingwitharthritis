import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * text.com-inspired full-bleed red hero with massive serif headline,
 * supporting paragraph + black pill CTA, and oversized background letters.
 * Reskins the homepage opener; copy stays charity-faithful.
 */
const HeroBigType = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full overflow-hidden bg-primary text-primary-foreground"
      aria-labelledby="hero-headline"
    >
      {/* Oversized background letters — purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none font-display font-black text-background/95 leading-[0.78] tracking-[-0.05em]"
        style={{ fontSize: "clamp(10rem, 38vw, 36rem)" }}
      >
        <span className="block whitespace-nowrap text-center">move</span>
      </div>

      <div className="relative container mx-auto px-6 md:px-10 pt-20 pb-[28vw] md:pb-[22vw]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <h1
            id="hero-headline"
            className="lg:col-span-8 font-display font-black text-primary-foreground"
            style={{
              fontSize: "clamp(3rem, 9.5vw, 9.5rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              fontVariationSettings: '"opsz" 144, "SOFT" 30',
            }}
          >
            Living well<br />
            with arthritis
          </h1>

          <div className="lg:col-span-4 lg:pt-6">
            <p className="font-sans text-lg md:text-xl leading-snug text-primary-foreground/95 max-w-md">
              An open-source plan for osteoarthritis &mdash; clinically
              reviewed movement, diet and pain relief, free for everyone
              in the UK.
            </p>
            <button
              onClick={() => navigate("/start-here")}
              className="mt-6 inline-flex items-center gap-2 bg-foreground text-background px-7 h-12 rounded-full text-sm font-semibold hover:-translate-y-0.5 transition-transform"
            >
              Start the plan
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBigType;
