import { Users, BookOpen, HeartPulse } from "lucide-react";

/**
 * MAP-style "Our Impact" stat blocks.
 * Three coloured panels — teal tint, deep green, MAP red — with huge
 * Anton numerals and bold labels. Contrast tuned for AA.
 */
const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Visitors helped each month",
    desc: "People across the UK using our guides to manage arthritis at home.",
    bg: "bg-[hsl(199_45%_75%)]",
    fg: "text-foreground",
    iconBg: "bg-primary text-white",
  },
  {
    icon: BookOpen,
    value: "200+",
    label: "Clinically reviewed guides",
    desc: "Plain-English articles covering exercise, diet, medication and self-management.",
    bg: "bg-[hsl(150_25%_30%)]",
    fg: "text-white",
    iconBg: "bg-white text-[hsl(150_25%_30%)]",
  },
  {
    icon: HeartPulse,
    value: "60+",
    label: "Conditions covered",
    desc: "From osteoarthritis to rare inflammatory diseases — written for the UK.",
    bg: "bg-primary",
    fg: "text-white",
    iconBg: "bg-white text-primary",
  },
];

export default function ImpactStats() {
  return (
    <section
      aria-labelledby="impact-heading"
      className="bg-[hsl(34_40%_90%)] py-16 md:py-24"
    >
      <div className="container mx-auto px-5 md:px-10 max-w-6xl">
        <header className="mb-10 md:mb-12 max-w-3xl">
          <h2
            id="impact-heading"
            className="font-display uppercase tracking-tight text-4xl md:text-6xl text-foreground leading-[0.95]"
          >
            Our impact
          </h2>
          <p className="mt-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            We deliver lasting change. Our work brings tangible, free support
            to people living with arthritis across the UK.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {stats.map(({ icon: Icon, value, label, desc, bg, fg, iconBg }) => (
            <div key={label} className={`${bg} ${fg} p-6 md:p-8 flex flex-col gap-4 min-h-[260px]`}>
              <span className={`${iconBg} w-12 h-12 inline-flex items-center justify-center`}>
                <Icon className="w-6 h-6" />
              </span>
              <p className={`font-display text-5xl md:text-6xl tracking-tight leading-none ${fg}`}>
                {value}
              </p>
              <p className={`font-bold text-base md:text-lg leading-snug ${fg}`}>{label}</p>
              <p className={`text-sm leading-relaxed ${fg === "text-white" ? "text-white" : "text-foreground"}`}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
