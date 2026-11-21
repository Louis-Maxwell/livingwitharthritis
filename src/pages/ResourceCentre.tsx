import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import PageHero from "@/components/ui/PageHero";
import { CHARITY } from "@/config/charity";
import MedicalDisclaimerStrip from "@/components/MedicalDisclaimerStrip";

const PATH = "/resource-centre";

const GROUPS = [
  {
    title: "Guides & starting points",
    links: [
      { title: "Guides hub", href: "/guides" },
      { title: "Newly diagnosed", href: "/guides/newly-diagnosed" },
      { title: "Pain relief guide", href: "/guides/arthritis-pain-relief" },
      { title: "Benefits & PIP hub", href: "/guides/benefits-pip" },
      { title: "Benefits & PIP guide", href: "/guides/benefits-pip" },
    ],
  },
  {
    title: "Exercise & diet",
    links: [
      { title: "Exercise hub", href: "/exercises" },
      { title: "Diet hub", href: "/guides/diet" },
      { title: "Mediterranean diet for arthritis", href: "/diet/mediterranean-diet-for-arthritis" },
      { title: "Self-help tool", href: "/self-help" },
    ],
  },
  {
    title: "Tools & chat",
    links: [
      { title: "Symptom checker", href: "/symptom-checker" },
      { title: "Health tools", href: "/health-tools" },
      { title: "Educational chatbot", href: "/chat" },
      { title: "Waiting-list help", href: "/arthritis-waiting-list-help" },
    ],
  },
  {
    title: "Reading & downloads",
    links: [
      { title: "Blog library", href: "/blog" },
      { title: "Flare action plan", href: "/resources/flare-action-plan" },
      { title: "PIP evidence diary", href: "/resources/pip-evidence-diary" },
      { title: "Clinic pack (HCP)", href: "/resources/clinic-pack" },
      { title: "External resource directory", href: "/resources-directory" },
    ],
  },
] as const;

/**
 * Thin Resource Centre aggregator — existing routes only (P1-08).
 */
export default function ResourceCentre() {
  return (
    <div className="min-h-dvh bg-background">
      <SeoHead
        title="Resource Centre"
        description="One place for Living With Arthritis guides, exercise and diet hubs, PIP help, tools and chatbot — free educational resources. Charity 1218461."
        path={PATH}
      />
      <Header />
      <main id="main-content" role="main" tabIndex={-1} className="outline-none">
        <div className="container mx-auto max-w-5xl px-6 md:px-10 pt-4">
          <MedicalDisclaimerStrip variant="short" />
        </div>
        <PageHero
          badge="Resource Centre"
          title="Find guides, tools and downloads in one place"
          subtitle={`Browse existing Living With Arthritis resources — educational information only, reviewed for UK readers. Registered charity ${CHARITY.number}.`}
        >
          <div className="flex flex-wrap gap-3">
            <Link
              to="/healthcare-professionals"
              className="inline-flex min-h-11 items-center rounded-full border border-border bg-background px-5 text-sm font-semibold hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Healthcare professionals hub
            </Link>
            <Link
              to="/guides/newly-diagnosed"
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Newly diagnosed guide
            </Link>
          </div>
        </PageHero>

        <div className="container mx-auto max-w-5xl px-6 md:px-10 pb-16 space-y-10">
          <section aria-labelledby="illustrated-printables-title" className="rounded-2xl border border-border/40 bg-card p-5 md:p-7">
            <h2 id="illustrated-printables-title" className="font-display text-xl md:text-2xl font-bold text-foreground">Illustrated printables</h2>
            <p className="mt-3 text-muted-foreground">Free two-page PDFs to read, print or keep on your phone. General information, not a personal exercise or treatment plan.</p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              <li><a href="/resources/chair-exercise-guide.pdf" download className="block rounded-lg border border-border/40 px-4 py-4 font-semibold underline underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Chair exercise guide (PDF, 2 pages)</a><p className="mt-2 text-sm text-muted-foreground">Illustrated seated movements, chair setup and advice on when to stop or ask for help. Follow your own healthcare team's restrictions.</p></li>
              <li><a href="/resources/joint-friendly-eating-checklist.pdf" download className="block rounded-lg border border-border/40 px-4 py-4 font-semibold underline underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Joint-friendly eating checklist (PDF, 2 pages)</a><p className="mt-2 text-sm text-muted-foreground">A balanced-food shopping checklist with space for your own choices. No food or supplement is a cure for arthritis.</p></li>
            </ul>
          </section>
          {GROUPS.map((group) => {
            const headingId = `rc-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
            return (
            <section key={group.title} aria-labelledby={headingId}>
              <h2
                id={headingId}
                className="font-display text-xl md:text-2xl font-bold text-foreground mb-4"
              >
                {group.title}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="block rounded-lg border border-border/40 bg-card px-4 py-3 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
              }
