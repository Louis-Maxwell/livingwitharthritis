import { Link } from "react-router-dom";
import { Activity, HandHelping, MessageCircle } from "lucide-react";

const TOOLS = [
  {
    title: "Symptom checker",
    desc: "Five gentle questions that point you to relevant guides — not a diagnosis.",
    href: "/symptom-checker",
    Icon: Activity,
  },
  {
    title: "Self-help tool",
    desc: "Interactive joint diagram with practical first steps for common aches.",
    href: "/self-help",
    Icon: HandHelping,
  },
  {
    title: "Chat",
    desc: "Ask our educational chatbot about exercises, diet, flares and PIP.",
    href: "/chat",
    Icon: MessageCircle,
  },
] as const;

export default function HomeToolsBand() {
  return (
    <section
      aria-labelledby="home-tools-heading"
      className="py-12 md:py-16 bg-muted/30 border-y border-border/40"
    >
      <div className="container mx-auto max-w-6xl px-5 md:px-10">
        <div className="text-center mb-8">
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-2">
            Tools
          </p>
          <h2
            id="home-tools-heading"
            className="font-display font-bold text-2xl md:text-3xl text-foreground"
          >
            Practical tools to get unstuck
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-sm md:text-base">
            Free, educational helpers — use them alongside advice from your NHS team.
          </p>
        </div>
        <ul className="grid sm:grid-cols-3 gap-4">
          {TOOLS.map(({ title, desc, href, Icon }) => (
            <li key={href}>
              <Link
                to={href}
                className="group flex h-full flex-col rounded-xl border border-border/40 bg-card p-5 hover:border-primary/50 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span
                  className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {title}
                </span>
                <span className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
