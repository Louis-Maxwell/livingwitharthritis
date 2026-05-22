/**
 * ConditionPillBand — full-bleed crimson band with pill links to each
 * condition page. Mirrors the AF "Understanding Arthritis" section.
 */
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CONDITIONS = [
  { name: "Osteoarthritis", href: "/conditions/osteoarthritis" },
  { name: "Rheumatoid Arthritis", href: "/conditions/rheumatoid-arthritis" },
  { name: "Psoriatic Arthritis", href: "/conditions/psoriatic-arthritis" },
  { name: "Gout", href: "/conditions/gout" },
  { name: "Ankylosing Spondylitis", href: "/conditions/ankylosing-spondylitis" },
  { name: "Juvenile Arthritis", href: "/conditions/juvenile-arthritis" },
  { name: "Fibromyalgia", href: "/conditions/fibromyalgia" },
  { name: "Lupus", href: "/conditions/lupus" },
];

const ConditionPillBand = () => {
  return (
    <section
      aria-labelledby="conditions-band-heading"
      className="bg-primary text-primary-foreground py-20 lg:py-24"
    >
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-16">
        <div className="mb-10 lg:mb-14 max-w-2xl">
          <h2
            id="conditions-band-heading"
            className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-balance"
          >
            Understanding arthritis
          </h2>
          <p className="mt-3 text-base lg:text-lg text-primary-foreground/80 leading-relaxed">
            Learn what to expect from your condition, plus practical tips to
            help you manage it and other useful information.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {CONDITIONS.map((c) => (
            <li key={c.href}>
              <Link
                to={c.href}
                className="block text-center px-5 py-4 rounded-lg bg-primary-foreground/5 border border-primary-foreground/30 text-sm lg:text-base font-semibold hover:bg-primary-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-end">
          <Link
            to="/conditions/osteoarthritis"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground hover:gap-3 transition-all"
          >
            See all arthritis types
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConditionPillBand;
