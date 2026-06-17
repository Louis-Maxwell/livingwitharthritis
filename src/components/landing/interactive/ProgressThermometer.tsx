import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HeartHandshake } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Totals {
  monthToDate: number;
  goal: number;
  donorCount: number;
}

const FALLBACK: Totals = { monthToDate: 0, goal: 5000, donorCount: 0 };

export default function ProgressThermometer() {
  const [totals, setTotals] = useState<Totals>(FALLBACK);
  const [animatedPct, setAnimatedPct] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.functions
      .invoke<Totals>("donation-totals", { method: "GET" })
      .then(({ data }) => {
        if (data && typeof data.monthToDate === "number") setTotals(data);
      })
      .catch(() => {
        /* keep fallback */
      });
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const target = Math.min((totals.monthToDate / totals.goal) * 100, 100);
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let v = 0;
          const start = performance.now();
          const step = (t: number) => {
            const p = Math.min((t - start) / 1400, 1);
            v = target * (1 - Math.pow(1 - p, 3));
            setAnimatedPct(v);
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [totals]);

  return (
    <section className="bg-background py-20 lg:py-28 border-b border-border/30" ref={sectionRef}>
      <div className="container mx-auto px-6 lg:px-10 max-w-[1100px]">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-3">
              This month
            </p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground tracking-[-0.02em] leading-[1.1]">
              Keep every guide free.
            </h2>
            <p className="mt-4 text-base lg:text-lg text-muted-foreground max-w-xl">
              Every pound funds clinical reviewers and writers so the plan stays
              open for anyone who needs it.
            </p>

            <div className="mt-8">
              <div className="flex items-end justify-between mb-2">
                <p className="font-display text-3xl lg:text-4xl font-bold text-foreground tabular-nums">
                  £{Math.round(totals.monthToDate).toLocaleString("en-GB")}
                </p>
                <p className="text-sm text-muted-foreground">
                  of £{totals.goal.toLocaleString("en-GB")} goal
                </p>
              </div>
              <div className="relative h-4 rounded-full bg-muted overflow-hidden border border-border">
                <div
                  className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-300 ease-out rounded-full"
                  style={{ width: `${animatedPct}%` }}
                  role="progressbar"
                  aria-valuenow={Math.round(animatedPct)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              {totals.donorCount > 0 && (
                <p className="mt-3 text-xs text-muted-foreground">
                  {totals.donorCount.toLocaleString("en-GB")} donors this month — thank you.
                </p>
              )}
            </div>

            <Link
              to="/donate"
              className="mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shadow-md"
            >
              <HeartHandshake className="w-4 h-4" />
              Donate now
            </Link>
          </div>

          <div className="lg:col-span-5">
            <blockquote className="border-l-2 border-primary pl-6 italic text-lg lg:text-xl text-foreground leading-relaxed">
              "Reliable, plain-English arthritis guidance shouldn't sit behind a
              paywall. Your donation keeps it open."
              <footer className="mt-4 not-italic text-sm text-muted-foreground font-normal">
                — The editorial board
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
