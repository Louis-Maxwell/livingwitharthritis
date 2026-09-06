import { memo, type MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import "@/components/HeroSection.css";


const scrollToStartHere = (event: MouseEvent<HTMLAnchorElement>) => {
  const target = document.getElementById("start-here");
  if (!target) return;
  event.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
};

// Hero photo, compressed locally to WebP at 400/800 square variants so the
// LCP element stays tiny on mobile (~14KB at 400w).
const HERO_IMG = "/openverse/hero-friends-800.webp";
const HERO_SRCSET = "/openverse/hero-friends-400.webp 400w, /openverse/hero-friends-800.webp 800w";
const HERO_SIZES = "(min-width: 1024px) 560px, 100%";

const OAHero = memo(() => {
  const navigate = useNavigate();
  useReveal();

  return (
    <section
      aria-labelledby="oa-hero"
      className="band-red relative w-full max-w-full overflow-hidden"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-7xl py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy column */}
          <div className="hero-stagger">
            <h1
              id="oa-hero"
              className="hero-item text-balance break-words text-[clamp(2rem,8vw,5.5rem)] leading-[0.95] uppercase"
            >
              Living With Arthritis — UK charity for arthritis and frailty support
            </h1>

            <p className="hero-item mt-6 text-sm lg:text-base font-medium max-w-xl leading-relaxed">
              Living with joint pain is exhausting — the stiff mornings, the cancelled plans,
              the feeling that nobody quite gets it. You are not alone.
            </p>

            <p className="hero-item mt-4 text-lg lg:text-xl max-w-xl leading-relaxed">
              We are a young UK charity (no.&nbsp;1218461) in Oswestry, independent of Arthritis UK.
              Here you will find clinically reviewed exercises, diet guidance and plain-English
              support you can use today — free, honest, and built with people who live this too.
            </p>

            <div className="hero-item mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 min-w-0">
              <button
                type="button"
                onClick={() => navigate("/conditions/osteoarthritis")}
                className="btn-map btn-map-dark group w-full sm:w-auto justify-center min-h-11"
              >
                <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
                Start your gentle plan
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              <a href="/donate" className="btn-map w-full sm:w-auto justify-center min-h-11" style={{ background: "white", color: "hsl(var(--foreground))" }}>
                Donate — keep it free
              </a>
              <a
                href="#start-here"
                onClick={scrollToStartHere}
                className="btn-map w-full sm:w-auto justify-center min-h-11"
                style={{ background: "transparent", color: "inherit", border: "2px solid currentColor" }}
              >
                Find your starting point
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
          <div className="reveal relative aspect-square w-full max-w-[min(560px,100%)] mx-auto min-w-0">
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
