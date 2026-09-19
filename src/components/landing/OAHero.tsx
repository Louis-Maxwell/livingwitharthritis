import { memo, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import "@/components/HeroSection.css";
import { onCoverImgError } from "@/lib/articleImages";
import { trackDonationClick, trackStartHereCard } from "@/lib/ga-events";


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
const HERO_SIZES = "(min-width: 1024px) 320px, 220px";

const OAHero = memo(() => {
  useReveal();

  return (
    <section
      aria-labelledby="oa-hero"
      className="band-red relative w-full max-w-full overflow-hidden"
    >
      {/* Fill the first screen under sticky chrome (banner + donate + nav),
          without a tall empty red field. Header stack is ~13.5rem on desktop. */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-7xl flex items-center py-6 sm:py-7 lg:py-8">
        <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-6 lg:gap-10 items-center w-full">
          {/* Copy column */}
          <div className="hero-stagger min-w-0">
            <h1
              id="oa-hero"
              className="hero-item text-balance break-words text-[clamp(1.65rem,3.6vw,2.85rem)] leading-[1.15] uppercase"
            >
              Living With Arthritis UK
              <span className="mt-1.5 block text-[0.42em] sm:text-[0.38em] font-semibold tracking-[0.12em] normal-case">
                Evidence-based health guides
              </span>
            </h1>

            <p className="hero-item speakable-intro mt-4 text-sm lg:text-[0.95rem] font-medium max-w-lg leading-relaxed">
              Living with joint pain is exhausting — the stiff mornings, the cancelled plans,
              the feeling that nobody quite gets it. You are not alone.
            </p>


            <div className="hero-item mt-5 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 min-w-0">
              <Link
                to="/guides/newly-diagnosed"
                onClick={() =>
                  trackStartHereCard("Start your gentle plan", "/guides/newly-diagnosed")
                }
                className="btn-map btn-map-dark group w-full sm:w-auto justify-center min-h-11"
              >
                <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
                Start your gentle plan
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                to="/donate"
                onClick={() => trackDonationClick({ source: "home_hero" })}
                className="btn-map w-full sm:w-auto justify-center min-h-11"
                style={{ background: "white", color: "hsl(var(--foreground))" }}
              >
                Donate — keep it free
              </Link>
            </div>
            <p className="hero-item mt-3">
              <a
                href="#start-here"
                onClick={scrollToStartHere}
                className="text-sm font-semibold underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-sm"
              >
                Find your starting point
              </a>
            </p>

            <nav
              aria-label="Popular guides"
              className="hero-item mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm"
            >
              <span className="font-semibold">Popular:</span>
              <Link to="/conditions/knee-arthritis" className="font-semibold underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-sm">Knee exercises</Link>
              <span aria-hidden="true" className="opacity-50">·</span>
              <Link to="/diet" className="font-semibold underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-sm">Anti-inflammatory diet</Link>
              <span aria-hidden="true" className="opacity-50">·</span>
              <Link to="/guides/arthritis-pain-relief" className="font-semibold underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-sm">Pain-relief tips</Link>
            </nav>
          </div>

          {/* Octagon image — MAP signature shape, sized to sit in one viewport */}
          <div className="reveal relative aspect-square w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[320px] mx-auto min-w-0">
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
              onError={onCoverImgError}
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
