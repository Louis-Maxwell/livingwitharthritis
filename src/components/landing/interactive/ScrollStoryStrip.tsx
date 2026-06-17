import { useEffect, useRef, useState } from "react";

const PANELS = [
  {
    tag: "01 · The problem",
    title: "8.75 million people. One quiet crisis.",
    body: "Arthritis costs the UK over £10 billion a year and leaves millions waiting months for help. Pain doesn't pause for a waiting list.",
  },
  {
    tag: "02 · The plan",
    title: "Move. Eat. Rest. Connect.",
    body: "Four evidence-based pillars, written in plain English, reviewed by HCPC physiotherapists — so you can act today.",
  },
  {
    tag: "03 · The proof",
    title: "Aligned to NICE. Trusted by clinicians.",
    body: "Every guide cites the source. Every exercise is graded by joint and pain level. No fluff, no fads, no paywalls.",
  },
  {
    tag: "04 · The pledge",
    title: "Free, forever, for everyone.",
    body: "We're a charity. Donations keep clinical reviewers paid and every page open to anyone who needs it.",
  },
];

export default function ScrollStoryStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const panels = containerRef.current?.querySelectorAll<HTMLElement>("[data-panel]");
    if (!panels?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    panels.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-card border-y border-border/40"
      aria-label="Our approach"
    >
      <div className="container mx-auto px-6 lg:px-10 max-w-[1280px] grid lg:grid-cols-12 gap-10">
        {/* Sticky rail */}
        <aside className="lg:col-span-5 hidden lg:block">
          <div className="sticky top-24 py-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-4">
              How we work
            </p>
            <h2 className="font-display text-4xl xl:text-5xl font-bold text-foreground leading-[1.05] tracking-[-0.02em]">
              A plan you can hold,{" "}
              <span className="text-primary">in four steps.</span>
            </h2>
            <ol className="mt-10 space-y-3">
              {PANELS.map((p, i) => (
                <li
                  key={p.tag}
                  className={`flex items-baseline gap-3 text-sm transition-colors ${
                    i === activeIndex ? "text-foreground" : "text-muted-foreground/60"
                  }`}
                >
                  <span
                    className={`w-8 h-px transition-all ${
                      i === activeIndex ? "bg-primary w-12" : "bg-border"
                    }`}
                  />
                  <span className="font-semibold">{p.tag}</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        {/* Scrolling panels */}
        <div className="lg:col-span-7 py-16 lg:py-24 space-y-16 lg:space-y-32">
          {PANELS.map((p, i) => (
            <article
              key={p.tag}
              data-panel
              data-idx={i}
              className={`transition-all duration-700 ${
                i === activeIndex ? "opacity-100 translate-y-0" : "opacity-60 translate-y-2"
              }`}
            >
              <p className="lg:hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-3">
                {p.tag}
              </p>
              <h3 className="font-display text-2xl lg:text-4xl font-bold text-foreground tracking-[-0.015em] leading-[1.15]">
                {p.title}
              </h3>
              <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
