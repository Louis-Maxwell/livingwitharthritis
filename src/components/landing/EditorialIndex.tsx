/**
 * EditorialIndex
 * A magazine-style "In this issue" table of contents — numbered chapters
 * with anchor links to the page's key sections. Inspired by FT/Economist/
 * Wellcome editorial layouts.
 */

import { memo } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Chapter = {
  no: string;
  title: string;
  desc: string;
  href: string; // "#anchor" = same-page scroll, "/route" = navigate
};

const CHAPTERS: Chapter[] = [
  {
    no: "I",
    title: "Begin with movement",
    desc: "Clinician-built physiotherapy, free at the point of use.",
    href: "/exercises",
  },
  {
    no: "II",
    title: "Eat to soften pain",
    desc: "Mediterranean nutrition plans backed by NICE-aligned guidance.",
    href: "/diet",
  },
  {
    no: "III",
    title: "Talk to the assistant",
    desc: "24/7 evidence-based answers, transparent and UK GDPR-safe.",
    href: "/chat",
  },
  {
    no: "IV",
    title: "Track and triage",
    desc: "Map flares, log symptoms, and arrive at appointments prepared.",
    href: "/self-help",
  },
  {
    no: "V",
    title: "Read lived experience",
    desc: "Real stories from people across England, Scotland, Wales and NI.",
    href: "/stories",
  },
  {
    no: "VI",
    title: "Power the next chapter",
    desc: "Donor-funded since day one. Every pound is published.",
    href: "/donate",
  },
];

const EditorialIndex = memo(() => {
  const navigate = useNavigate();

  const handleNav = (href: string) => {
    if (href.startsWith("#")) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
  };

  return (
    <section
      aria-labelledby="editorial-index"
      className="relative border-y border-foreground/10 bg-background"
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-24 lg:py-28">
        {/* Masthead */}
        <div className="flex flex-wrap items-end justify-between gap-6 pb-10 mb-12 border-b border-foreground/10">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[10px] sm:text-[11px] font-bold tracking-[0.32em] uppercase text-primary mb-5">
              <span className="w-8 h-px bg-primary" aria-hidden="true" />
              In this issue
            </p>
            <h2
              id="editorial-index"
              className="font-display text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] leading-[1.05] tracking-[-0.025em] text-foreground text-balance"
            >
              Six chapters.
              <span className="block text-muted-foreground">
                One movement.
              </span>
            </h2>
          </div>
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-muted-foreground">
            Curated · Volume I
          </p>
        </div>

        {/* Chapters list */}
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10">
          {CHAPTERS.map((c) => (
            <li key={c.no} className="bg-background">
              <button
                type="button"
                onClick={() => handleNav(c.href)}
                className="group relative w-full text-left p-7 sm:p-8 lg:p-10 h-full flex flex-col hover:bg-primary/[0.025] transition-colors duration-300 cursor-pointer"
              >
                {/* Roman numeral */}
                <p className="font-display text-[11px] font-bold tracking-[0.32em] uppercase text-primary/70 mb-6">
                  Chapter {c.no}
                </p>

                <h3 className="font-display text-xl sm:text-2xl lg:text-[1.625rem] leading-[1.18] tracking-[-0.015em] text-foreground mb-3 pr-8">
                  {c.title}
                </h3>

                <p className="text-[13.5px] text-muted-foreground leading-relaxed mb-6 flex-1">
                  {c.desc}
                </p>

                {/* Read marker */}
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.24em] uppercase text-foreground/70 group-hover:text-primary transition-colors duration-300">
                  Read chapter
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>

                {/* Magazine-style top-right corner bracket on hover */}
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/40 transition-colors duration-300"
                />
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
});

EditorialIndex.displayName = "EditorialIndex";
export default EditorialIndex;
