import { useParams, Navigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import SocialShareButtons from "@/components/SocialShareButtons";
import { useEffect } from "react";
import {
  conditionBySlug,
  conditions,
  jointSlugs,
  jointLabel,
  type JointSlug,
} from "@/data/exerciseConditionRecommendations";
import { exerciseJointPages } from "@/data/exerciseJointMatrix";
import {
  Dumbbell,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  BookOpen,
} from "lucide-react";

const BASE = "https://livingwitharthritis.org.uk";

const isJoint = (v: string | undefined): v is JointSlug =>
  !!v && (jointSlugs as readonly string[]).includes(v);

/**
 * Programmatic SEO page: /exercises/:joint/for-:condition
 * Generates 6 joints × 13 conditions = 78 unique pages.
 */
const ExerciseConditionPage = () => {
  const { joint, condition } = useParams<{ joint: string; condition: string }>();

  if (!isJoint(joint)) return <Navigate to="/404" replace />;
  const cond = condition ? conditionBySlug.get(condition) : undefined;
  if (!cond) return <Navigate to="/404" replace />;

  const jointName = jointLabel[joint];
  const path = `/exercises/${joint}/for-${cond.slug}`;
  const title = `${jointName} Exercises for ${cond.name}`;
  const description = `Safe, physiotherapist-aligned ${jointName.toLowerCase()} exercises for ${cond.name.toLowerCase()}. Step-by-step instructions, benefits and modifications.`;

  // Pick the safe exercises for this condition that have entries for this joint.
  const picks = cond.safeExercises
    .map((exKey) => {
      // Slug pattern in exerciseJointPages: `${exercise}-for-${joint}-arthritis`
      const slug = `${exKey}-for-${joint}-arthritis`;
      return exerciseJointPages.find((p) => p.slug === slug);
    })
    .filter(Boolean)
    .slice(0, 5) as typeof exerciseJointPages;

  // JSON-LD via useEffect (project convention — no Helmet-injected JSON-LD).
  useEffect(() => {
    const url = `${BASE}${path}`;
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
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: "Exercises", item: `${BASE}/exercises` },
        { "@type": "ListItem", position: 3, name: `${jointName} Exercises`, item: `${BASE}/exercises` },
        { "@type": "ListItem", position: 4, name: cond.name, item: url },
      ],
    };
    const nodes: HTMLScriptElement[] = [];
    for (const data of [medicalLd, breadcrumbLd]) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
      nodes.push(s);
    }
    return () => nodes.forEach((n) => n.remove());
  }, [path, title, description, cond, jointName]);

  // Sibling links
  const otherJointsForCondition = jointSlugs
    .filter((j) => j !== joint)
    .map((j) => ({ joint: j, label: jointLabel[j] }));
  const sameJointOtherConditions = conditions
    .filter((c) => c.slug !== cond.slug)
    .slice(0, 6);

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        path={path}
        keywords={`${jointName.toLowerCase()} exercises, ${cond.name.toLowerCase()}, arthritis exercises, physiotherapy, safe movement`}
      />
      <Header />
      <PageBreadcrumb
        segments={[
          { label: "Exercises", href: "/exercises" },
          { label: `${jointName} Exercises for ${cond.name}` },
        ]}
      />

      <main className="container mx-auto px-6 md:px-10 py-10 max-w-4xl">
        {/* Hero */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-primary mb-3">
            <Dumbbell className="w-5 h-5" />
            <span className="text-sm font-medium">
              {jointName} Exercises • {cond.shortName}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {jointName} Exercises for {cond.name}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {cond.whyMovementHelps}
          </p>
        </header>

        {/* Why these exercises work */}
        <section className="mb-10 bg-primary/5 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Why these {jointName.toLowerCase()} exercises work for {cond.name.toLowerCase()}
          </h2>
          <p className="text-foreground mb-3">
            These five exercises were selected because they:
          </p>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Avoid high-impact stress on the {jointName.toLowerCase()}</li>
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Build strength and mobility without provoking inflammation</li>
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Can be scaled to your current level and adapted during flares</li>
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Align with UK physiotherapy guidance for {cond.name.toLowerCase()}</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            <strong>Modifications for {cond.shortName}:</strong> {cond.modifications}
          </p>
        </section>

        {/* Exercise picks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Recommended {jointName.toLowerCase()} exercises
          </h2>
          <div className="space-y-4">
            {picks.map((p, i) => (
              <article key={p.slug} className="bg-card border border-border rounded-xl p-5">
                <div className="flex justify-between items-start mb-2 gap-3">
                  <h3 className="font-semibold text-foreground">
                    {i + 1}. {p.exercise} for the {p.joint.toLowerCase()}
                  </h3>
                  <Link
                    to={`/exercises/${p.slug}`}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full whitespace-nowrap hover:bg-primary/20 transition-colors"
                  >
                    Full guide →
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{p.intro}</p>
                <ul className="space-y-1.5">
                  {p.instructions.slice(0, 3).map((instr, j) => (
                    <li key={j} className="text-sm text-foreground">
                      <strong>{instr.name}</strong> — {instr.description}{" "}
                      <span className="text-muted-foreground">({instr.reps})</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Warning */}
        {cond.warning && (
          <div className="mb-10 bg-destructive/5 border border-destructive/20 rounded-xl p-5 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              <strong>Important:</strong> {cond.warning}
            </p>
          </div>
        )}

        {/* CTAs to pillar pages */}
        <section className="mb-10 grid sm:grid-cols-2 gap-3">
          {cond.hasConditionPage && (
            <Link
              to={`/conditions/${cond.slug}`}
              className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors"
            >
              <span className="text-foreground font-medium">Read the full {cond.name} guide</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          )}
          <Link
            to="/exercises"
            className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors"
          >
            <span className="text-foreground font-medium">Browse all arthritis exercises</span>
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
            className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors"
          >
            <span className="text-foreground font-medium">Ask our help &amp; support team</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
        </section>

        {/* Sibling links — other joints for this condition */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Exercises for other joints affected by {cond.name.toLowerCase()}
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherJointsForCondition.map((j) => (
              <Link
                key={j.joint}
                to={`/exercises/${j.joint}/for-${cond.slug}`}
                className="text-sm px-3 py-1.5 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {j.label} exercises for {cond.shortName}
              </Link>
            ))}
          </div>
        </section>

        {/* Sibling links — same joint, other conditions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {jointName} exercises for other conditions
          </h2>
          <div className="flex flex-wrap gap-2">
            {sameJointOtherConditions.map((c) => (
              <Link
                key={c.slug}
                to={`/exercises/${joint}/for-${c.slug}`}
                className="text-sm px-3 py-1.5 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {jointName} for {c.name}
              </Link>
            ))}
          </div>
        </section>

        <SocialShareButtons title={title} slug={`exercises/${joint}/for-${cond.slug}`} />

        <div className="mt-8 text-xs text-muted-foreground bg-muted/40 rounded-xl p-4">
          <strong>Medical disclaimer:</strong> This information is educational and does
          not replace professional medical advice. Always consult your GP or a
          physiotherapist before starting a new exercise programme, particularly
          during active flares.
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ExerciseConditionPage;
