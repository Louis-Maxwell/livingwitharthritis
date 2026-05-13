import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import SocialShareButtons from "@/components/SocialShareButtons";
import { exerciseJointPages } from "@/data/exerciseJointMatrix";
import { Dumbbell, CheckCircle, AlertTriangle, ShieldAlert, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const BASE = "https://livingwitharthritis.org.uk";

const ExerciseJointPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = exerciseJointPages.find((p) => p.slug === slug);

  if (!page) return <Navigate to="/404" replace />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: page.title,
    description: page.metaDescription,
    url: `${BASE}/exercises/${page.slug}`,
    inLanguage: "en-GB",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Patient",
      geographicArea: { "@type": "Country", name: "United Kingdom" },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Exercises", item: `${BASE}/exercises` },
      { "@type": "ListItem", position: 3, name: `${page.exercise} for ${page.joint}`, item: `${BASE}/exercises/${page.slug}` },
    ],
  };

  // HowTo schema for Google step-by-step rich results
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to do ${page.exercise} for ${page.joint} arthritis`,
    description: page.metaDescription,
    inLanguage: "en-GB",
    totalTime: "PT15M",
    supply: [{ "@type": "HowToSupply", name: "Comfortable clothing and supportive footwear" }],
    tool: [{ "@type": "HowToTool", name: "Exercise mat (optional)" }],
    step: page.instructions.map((instr, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: instr.name,
      text: `${instr.description} Recommended: ${instr.reps}.`,
      url: `${BASE}/exercises/${page.slug}#step-${i + 1}`,
    })),
  };

  // Related pages: same exercise different joint + same joint different exercise
  const sameExercise = exerciseJointPages.filter((p) => p.exercise === page.exercise && p.slug !== page.slug).slice(0, 3);
  const sameJoint = exerciseJointPages.filter((p) => p.joint === page.joint && p.slug !== page.slug).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{page.title} | Living With Arthritis</title>
        <meta name="description" content={page.metaDescription} />
        <link rel="canonical" href={`${BASE}/exercises/${page.slug}`} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:url" content={`${BASE}/exercises/${page.slug}`} />
        <meta property="og:type" content="article" />
        <meta name="geo.region" content="GB" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(howToLd)}</script>
      </Helmet>

      <Header />
      <PageBreadcrumb segments={[
        { label: "Exercises", href: "/exercises" },
        ...(page.exercise.toLowerCase().includes("tai chi")
          ? [{ label: "Tai Chi for Arthritis", href: "/exercises/tai-chi-for-arthritis" }]
          : []),
        { label: `${page.exercise} for ${page.joint}` },
      ]} />

      <main className="container mx-auto px-6 md:px-10 py-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Hero */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-primary mb-3">
              <Dumbbell className="w-5 h-5" />
              <span className="text-sm font-medium">{page.exercise} • {page.joint} Arthritis</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {page.exercise} for {page.joint} Arthritis
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{page.intro}</p>
          </div>

          {/* Benefits */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" /> Benefits of {page.exercise} for {page.joint} Arthritis
            </h2>
            <ul className="space-y-2">
              {page.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 bg-primary/5 rounded-xl p-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Exercises */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> Recommended {page.joint} Exercises
            </h2>
            <div className="space-y-4">
              {page.instructions.map((instr, i) => (
                <div key={i} id={`step-${i + 1}`} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground">{i + 1}. {instr.name}</h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full whitespace-nowrap">{instr.reps}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{instr.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Safety Tips */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" /> Safety Tips
            </h2>
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
              <ul className="space-y-2">
                {page.safetyTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-destructive mt-0.5">⚠️</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* When to Avoid */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-destructive" /> When to Avoid {page.exercise}
            </h2>
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
              <ul className="space-y-2">
                {page.whenToAvoid.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-destructive mt-0.5">🛑</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Related Pages */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">More {page.exercise} Guides</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {sameExercise.map((p) => (
                <Link
                  key={p.slug}
                  to={`/exercises/${p.slug}`}
                  className="text-sm px-3 py-1.5 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {p.exercise} for {p.joint}
                </Link>
              ))}
            </div>

            <h2 className="text-xl font-semibold text-foreground mb-4">More {page.joint} Exercises</h2>
            <div className="flex flex-wrap gap-2">
              {sameJoint.map((p) => (
                <Link
                  key={p.slug}
                  to={`/exercises/${p.slug}`}
                  className="text-sm px-3 py-1.5 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {p.exercise} for {p.joint}
                </Link>
              ))}
            </div>
          </section>

          <SocialShareButtons title={page.title} slug={`exercises/${page.slug}`} />

          {/* Disclaimer */}
          <div className="mt-8 text-xs text-muted-foreground bg-muted/40 rounded-xl p-4">
            <strong>Medical disclaimer:</strong> This information is for educational purposes only and should not replace professional medical advice.
            Always consult your GP or physiotherapist before starting a new exercise programme, especially if you have active joint inflammation.
          </div>
        </motion.div>
      </main>

      <Footer />
    </>
  );
};

export default ExerciseJointPage;
