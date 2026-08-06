import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/useReveal";
import "@/components/HeroSection.css";

// Was a 2.3MB unoptimized JPEG on Lovable's asset CDN — this single image
// was the dominant cause of a 27.8s mobile LCP (PageSpeed Insights, 24 Jul
// 2026). Replaced with an already-compressed local WebP (154KB, ~93%
// smaller) at its native resolution — no upscaling artifacts.
const HERO_IMG = "/openverse/hero-couple-800.webp";
const HERO_SRCSET = "/openverse/hero-couple-400.webp 400w, /openverse/hero-couple-800.webp 800w";
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
              We work to uphold UK arthritis health and dignity.
            </h1>

            <p className="hero-item mt-8 text-lg lg:text-xl max-w-xl leading-relaxed">
              Millions of people across the UK live with arthritis pain and stiffness.
              Living With Arthritis provides clinically-reviewed guidance, exercise plans and
              nutrition support — free, for everyone.
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
              <a href="#donate-inline" className="btn-map" style={{ background: "white", color: "hsl(var(--foreground))" }}>
                Donate — keep it free
              </a>
            </div>

            <ul
              aria-label="Clinical alignment"
              className="hero-item mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em]"
            >
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white" />
                HCPC-registered physiotherapists
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white" />
                CSP members
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white" />
                Aligned with NICE guidance
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
              <a href="/conditions/knee-arthritis" className="font-semibold underline underline-offset-4 hover:no-underline">Knee exercises</a>
              <span aria-hidden="true" className="opacity-50">·</span>
              <a href="/diet" className="font-semibold underline underline-offset-4 hover:no-underline">Anti-inflammatory diet</a>
              <span aria-hidden="true" className="opacity-50">·</span>
              <a href="/guides/arthritis-pain-relief" className="font-semibold underline underline-offset-4 hover:no-underline">Pain-relief tips</a>
            </nav>
          </div>

          {/* Octagon image — MAP signature shape */}
          <div className="reveal relative aspect-square w-full max-w-[560px] mx-auto">
            <img
              src={HERO_IMG}
              srcSet={HERO_SRCSET}
              sizes={HERO_SIZES}
              alt="An older couple outdoors together — representing the community Living With Arthritis UK supports."
              width={800}
              height={602}
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
