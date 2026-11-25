import { Link } from "react-router-dom";

/** Photo-reference red strip, using real routes rather than the former
 * amount/frequency/fund controls whose selections were not passed onward. */
export default function HomeSupportStrip() {
  return (
    <nav aria-label="Support the charity" className="home-support-strip bg-primary text-primary-foreground">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-1.5 text-xs font-semibold sm:gap-x-8">
        <span className="hidden sm:inline">Support Living With Arthritis</span>
        <Link to="/donate" className="inline-flex min-h-11 items-center rounded-full border border-white/70 px-4 font-bold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Donate</Link>
        <Link to="/zakat-appeal" className="inline-flex min-h-11 items-center text-white underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Zakat appeal</Link>
      </div>
    </nav>
  );
}
