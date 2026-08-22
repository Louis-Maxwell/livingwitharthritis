import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/useReveal";
import "@/components/HeroSection.css";

// Hero photo, compressed locally to WebP at 400/800 square variants so the
// LCP element stays tiny on mobile (~14KB at 400w).
const HERO_IMG = "/openverse/hero-friends-800.webp";
const HERO_SRCSET = "/openverse/hero-friends-400.webp 400w, /openverse/hero-friends-800.webp 800w";
const HERO_SIZES = "(min-width: 1024px) 560px, 100vw";

const OAHero = memo(() => {
  const navigate = useNavigate();
  useReveal();

  return (
    <section
      aria-labelledby="oa-hero"
      className="band-red relative w-full overflow-hidden"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-7xl py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy column */}
          <div className="hero-stagger">
            <h1
              id="oa-hero"
              className="hero-item text-balance text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] uppercase"
            >
              Evidence-based arthritis support and health guides for the UK
            </h1>

            <p className="hero-item speakable-intro mt-8 text-lg lg:text-xl max-w-xl leading-relaxed">
              Millions of people across the UK live with arthritis pain and stiffness.
              Living With Arthritis provides practical guidance, exercise ideas and
              nutrition information — free, for everyone.
            </p>

            <div className="hero-item mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => navigate("/conditions/osteoarthritis")}
                className="btn-map btn-map-dark group"
              >
                <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
                Start your gentle plan
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              <a href="/donate" className="btn-map" style={{ background: "white", color: "hsl(var(--foreground))" }}>
                Donate — keep it free
              </a>
            </div>

            <ul
              aria-label="About our information"
              className="hero-item mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em]"
            >
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white" />
                UK-focused information
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white" />
                Free to access
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white" />
                Transparent editorial standards
              </li>
            </ul>

            <p className="hero-item mt-4 text-xs">
              Learn about our{" "}
              <Link to="/editorial-standards" className="underline hover:no-underline font-medium">
                medical review process and editorial standards
              </Link>
              .
            </p>

            <nav
              aria-label="Popular guides"
              className="hero-item mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
            >
              <span className="font-semibold">Popular:</span>
              <a href="/blog/knee-arthritis-exercises-uk" className="font-semibold underline underline-offset-4 hover:no-underline">Knee exercises</a>
              <span aria-hidden="true" className="opacity-50">·</span>
              <a href="/diet" className="font-semibold underline underline-offset-4 hover:no-underline">Anti-inflammatory diet</a>
              <span aria-hidden="true" className="opacity-50">·</span>
              <a href="/guides/arthritis-pain-relief" className="font-semibold underline underline-offset-4 hover:no-underline">Pain-relief tips</a>
            </nav>
          </div>

          {/* Octagon image — MAP signature shape */}
          <div className="reveal relative aspect-square w-full max-w-[560px] mx-auto min-h-[240px] bg-muted/30">
            <img
              src={HERO_IMG}
              srcSet={HERO_SRCSET}
              sizes={HERO_SIZES}
              alt="Two smiling young women outdoors together — representing the community Living With Arthritis UK supports."
              width={800}
              height={800}
              {...({ fetchpriority: "high" } as Record<string, string>)}
              decoding="async"
              loading="eager"
              className="clip-octagon w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

OAHero.displayName = "OAHero";
export default OAHero;
