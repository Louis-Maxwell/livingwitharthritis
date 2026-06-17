import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface Joint {
  id: string;
  label: string;
  cx: number;
  cy: number;
  href: string;
  blurb: string;
}

const JOINTS: Joint[] = [
  { id: "neck", label: "Neck", cx: 100, cy: 52, href: "/exercises/neck", blurb: "Gentle mobility for stiff necks." },
  { id: "shoulder-l", label: "Shoulder", cx: 75, cy: 78, href: "/exercises/shoulder", blurb: "Restore range without flare-ups." },
  { id: "shoulder-r", label: "Shoulder", cx: 125, cy: 78, href: "/exercises/shoulder", blurb: "Restore range without flare-ups." },
  { id: "elbow-l", label: "Elbow", cx: 60, cy: 122, href: "/exercises/elbow", blurb: "Reduce strain, build control." },
  { id: "elbow-r", label: "Elbow", cx: 140, cy: 122, href: "/exercises/elbow", blurb: "Reduce strain, build control." },
  { id: "wrist-l", label: "Wrist", cx: 50, cy: 168, href: "/exercises/wrist", blurb: "Mobility for typing & lifting." },
  { id: "wrist-r", label: "Wrist", cx: 150, cy: 168, href: "/exercises/wrist", blurb: "Mobility for typing & lifting." },
  { id: "hand-l", label: "Hand", cx: 44, cy: 192, href: "/exercises/hand", blurb: "Grip strength & finger flex." },
  { id: "hand-r", label: "Hand", cx: 156, cy: 192, href: "/exercises/hand", blurb: "Grip strength & finger flex." },
  { id: "spine", label: "Spine", cx: 100, cy: 145, href: "/exercises/spine", blurb: "Core support for back pain." },
  { id: "hip-l", label: "Hip", cx: 86, cy: 200, href: "/exercises/hip", blurb: "Walk further, with less pain." },
  { id: "hip-r", label: "Hip", cx: 114, cy: 200, href: "/exercises/hip", blurb: "Walk further, with less pain." },
  { id: "knee-l", label: "Knee", cx: 86, cy: 262, href: "/exercises/knee", blurb: "Reduce knee load and pain." },
  { id: "knee-r", label: "Knee", cx: 114, cy: 262, href: "/exercises/knee", blurb: "Reduce knee load and pain." },
  { id: "ankle-l", label: "Ankle", cx: 86, cy: 332, href: "/exercises/ankle", blurb: "Balance & stability work." },
  { id: "ankle-r", label: "Ankle", cx: 114, cy: 332, href: "/exercises/ankle", blurb: "Balance & stability work." },
];

export default function BodyJointPicker() {
  const [active, setActive] = useState<Joint | null>(JOINTS.find((j) => j.id === "knee-l") ?? null);

  return (
    <section className="bg-background py-20 lg:py-28 border-b border-border/30">
      <div className="container mx-auto px-6 lg:px-10 max-w-[1280px]">
        <header className="max-w-2xl mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-3">
            Where does it hurt?
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground tracking-[-0.02em] leading-[1.1]">
            Tap a joint. Get a plan.
          </h2>
          <p className="mt-4 text-base lg:text-lg text-muted-foreground">
            Every joint here has free, clinically-reviewed exercises and pain
            relief guidance. Choose where your pain lives.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex justify-center">
            <svg
              viewBox="0 0 200 380"
              className="w-full max-w-[340px] h-auto"
              role="img"
              aria-label="Human body diagram with selectable joints"
            >
              {/* Body silhouette */}
              <g fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1">
                <circle cx="100" cy="32" r="22" />
                <path d="M 80 54 L 120 54 L 130 78 L 150 110 L 156 170 L 152 200 L 140 200 L 132 145 L 125 200 L 120 280 L 118 340 L 108 340 L 104 260 L 100 200 L 96 260 L 92 340 L 82 340 L 80 280 L 75 200 L 68 145 L 60 200 L 48 200 L 44 170 L 50 110 L 70 78 Z" />
              </g>

              {/* Joint hotspots */}
              {JOINTS.map((j) => {
                const isActive = active?.id === j.id;
                return (
                  <g
                    key={j.id}
                    onClick={() => {
                      setActive(j);
                      trackEvent("joint_picker_click", { joint: j.id });
                    }}
                    onMouseEnter={() => setActive(j)}
                    onFocus={() => setActive(j)}
                    className="cursor-pointer focus:outline-none"
                    tabIndex={0}
                    role="button"
                    aria-label={`${j.label} — view exercises`}
                  >
                    <circle
                      cx={j.cx}
                      cy={j.cy}
                      r={isActive ? 11 : 7}
                      fill="hsl(var(--primary))"
                      opacity={isActive ? 0.25 : 0.18}
                      className="transition-all"
                    />
                    <circle
                      cx={j.cx}
                      cy={j.cy}
                      r={isActive ? 5 : 4}
                      fill="hsl(var(--primary))"
                      className="transition-all"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-border bg-card p-7 lg:p-9 shadow-md min-h-[260px]">
              {active ? (
                <>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-3">
                    Selected
                  </p>
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground tracking-[-0.01em]">
                    {active.label}
                  </h3>
                  <p className="mt-3 text-muted-foreground">{active.blurb}</p>

                  <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    <Link
                      to={active.href}
                      className="inline-flex items-center justify-between gap-2 h-12 px-5 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
                    >
                      Exercises for {active.label.toLowerCase()}
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/conditions/osteoarthritis"
                      className="inline-flex items-center justify-between gap-2 h-12 px-5 rounded-md border border-border bg-background text-foreground font-semibold hover:border-primary/40 hover:text-primary transition"
                    >
                      Understand the condition
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">Choose a joint to begin.</p>
              )}
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Educational only. Always consult your GP or physiotherapist for
              new or worsening symptoms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
