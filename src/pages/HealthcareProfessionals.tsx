import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import PageHero from "@/components/ui/PageHero";
import { CHARITY } from "@/config/charity";

const PATH = "/healthcare-professionals";

const CLINIC_LINKS = [
  {
    title: "Clinic pack (waiting-room one-pager)",
    desc: "Printable QR links to exercises, flares, PIP and newly diagnosed guides.",
    href: "/resources/clinic-pack",
  },
  {
    title: "Flare action plan",
    desc: "Patient-facing flare worksheet you can share or print.",
    href: "/resources/flare-action-plan",
  },
  {
    title: "PIP evidence diary",
    desc: "Structured diary template for patients gathering PIP evidence.",
    href: "/resources/pip-evidence-diary",
  },
] as const;

const SHAREABLE = [
  { title: "Newly diagnosed checklist", href: "/guides/newly-diagnosed" },
  { title: "Exercise hub", href: "/exercises" },
  { title: "Diet hub", href: "/diet" },
  { title: "Benefits & PIP hub", href: "/benefits-pip" },
  { title: "Symptom checker (educational)", href: "/symptom-checker" },
  { title: "Osteoarthritis guide", href: "/conditions/osteoarthritis" },
  { title: "Rheumatoid arthritis guide", href: "/conditions/rheumatoid-arthritis" },
  { title: "Editorial standards", href: "/editorial-standards" },
] as const;

/**
 * Thin HCP aggregator — compiles existing routes only (P1-08).
 * No new clinical content invented here.
 */
export default function HealthcareProfessionals() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Healthcare professionals"
        description="Free clinic pack, shareable patient guides and educational tools from Living With Arthritis UK for physiotherapists, GPs and rheumatology teams. Charity 1218461."
        path={PATH}
      />
      <Header />
      <main id="main-content" role="main" tabIndex={-1}>
        <PageHero
          badge="For healthcare professionals"
          title="Shareable patient resources for clinic and waiting rooms"
          subtitle={`Educational UK guides reviewed by Louis Maxwell (HCPC PH128483). Independent charity ${CHARITY.number} — not a diagnosis service, and independent of Arthritis UK.`}
        />

        <section
          aria-labelledby="hcp-clinic-heading"
          className="container mx-auto max-w-4xl px-6 md:px-10 pb-12"
        >
          <h2
            id="hcp-clinic-heading"
            className="font-display text-2xl font-bold text-foreground mb-4"
          >
            Clinic materials
          </h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {CLINIC_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="flex h-full flex-col rounded-xl border border-border/50 bg-card p-5 hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <span className="font-semibold text-foreground">{item.title}</span>
                  <span className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="hcp-share-heading"
          className="bg-muted/30 border-y border-border/40 py-12"
        >
          <div className="container mx-auto max-w-4xl px-6 md:px-10">
            <h2
              id="hcp-share-heading"
              className="font-display text-2xl font-bold text-foreground mb-2"
            >
              Shareable patient pages
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
              Existing plain-English guides patients can open on a phone after a consultation.
              Tone is educational — please continue usual clinical care.
            </p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {SHAREABLE.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="block rounded-lg border border-border/40 bg-card px-4 py-3 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="hcp-contact-heading"
          className="container mx-auto max-w-4xl px-6 md:px-10 py-12"
        >
          <h2
            id="hcp-contact-heading"
            className="font-display text-2xl font-bold text-foreground mb-3"
          >
            Talks, clinics and feedback
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-4">
            If you would like printable packs for a waiting room, a short teaching session,
            or to flag a clinical accuracy concern, email us — a real person replies within
            two working days.
          </p>
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Contact Living With Arthritis UK
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
