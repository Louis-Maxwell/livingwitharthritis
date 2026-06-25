/**
 * text.com stat-card pattern: oversized number + concise label.
 * Repurposed as charity impact stats (no fabricated revenue figures).
 */
const stats = [
  { value: "8.75M", label: "UK adults living with osteoarthritis" },
  { value: "100+", label: "Plain-English guides, clinically reviewed" },
  { value: "10", label: "Joint-specific exercise libraries with video" },
  { value: "£0", label: "Cost to access every resource on the site" },
];

const StatGrid = () => {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-background p-8 md:p-10 flex flex-col items-start"
            >
              <span
                className="font-display font-black text-foreground leading-[0.85] tracking-[-0.04em]"
                style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
              >
                {s.value}
              </span>
              <span className="mt-4 font-sans text-sm md:text-base text-foreground/70 max-w-[14rem]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatGrid;
