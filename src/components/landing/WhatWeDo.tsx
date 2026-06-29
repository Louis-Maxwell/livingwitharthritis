import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { videoCtaExercise, nutritionMediterranean, photoBreakCommunity } from "@/data/images";

const items = [
  {
    eyebrow: "Movement",
    title: "Exercise & physiotherapy",
    desc: "Joint-by-joint routines built with HCPC-registered physiotherapists — from gentle starter sets to full strength plans.",
    href: "/exercises",
    img: videoCtaExercise,
  },
  {
    eyebrow: "Nutrition",
    title: "Anti-inflammatory diet",
    desc: "Mediterranean-style eating, supplements that actually have evidence, and foods to limit when joints flare.",
    href: "/diet",
    img: nutritionMediterranean,
  },
  {
    eyebrow: "Support",
    title: "Living well with arthritis",
    desc: "Pain, sleep, work, benefits, relationships — practical guides for the parts of life arthritis touches.",
    href: "/living-with-arthritis",
    img: photoBreakCommunity,
  },
];

export default function WhatWeDo() {
  return (
    <section aria-labelledby="wwd-heading" className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-5 md:px-10 max-w-6xl">
        <header className="mb-10 md:mb-12 max-w-3xl">
          <h2
            id="wwd-heading"
            className="font-display uppercase tracking-tight text-4xl md:text-6xl text-foreground leading-[0.95]"
          >
            What we do
          </h2>
          <p className="mt-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            Our mission is to make the best arthritis care free to read,
            understand and act on — for everyone in the UK.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {items.map((it) => (
            <Link
              key={it.title}
              to={it.href}
              className="group bg-white block overflow-hidden hover:shadow-xl transition-shadow focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={it.img}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5 md:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  {it.eyebrow}
                </p>
                <h3 className="mt-2 font-display uppercase text-2xl md:text-3xl tracking-tight text-foreground leading-tight underline underline-offset-4 decoration-2 decoration-primary/40 group-hover:decoration-primary">
                  {it.title} <ArrowRight className="inline w-5 h-5" />
                </h3>
                <p className="mt-3 text-sm md:text-base text-foreground/85 leading-relaxed">
                  {it.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
