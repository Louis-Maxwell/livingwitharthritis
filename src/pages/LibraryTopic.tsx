import { useEffect, useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, AlertTriangle, ArrowRight } from "lucide-react";
import { getHealthTopic, healthTopics } from "@/data/healthTopics";

const LibraryTopic = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const topic = useMemo(() => getHealthTopic(slug), [slug]);

  useEffect(() => {
    if (!topic) return;
    const id = "library-topic-jsonld";
    document.getElementById(id)?.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: topic.title,
      description: topic.subtitle || topic.sections[0]?.body?.slice(0, 160),
      url: `https://livingwitharthritis.org.uk/library/${topic.slug}`,
      about: { "@type": "MedicalCondition", name: topic.title },
      publisher: {
        "@type": "Organization",
        name: "Living With Arthritis UK",
      },
    });
    document.head.appendChild(script);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [topic]);

  if (!topic) return <Navigate to="/library" replace />;

  const related = healthTopics
    .filter((t) => t.category === topic.category && t.slug !== topic.slug)
    .slice(0, 6);

  return (
    <>
      <Helmet>
        <title>{topic.title} | Living With Arthritis UK</title>
        <meta
          name="description"
          content={
            topic.subtitle ||
            `${topic.title} — plain-English information from Living With Arthritis UK.`
          }
        />
        <meta property="og:title" content={`${topic.title} | Living With Arthritis UK`} />
        <meta property="og:description" content={topic.subtitle || `${topic.title} — plain-English information from Living With Arthritis UK.`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://livingwitharthritis.org.uk/library/${topic.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${topic.title} | Living With Arthritis UK`} />
        <meta name="twitter:description" content={topic.subtitle || `${topic.title} — plain-English information from Living With Arthritis UK.`} />
      </Helmet>

      <Header />

      <main id="main-content" className="min-h-screen bg-background text-foreground">
        <article className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-3xl py-16">
          <Link
            to="/library"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ChevronLeft size={16} /> Back to Library
          </Link>

          <Badge variant="secondary" className="mb-4">
            {topic.category}
          </Badge>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">
            {topic.title}
          </h1>
          {topic.subtitle && (
            <p className="text-lg text-muted-foreground mb-10">
              {topic.subtitle}
            </p>
          )}

          <div className="space-y-10">
            {topic.sections.map((section, i) => (
              <section key={i}>
                <h2 className="font-serif text-2xl font-semibold text-primary mb-4">
                  {section.heading}
                </h2>
                {section.body &&
                  section.body.split("\n\n").map((para, pi) => (
                    <p key={pi} className="mb-4 leading-relaxed">
                      {para}
                    </p>
                  ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="list-disc ps-6 space-y-2">
                    {section.bullets.map((b, bi) => (
                      <li key={bi} className="leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {topic.disclaimer && (
            <aside className="mt-12 p-5 rounded-xl border border-primary/20 bg-primary/5 flex gap-3 text-sm">
              <AlertTriangle
                className="text-primary shrink-0 mt-0.5"
                size={18}
                aria-hidden
              />
              <p className="text-foreground/80">{topic.disclaimer}</p>
            </aside>
          )}

          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-border">
              <h2 className="font-serif text-2xl font-semibold mb-6">
                Related topics
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/library/${r.slug}`}
                    className="group flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-muted/40 transition-colors"
                  >
                    <span className="font-medium">{r.title}</span>
                    <ArrowRight
                      size={16}
                      className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/library">Browse all topics</Link>
            </Button>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default LibraryTopic;
