import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/useReveal";
import "@/components/HeroSection.css";

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
              className="reveal hero-item text-balance text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] uppercase"
            >
              We work to uphold UK arthritis health and dignity.
            </h1>

            <p className="reveal hero-item mt-8 text-lg lg:text-xl max-w-xl opacity-95 leading-relaxed">
              Millions of people across the UK live with arthritis pain and stiffness.
              Living With Arthritis provides clinically-reviewed guidance, exercise plans and
              nutrition support — free, for everyone.
            </p>

            <div className="reveal hero-item mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
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
              className="reveal hero-item mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] opacity-90"
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

            <p className="reveal hero-item mt-4 text-xs opacity-80">
              Learn about our{" "}
              <Link to="/editorial-standards" className="underline hover:no-underline font-medium">
                medical review process and editorial standards
              </Link>
              .
            </p>

            <nav
              aria-label="Popular guides"
              className="reveal hero-item mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
            >
              <span className="font-semibold opacity-90">Popular:</span>
              <a href="/conditions/knee-arthritis" className="font-semibold underline underline-offset-4 hover:no-underline">Knee exercises</a>
              <span aria-hidden="true" className="opacity-50">·</span>
              <a href="/diet" className="font-semibold underline underline-offset-4 hover:no-underline">Anti-inflammatory diet</a>
              <span aria-hidden="true" className="opacity-50">·</span>
              <a href="/guides/arthritis-pain-relief" className="font-semibold underline underline-offset-4 hover:no-underline">Pain-relief tips</a>
            </nav>
          </div>

          {/* Octagon image — MAP signature shape */}
          <div className="reveal relative aspect-square w-full max-w-[560px] mx-auto">
            <picture>
              <source srcSet="/hero/oa.avif" type="image/avif" />
              <source srcSet="/hero/oa.webp" type="image/webp" />
              <img
                src="/hero/oa.jpg"
                alt="An older couple stretching together at home, smiling — living well with osteoarthritis."
                width={1080}
                height={1080}
                fetchPriority="high"
                decoding="async"
                loading="eager"
                className="clip-octagon w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
});

OAHero.displayName = "OAHero";
export default OAHero;
