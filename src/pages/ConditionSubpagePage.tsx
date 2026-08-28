import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import SocialShareButtons from "@/components/SocialShareButtons";
import NextReadStrip from "@/components/NextReadStrip";
import FaqAccordion from "@/components/faq/FaqAccordion";
import {
  conditionSubpages,
  subpageSlugs,
  subpageLabel,
  type SubpageSlug,
} from "@/data/conditionSubpages";
import { conditionBySlug } from "@/data/exerciseConditionRecommendations";
import { buildSubpageFaqs } from "@/data/conditionSubpageFaqs";
import {
  Activity,
  Stethoscope,
  Dumbbell,
  Apple,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

const BASE = "https://livingwitharthritis.org.uk";

const isSubpage = (v: string | undefined): v is SubpageSlug =>
  !!v && (subpageSlugs as readonly string[]).includes(v);

const subpageIcon: Record<SubpageSlug, typeof Activity> = {
  symptoms: Stethoscope,
  treatment: Activity,
  exercises: Dumbbell,
  diet: Apple,
};

function subpageTitle(condName: string, subpage: SubpageSlug): string {
  const titleMap: Record<SubpageSlug, string> = {
    symptoms: `${condName} Symptoms: Early Signs, Causes & UK Diagnosis Guide`,
    treatment: `${condName} Treatment in the UK: UK healthcare Options, Medication & Self-Care`,
    exercises: `Best Exercises for ${condName}: Safe UK Physio-Aligned Routines`,
    diet: `Best Diet for ${condName}: Anti-Inflammatory Foods to Eat & Avoid (UK)`,
  };
  return titleMap[subpage];
}

function subpageDescription(condName: string, subpage: SubpageSlug): string {
  const lcName = condName.toLowerCase();
  const descMap: Record<SubpageSlug, string> = {
    symptoms: `Recognise the early signs of ${lcName}, common flare-up symptoms, and when to see your GP. Plain-English UK guidance aligned with UK healthcare and NICE.`,
    treatment: `Evidence-based ${lcName} treatment in the UK â€” UK healthcare pathways, medication options, pain relief and self-management strategies that actually work.`,
    exercises: `Safe, effective ${lcName} exercises aligned with UK physiotherapy guidance. Movements to try, exercises to avoid, and how to build a weekly routine.`,
    diet: `What to eat â€” and what to limit â€” with ${lcName}. UK-aligned anti-inflammatory diet guidance, food triggers, and the supplements with the best evidence.`,
  };
  return descMap[subpage];
}

/**
 * Programmatic SEO page: /conditions/:condition/:subpage
 * 13 conditions Ã— 4 sub-pages = 52 unique pages.
 */
const ConditionSubpagePage = () => {
  const { condition, subpage } = useParams<{ condition: string; subpage: string }>();

  // Hooks must run unconditionally on every render, so this effect re-derives
  // everything it needs from the route params itself rather than relying on
  // variables computed after the early-returns below.
  useEffect(() => {
    if (!isSubpage(subpage) || !condition) return;
    const cond = conditionBySlug.get(condition);
    const content = conditionSubpages[condition];
    if (!cond || !content) return;

    const path = `/conditions/${cond.slug}/${subpage}`;
    const url = `${BASE}${path}`;
    const subLabel = subpageLabel[subpage];
    const title = subpageTitle(cond.name, subpage);
    const description = subpageDescription(cond.name, subpage);
    const faqs = buildSubpageFaqs(cond.name, cond.shortName, subpage);

    const medicalLd = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: title,
      description,
      url,
      inLanguage: "en-GB",
      about: {
        "@type": "MedicalCondition",
        name: cond.name,
        url: cond.hasConditionPage ? `${BASE}/conditions/${cond.slug}` : undefined,
      },
      audience: {
        "@type": "MedicalAudience",
        audienceType: "Patient",
        geographicArea: { "@type": "Country", name: "United Kingdom" },
      },
      dateModified: new Date().toISOString().slice(0, 10),
    };
    // BreadcrumbList intentionally not emitted here â€” <PageBreadcrumb> below covers it.
    // FAQPage intentionally not emitted here â€” <FaqAccordion> below covers it.
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.text = JSON.stringify(medicalLd);
    document.head.appendChild(s);
    return () => s.remove();
  }, [condition, subpage]);

  if (!isSubpage(subpage)) return <Navigate to="/conditions/arthritis" replace />;
  const cond = condition ? conditionBySlug.get(condition) : undefined;
  const content = condition ? conditionSubpages[condition] : undefined;
  if (!cond || !content) {
    return <Navigate to={cond?.hasConditionPage ? `/conditions/${cond.slug}` : "/conditions/arthritis"} replace />;
  }

  const sub = content[subpage];
  const path = `/conditions/${cond.slug}/${subpage}`;
  const subLabel = subpageLabel[subpage];
  const lcName = cond.name.toLowerCase();
  const title = subpageTitle(cond.name, subpage);
  const description = subpageDescription(cond.name, subpage);
  const faqs = buildSubpageFaqs(cond.name, cond.shortName, subpage);

  const Icon = subpageIcon[subpage];

  // Sibling sub-pages for this condition.
  const siblingSubpages = subpageSlugs.filter((s) => s !== subpage);

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        path={path}
        keywords={`${lcName} ${subpage}, ${lcName} symptoms, ${lcName} treatment uk, best exercises for ${lcName}, diet for ${lcName}, ${lcName} nhs, arthritis ${subpage}`}
      />
      <Header />
      <PageBreadcrumb
        segments={[
          { label: cond.name, href: cond.hasConditionPage ? `/conditions/${cond.slug}` : undefined },
          { label: subLabel },
        ]}
      />

      <main id="main-content" className="container mx-auto px-6 md:px-10 py-10 max-w-4xl">
        {/* Hero */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-primary mb-3">
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">
              {cond.name} â€¢ {subLabel}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {sub.headline}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{sub.intro}</p>
        </header>

        {/* Subpage-specific content */}
        {subpage === "symptoms" && (
          <>
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Common symptoms of {cond.name.toLowerCase()}
              </h2>
              <ul className="space-y-2">
                {(sub as typeof content.symptoms).commonSymptoms.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 bg-primary/5 rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{s}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="mb-10 bg-destructive/5 border border-destructive/20 rounded-xl p-5 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <h2 className="font-semibold text-foreground mb-1">When to see your GP</h2>
                <p className="text-sm text-foreground">{(sub as typeof content.symptoms).whenToSeeGP}</p>
              </div>
            </section>
          </>
        )}

        {subpage === "treatment" && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">Treatment approaches</h2>
            <div className="space-y-3">
              {(sub as typeof content.treatment).approaches.map((a, i) => (
                <article key={i} className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-1">
                    {i + 1}. {a.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{a.description}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {subpage === "exercises" && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Why exercise helps {cond.name.toLowerCase()}
            </h2>
            <ul className="space-y-2 mb-6">
              {(sub as typeof content.exercises).keyBenefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 bg-primary/5 rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/guides/exercise"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              See joint-by-joint exercise guides for {cond.shortName} <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        )}

        {subpage === "diet" && (
          <>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Foods to favour</h2>
              <ul className="space-y-2">
                {(sub as typeof content.diet).foodsToFavor.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 bg-primary/5 rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-foreground mb-4">Foods to limit</h2>
              <ul className="space-y-2">
                {(sub as typeof content.diet).foodsToLimit.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 bg-destructive/5 rounded-xl p-4">
                    <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {/* People also ask â€” long-tail question keywords + FAQPage schema */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            People also ask about {lcName} {subpage === "diet" ? "and diet" : subpage}
          </h2>
          <FaqAccordion idPrefix={`${cond.slug}-${subpage}-faq`} items={faqs} />
        </section>

        {/* Sibling sub-pages â€” same condition */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            More on {cond.name.toLowerCase()}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {siblingSubpages.map((s) => {
              const SibIcon = subpageIcon[s];
              return (
                <Link
                  key={s}
                  to={`/conditions/${cond.slug}/${s}`}
                  className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors"
                >
                  <span className="flex items-center gap-3 text-foreground font-medium">
                    <SibIcon className="w-4 h-4 text-primary" />
                    {cond.name} {subpageLabel[s].toLowerCase()}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
              );
            })}
            {cond.hasConditionPage && (
              <Link
                to={`/conditions/${cond.slug}`}
                className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors sm:col-span-2"
              >
                <span className="text-foreground font-medium">
                  Full {cond.name} guide
                </span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
            )}
          </div>
        </section>

        {/* Pillar CTAs */}
        <section className="mb-10 grid sm:grid-cols-2 gap-3">
          <Link
            to="/exercises"
            className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors"
          >
            <span className="text-foreground font-medium">All arthritis exercises</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
          <Link
            to="/diet"
            className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors"
          >
            <span className="text-foreground font-medium">Anti-inflammatory diet guide</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
          <Link
            to="/chat"
            className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors sm:col-span-2"
          >
            <span className="text-foreground font-medium">Ask our help &amp; support team</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
        </section>

        <SocialShareButtons title={title} slug={`conditions/${cond.slug}/${subpage}`} />

        <div className="mt-8 text-xs text-muted-foreground bg-muted/40 rounded-xl p-4">
          <strong>Medical disclaimer:</strong> This information is educational and does
          not replace professional medical advice. Always consult your GP or specialist
          for personalised guidance.
        </div>
      </main>

      <NextReadStrip currentPath={path} heading="Keep reading arthritis insights" />
      <Footer />
    </>
  );
};

export default ConditionSubpagePage;
