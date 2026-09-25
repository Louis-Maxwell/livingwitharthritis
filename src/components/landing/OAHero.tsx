import { memo, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown, HeartPulse } from "lucide-react";
import { onCoverImgError } from "@/lib/articleImages";
import { trackStartHereCard } from "@/lib/ga-events";

/**
 * Homepage hero — customer-first.
 *
 * - One H1 (brand line kept for branded search, audience line visually primary).
 * - Exactly one primary action (pain relief — the most urgent visitor job)
 *   and one secondary action (jump to the visitor-job router below).
 * - No entrance animation on the copy or the LCP image: both paint on first
 *   frame instead of waiting for a fade-in or an IntersectionObserver.
 */

const ROUTER_ID = "find-help";

const scrollToRouter = (event: MouseEvent<HTMLAnchorElement>) => {
  const target = document.getElementById(ROUTER_ID);
  if (!target) return;
  event.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  // Move focus for keyboard / screen-reader users without a second scroll.
  const heading = target.querySelector<HTMLElement>("h2");
  heading?.focus({ preventScroll: true });
};

// Hero photo, compressed locally to WebP at 400/800 square variants so the
// LCP element stays tiny on mobile (~14KB at 400w). Preloaded in index.html.
const HERO_IMG = "/openverse/hero-friends-800.webp";
const HERO_SRCSET = "/openverse/hero-friends-400.webp 400w, /openverse/hero-friends-800.webp 800w";
const HERO_SIZES = "(min-width: 1024px) 300px, (min-width: 640px) 240px, 160px";

const OAHero = memo(() => (
  <section aria-labelledby="oa-hero" className="band-red relative w-full max-w-full overflow-hidden">
    <div className="container mx-auto px-5 sm:px-8 lg:px-16 max-w-7xl py-7 sm:py-9 lg:py-12">
      <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-6 lg:gap-12 items-center w-full">
        <div className="min-w-0">
          <h1 id="oa-hero" className="text-balance break-words leading-[1.12]">
            <span className="block text-[0.7rem] sm:text-sm font-bold uppercase tracking-[0.08em] sm:tracking-[0.16em] opacity-95">
              Living With Arthritis UK — evidence-based health guides
            </span>
            <span className="mt-2 sm:mt-3 block text-[clamp(1.6rem,4.2vw,3rem)]">
              Free, physio-reviewed help for people living with arthritis — and those who care
              for them
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-base lg:text-lg font-medium max-w-xl leading-relaxed">
            Stiff mornings, cancelled plans, the feeling that nobody quite gets it. Find
            practical help with pain, exercise, benefits and everyday life — written for UK
            readers.
          </p>

          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 min-w-0">
            <Link
              to="/guides/arthritis-pain-relief"
              onClick={() =>
                trackStartHereCard("Hero: I'm in pain — help now", "/guides/arthritis-pain-relief")
              }
              className="btn-map group w-full sm:w-auto justify-center min-h-12 shadow-md focus-visible:outline-white"
              style={{ background: "white", color: "hsl(var(--foreground))" }}
            >
              <HeartPulse className="w-4 h-4 mr-2" aria-hidden="true" />
              I&apos;m in pain — help now
              <ArrowRight
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </Link>
            <a
              href={`#${ROUTER_ID}`}
              onClick={(e) => {
                trackStartHereCard("Hero: find help for my situation", `#${ROUTER_ID}`);
                scrollToRouter(e);
              }}
              className="btn-map w-full sm:w-auto justify-center min-h-12 border-2 border-white/90 bg-transparent text-white hover:bg-white/10 focus-visible:outline-white"
            >
              Find help for my situation
              <ArrowDown className="w-4 h-4 ml-2" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-4 text-sm opacity-95 max-w-xl">
            Educational information only — not a diagnosis or personal medical advice. If
            you are worried about sudden or severe symptoms, contact your GP or NHS 111.
          </p>
        </div>

        {/* Octagon image — MAP signature shape. Sits after the copy on mobile
            (small) so the CTAs stay above the fold. `sizes` must stay in sync
            with the <link rel="preload" imagesizes> in index.html. */}
        <div className="relative aspect-square w-full max-w-[160px] sm:max-w-[240px] lg:max-w-[300px] mx-auto lg:mx-0 lg:justify-self-end min-w-0">
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
            className="clip-octagon w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
));

OAHero.displayName = "OAHero";
export default OAHero;
