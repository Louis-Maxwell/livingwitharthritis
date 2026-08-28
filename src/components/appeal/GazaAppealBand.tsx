import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { gazaAppealHero } from "@/data/images";
import { trackDonationClick } from "@/lib/ga-events";

/**
 * Homepage urgent-appeal band for the Palestine & Gaza rehabilitation appeal.
 * Empathy-led: image, human copy, two clear giving routes. No fabricated
 * totals, countdowns or supporter counts.
 */
export default function GazaAppealBand() {
  return (
    <section
      aria-labelledby="gaza-band-heading"
      className="relative overflow-hidden bg-foreground"
    >
      <img
        src={gazaAppealHero}
        alt="Hands held together in support, symbolising solidarity with families in Palestine"
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35" />

      <div className="relative container mx-auto px-6 md:px-10 py-14 md:py-20 max-w-4xl">
        <p className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]">
          <Heart className="w-3.5 h-3.5" aria-hidden="true" />
          Urgent appeal
        </p>

        <h2
          id="gaza-band-heading"
          className="mt-5 font-display uppercase tracking-tight text-3xl md:text-5xl text-white leading-[0.98]"
        >
          Palestine: rebuilding bodies broken by war
        </h2>

        <p className="mt-4 max-w-2xl text-base md:text-lg text-white/90 leading-relaxed">
          In Gaza, thousands of people are living with crushed joints, amputations
          and untreated pain, with almost nowhere left to receive rehabilitation.
          Your Zakat and Sadaqah fund the physiotherapy and pain care that helps a
          survivor stand, walk and hold their child again.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/zakat-appeal"
            onClick={() => trackDonationClick({ source: "gaza_home_band" })}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 font-bold uppercase tracking-[0.08em] text-sm hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
          >
            Donate now <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            to="/zakat-appeal#zakat"
            onClick={() => trackDonationClick({ source: "gaza_home_band_zakat" })}
            className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/40 px-6 py-3.5 font-bold uppercase tracking-[0.08em] text-sm hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
          >
            Give your Zakat
          </Link>
        </div>
      </div>
    </section>
  );
}
