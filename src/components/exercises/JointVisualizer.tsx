import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowDown } from "lucide-react";

import { JOINT_AREAS, type Joint } from "@/data/jointAreas";

function KneeDiagram() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full select-none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="jv-bone-knee" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--background))" />
          <stop offset="100%" stopColor="hsl(var(--muted))" />
        </linearGradient>
      </defs>
      <g className="text-border" stroke="currentColor" strokeWidth="2">
        {/* thigh bone */}
        <path d="M74,12 Q100,24 126,12 L124,82 Q100,98 76,82 Z" fill="url(#jv-bone-knee)" />
        {/* shin bone */}
        <path d="M74,108 Q100,98 126,108 L118,188 Q100,183 82,188 Z" fill="url(#jv-bone-knee)" />
      </g>
      {/* joint space */}
      <ellipse cx="100" cy="95" rx="34" ry="6" className="text-primary" fill="currentColor" opacity="0.18" />
      {/* kneecap */}
      <circle cx="100" cy="70" r="14" fill="hsl(var(--background))" className="text-primary" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

function HipDiagram() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full select-none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="jv-bone-hip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--background))" />
          <stop offset="100%" stopColor="hsl(var(--muted))" />
        </linearGradient>
      </defs>
      <g className="text-border" stroke="currentColor" strokeWidth="2">
        {/* pelvis */}
        <path d="M30,30 Q100,8 170,30 Q138,72 104,82 Q68,72 30,30 Z" fill="url(#jv-bone-hip)" />
        {/* thigh bone */}
        <path d="M86,104 L66,188 Q90,192 106,188 L110,104 Z" fill="url(#jv-bone-hip)" />
      </g>
      {/* socket */}
      <circle cx="98" cy="90" r="22" className="text-primary" fill="currentColor" opacity="0.15" />
      {/* ball of the thigh bone */}
      <circle cx="98" cy="90" r="15" fill="hsl(var(--background))" className="text-primary" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

interface JointVisualizerProps {
  joint: Joint;
}

/**
 * Lightweight 2.5D SVG joint map: no WebGL, no extra dependencies.
 * Hotspots are real buttons (44px+, aria-pressed, arrow-key navigation),
 * motion only runs when the user has not asked for reduced motion, and
 * every area's text is rendered in the DOM so it is readable without
 * interacting.
 */
export default function JointVisualizer({ joint }: JointVisualizerProps) {
  const areas = JOINT_AREAS[joint];
  const [activeId, setActiveId] = useState(areas[0].id);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const jointName = joint === "knee" ? "knee" : "hip";
  const headingId = `${baseId}-heading`;

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = index;
    if (e.key in keys) next = (index + keys[e.key] + areas.length) % areas.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = areas.length - 1;
    else return;
    e.preventDefault();
    setActiveId(areas[next].id);
    buttons.current[next]?.focus();
  };

  return (
    <section
      aria-labelledby={headingId}
      data-joint-visualizer={joint}
      className="my-10 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-8"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explore the {jointName}</p>
      <h2 id={headingId} className="mb-2 font-display text-2xl font-bold tracking-tight text-foreground">
        Where does your {jointName} hurt?
      </h2>
      <p className="mb-6 max-w-2xl text-base leading-relaxed text-foreground/85">
        Choose an area to see where people often feel it and which exercises in this guide work the muscles around it.
        This is a general guide, not a diagnosis.
      </p>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <div
          role="group"
          aria-label={`Areas of the ${jointName}`}
          className="relative mx-auto aspect-square w-full max-w-[360px] rounded-2xl border border-border bg-gradient-to-b from-background to-muted p-6 shadow-inner"
        >
          {joint === "knee" ? <KneeDiagram /> : <HipDiagram />}
          {areas.map((area, i) => {
            const selected = area.id === activeId;
            return (
              <button
                key={area.id}
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                aria-pressed={selected}
                aria-controls={`${baseId}-${area.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(area.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                style={{ left: `${area.x}%`, top: `${area.y}%` }}
                className={`absolute flex min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring motion-safe:transition-transform motion-safe:duration-150 ${
                  selected ? "z-20 motion-safe:sm:scale-110" : "z-10 motion-safe:hover:scale-105"
                }`}
              >
                <span className="sr-only">{area.name}</span>
                <span
                  aria-hidden="true"
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-background text-xs font-bold shadow-md ${
                    selected ? "bg-primary text-primary-foreground ring-4 ring-primary/25" : "bg-foreground text-background"
                  }`}
                >
                  {i + 1}
                </span>
              </button>
            );
          })}
        </div>

        <div aria-live="polite">
          {areas.map((area, i) => (
            <div key={area.id} id={`${baseId}-${area.id}`} hidden={area.id !== activeId}>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                <span className="mr-2 text-primary">{i + 1}.</span>
                {area.name}
              </h3>
              <p className="mb-4 text-base leading-relaxed text-foreground/85">{area.feel}</p>
              <div className="rounded-xl border-l-4 border-primary bg-muted/60 p-4">
                <p className="mb-2 text-sm font-semibold text-foreground">Exercises in this guide that can help</p>
                <ul className="space-y-1">
                  {area.exercises.map((ex) => (
                    <li key={ex.anchor}>
                      <a
                        href={`#${ex.anchor}`}
                        className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-primary underline underline-offset-2"
                      >
                        <ArrowDown className="h-4 w-4" aria-hidden="true" />
                        Jump to {ex.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <p className="mt-4 text-sm text-foreground/80">
            Sudden severe pain, a hot swollen joint or feeling unwell?{" "}
            <a href="#progression-and-red-flags" className="font-semibold text-primary underline underline-offset-2">
              Check when to get medical help
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
