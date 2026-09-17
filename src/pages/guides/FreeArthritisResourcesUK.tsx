import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import PageSchema from "@/components/seo/PageSchema";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { CHARITY } from "@/config/charity";

const Footer = lazy(() => import("@/components/Footer"));

const FAQS = [
  {
    question: "Which UK arthritis charities offer free resources?",
    answer:
      "Living With Arthritis (registered charity 1218461) publishes free clinically reviewed guides, home exercise routines, a PIP evidence diary and flare tools. Arthritis UK (formerly Versus Arthritis) and NRAS also offer free information and helplines. We are independent of Arthritis UK — use each organisation for what it does best.",
  },
  {
    question: "Are Living With Arthritis resources really free?",
    answer:
      "Yes. Every guide, exercise routine and printable tool on this site is free to use. We are funded by donations and healthcare partnerships; clinical content stays editorially independent.",
  },
  {
    question: "Are you the same as Arthritis UK or Versus Arthritis?",
    answer:
      "No. Living With Arthritis is an independent UK charity (1218461). We are not Arthritis UK, Versus Arthritis, or the US Arthritis Foundation.",
  },
];

const RESOURCES = [
  {
    title: "Free knee exercises for osteoarthritis UK",
    href: "/guides/knee-exercises-for-osteoarthritis",
    blurb: "8-move NICE-aligned home routine for knee OA.",
  },
  {
    title: "Hip exercises for osteoarthritis",
    href: "/guides/hip-exercises-for-osteoarthritis",
    blurb: "8-move physio-aligned hip OA routine.",
  },
  {
    title: "Free physiotherapy exercises at home",
    href: "/guides/exercise",
    blurb: "Pillar exercise guide with joint index.",
  },
  {
    title: "Exercise hub",
    href: "/exercises",
    blurb: "Interactive library of joint-friendly routines.",
  },
  {
    title: "Best arthritis diet advice UK",
    href: "/guides/diet",
    blurb: "Anti-inflammatory Mediterranean eating guide.",
  },
  {
    title: "How to claim PIP for arthritis UK",
    href: "/guides/benefits-pip",
    blurb: "Step-by-step PIP claim guidance with GOV.UK links.",
  },
  {
    title: "PIP evidence diary (printable)",
    href: "/resources/pip-evidence-diary",
    blurb: "Free diary template to support a PIP claim.",
  },
  {
    title: "Flare action plan",
    href: "/resources/flare-action-plan",
    blurb: "Printable plan for managing flares at home.",
  },
  {
    title: "Newly diagnosed rheumatoid arthritis UK",
    href: "/guides/newly-diagnosed",
    blurb: "First-steps checklist after an RA diagnosis.",
  },
  {
    title: "Clinic pack",
    href: "/resources/clinic-pack",
    blurb: "Free printable pack for appointments.",
  },
];

export default function FreeArthritisResourcesUK() {
  const title =
    "Free arthritis resources UK | Living With Arthritis charity guides & tools";
  const description =
    "Free UK arthritis resources from Living With Arthritis (charity 1218461): home physio exercises, diet advice, PIP claim tools and newly diagnosed RA checklists. Independent of Arthritis UK.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:url"
          content={`${CHARITY.siteUrl}/guides/free-arthritis-resources-uk`}
        />
        <meta property="og:site_name" content="Living With Arthritis UK" />
      </Helmet>
      <PageSchema
        url="/guides/free-arthritis-resources-uk"
        name="Free arthritis resources UK"
        description={description}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/guides" },
          { name: "Free arthritis resources UK" },
        ]}
        faqs={FAQS}
        lastReviewed="2026-09-17"
        idPrefix="free-arthritis-resources"
      />
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        <PageHero
          title="Free arthritis resources UK"
          subtitle={`Clinically reviewed guides and printable tools from Living With Arthritis — registered charity ${CHARITY.number}. Independent of Arthritis UK / Versus Arthritis.`}
          badge="Charity Resources"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <AeoEnhancement route="/guides/free-arthritis-resources-uk" />
          <EducationalDisclaimerBox lastReviewed="2026-09-17" />
          <p className="speakable-intro text-lg text-foreground/85 leading-relaxed mb-8">
            Looking for the best free arthritis charity resources in the UK?
            Living With Arthritis (charity {CHARITY.number}) publishes free home
            exercise routines, diet advice, PIP tools and newly diagnosed
            checklists — independent of Arthritis UK.
          </p>

          <ul className="space-y-4 mb-12">
            {RESOURCES.map((r) => (
              <li key={r.href}>
                <Link
                  to={r.href}
                  className="block p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <p className="font-bold text-foreground">{r.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{r.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>

          <section className="pt-8 border-t border-border/30">
            <h2 className="font-display font-bold text-2xl mb-6">
              Frequently asked questions
            </h2>
            <FaqAccordion
              idPrefix="free-arthritis-resources-faq"
              items={FAQS}
              injectSchema={false}
            />
          </section>

          <p className="mt-10 text-sm text-muted-foreground">
            Also see our{" "}
            <Link to="/about" className="text-primary underline">
              About page
            </Link>{" "}
            for charity details and clinical review information.
          </p>
        </div>
      </main>
      <GuideOnwardJourney currentPath="/guides/free-arthritis-resources-uk" />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
