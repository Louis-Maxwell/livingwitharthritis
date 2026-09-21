import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import GoFundMeAnchor from "@/components/GoFundMeAnchor";
import { photoBreakCommunity, photoBreakActive, videoCtaExercise } from "@/data/images";

/**
 * MAP-inspired "How you can help" mosaic.
 * One feature card on the left, two stacked side cards on the right.
 * Cream surface, Anton headlines, dark body copy for AA contrast.
 */
export default function HowYouCanHelp() {
  return (
    <section
      id="involved"
      aria-labelledby="hych-heading"
      className="bg-[hsl(34_45%_92%)] py-16 md:py-24"
    >
      <div className="container mx-auto px-5 md:px-10 max-w-6xl">
        <header className="mb-10 md:mb-12 max-w-3xl">
          <h2
            id="hych-heading"
            className="font-display uppercase tracking-tight text-4xl md:text-6xl text-foreground leading-[0.95]"
          >
            How you can help
          </h2>
          <p className="mt-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            We couldn’t do what we do without you. Whether it’s a one-off
            donation, sharing a guide, or pledging support — together we make
            free, clinically reviewed arthritis care possible.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          {/* Feature card */}
          <GoFundMeAnchor
            source="home_how_you_can_help"
            className="group relative lg:col-span-7 block overflow-hidden min-h-[360px] md:min-h-[460px] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
          >
            <img
              src={photoBreakCommunity}
              alt="Older adults supporting each other in a community setting"
              width={800}
              height={600}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
            <div className="relative h-full flex flex-col justify-end p-6 md:p-10 text-white">
              <h3 className="font-display uppercase text-3xl md:text-5xl tracking-tight leading-[0.95]">
                Donate today
              </h3>
              <p className="mt-3 max-w-xl text-sm md:text-base text-white/95 leading-relaxed">
                One in six adults in the UK live with arthritis. Your gift
                keeps every guide, plan and helpline reply free for them.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 self-start bg-primary text-primary-foreground px-5 py-3 font-bold uppercase tracking-[0.08em] text-sm">
                Donate on GoFundMe <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </GoFundMeAnchor>

          {/* Side cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 md:gap-6">
            {[
              {
                title: "Share your story",
                desc: "Help others feel less alone. Tell us how arthritis shapes your day and we’ll publish it.",
                img: photoBreakActive,
                href: "/community",
              },
              {
                title: "Volunteer with us",
                desc: "From peer support to fundraising — find a role that fits your week.",
                img: videoCtaExercise,
                href: "/volunteer",
              },
            ].map((c) => (
              <Link
                key={c.title}
                to={c.href}
                className="group flex gap-4 bg-white p-4 md:p-5 hover:shadow-xl transition-shadow focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
              >
                <img
                  src={c.img}
                  alt=""
                  aria-hidden="true"
                  width={128}
                  height={128}
                  className="w-28 h-28 md:w-32 md:h-32 object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <h3 className="font-display uppercase text-xl md:text-2xl tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors">
                    {c.title} <ArrowRight className="inline w-4 h-4" />
                  </h3>
                  <p className="mt-2 text-sm text-foreground/85 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
