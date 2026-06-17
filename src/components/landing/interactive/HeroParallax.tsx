import { useEffect, useRef, useState } from "react";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * HeroParallax — scroll-pinned editorial hero for the new interactive
 * landing page. BRC red accent, parallax photo band, headline reveal.
 * No third-party motion library — IntersectionObserver + transform only.
 */
export default function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setOffset(Math.min(y * 0.35, 220));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-background border-b border-border/30"
      aria-label="Living With Arthritis UK"
    >
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          backgroundImage:
            "radial-gradient(ellipse at 70% 20%, hsl(var(--primary) / 0.35), transparent 60%), radial-gradient(ellipse at 10% 80%, hsl(var(--primary) / 0.18), transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 lg:px-10 max-w-[1280px] py-20 lg:py-32 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 relative">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-6">
            <span className="w-6 h-px bg-primary" />
            Living With Arthritis UK
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[4.25rem] leading-[1.04] tracking-[-0.025em] font-bold text-foreground">
            The plan for arthritis,{" "}
            <span className="relative inline-block">
              <span className="relative z-10">free for everyone.</span>
              <span
                className="absolute left-0 -bottom-1 w-full h-[10px] bg-primary/20 -z-0"
                aria-hidden="true"
              />
            </span>
          </h1>
          <p className="mt-7 text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Clinically reviewed movement, nutrition and pain-relief guidance —
            written in plain English, made for everyone in the UK living with
            arthritis.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#quick-check"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
            >
              Take the 60-second check
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-md border border-border bg-card text-foreground font-semibold hover:border-primary/40 hover:text-primary transition-colors"
            >
              <HeartHandshake className="w-4 h-4" />
              Donate
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {[
              { k: "8.75M", v: "adults in the UK" },
              { k: "1 in 6", v: "live with arthritis" },
              { k: "100%", v: "free guides" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                  {s.k}
                </dt>
                <dd className="text-xs text-muted-foreground mt-1 leading-snug">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80&auto=format&fit=crop"
              alt="Older adult walking outdoors, supported and confident"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-primary-foreground">
              <p className="text-xs uppercase tracking-[0.2em] opacity-90">
                Clinically reviewed
              </p>
              <p className="mt-1 text-sm font-medium">
                HCPC physiotherapists · CSP members · NICE-aligned
              </p>
            </div>
          </div>
          <div
            className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-primary/15 blur-2xl -z-10"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
