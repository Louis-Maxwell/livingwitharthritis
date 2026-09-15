import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import PageHero from "@/components/ui/PageHero";
import { CHARITY } from "@/config/charity";

const PATH = "/resource-centre";

const GROUPS = [
  {
    title: "Guides & starting points",
    links: [
      { title: "Guides hub", href: "/guides" },
      { title: "Newly diagnosed", href: "/guides/newly-diagnosed" },
      { title: "Pain relief guide", href: "/guides/arthritis-pain-relief" },
      { title: "Benefits & PIP hub", href: "/benefits-pip" },
      { title: "Benefits & PIP guide", href: "/guides/benefits-pip" },
    ],
  },
  {
    title: "Exercise & diet",
    links: [
      { title: "Exercise hub", href: "/exercises" },
      { title: "Diet hub", href: "/diet" },
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
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Resource Centre"
        description="One place for Living With Arthritis UK guides, exercise and diet hubs, PIP help, tools and chatbot — free educational resources. Charity 1218461."
        path={PATH}
      />
      <Header />
      <main id="main-content" role="main" tabIndex={-1}>
        <PageHero
          badge="Resource Centre"
          title="Find guides, tools and downloads in one place"
          subtitle={`Browse existing Living With Arthritis UK resources — educational information only, reviewed for UK readers. Registered charity ${CHARITY.number}.`}
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
          {GROUPS.map((group) => (
            <section key={group.title} aria-labelledby={`rc-${group.title}`}>
              <h2
                id={`rc-${group.title}`}
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
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
