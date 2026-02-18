import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, BookOpen, ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButton } from "@/components/FloatingChatButton";
import { getArticleBySlug, articles, categoryColors } from "@/data/articles";
import { AppointmentModal } from "@/components/AppointmentModal";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug ?? "");

  if (!article) return <Navigate to="/blog" replace />;

  // Related articles: use curated relatedLinks first, fall back to same-category
  const relatedSlugs = article.relatedLinks?.map((r) => r.slug) ?? [];
  const related = relatedSlugs.length > 0
    ? relatedSlugs.map((s) => articles.find((a) => a.slug === s)).filter(Boolean) as typeof articles
    : articles.filter((a) => a.category === article.category && a.slug !== article.slug).slice(0, 3);

  const publishedDate = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "Living With Arthritis",
      "url": "https://livingwitharthritis.org.uk",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Living With Arthritis",
      "url": "https://livingwitharthritis.org.uk",
      "logo": {
        "@type": "ImageObject",
        "url": "https://livingwitharthritis.org.uk/favicon.ico",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://livingwitharthritis.org.uk/blog/${article.slug}`,
    },
    "keywords": article.keywords.join(", "),
    "inLanguage": "en-GB",
    "about": {
      "@type": "MedicalCondition",
      "name": "Arthritis",
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://livingwitharthritis.org.uk/" },
      { "@type": "ListItem", "position": 2, "name": "Articles", "item": "https://livingwitharthritis.org.uk/blog" },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://livingwitharthritis.org.uk/blog/${article.slug}` },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | Living With Arthritis UK</title>
        <meta name="description" content={article.description} />
        <meta name="keywords" content={article.keywords.join(", ")} />
        <link rel="canonical" href={`https://livingwitharthritis.org.uk/blog/${article.slug}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:url" content={`https://livingwitharthritis.org.uk/blog/${article.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.publishedAt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Breadcrumb */}
          <div className="container mx-auto px-6 md:px-10 pt-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-foreground transition-colors">Articles</Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-[200px]">{article.category}</span>
            </nav>
          </div>

          {/* Article hero */}
          <section className="relative overflow-hidden bg-background">
            <div className="gradient-orb w-[500px] h-[500px] bg-primary top-[-150px] right-[-150px] opacity-30" />
            <div className="container mx-auto px-6 md:px-10 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[article.category]}`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {article.readTime}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {publishedDate}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-5 leading-tight">
                  {article.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {article.description}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Article body */}
          <section className="container mx-auto px-6 md:px-10 pb-20">
            <div className="max-w-3xl">
              <div className="divide-y divide-border/40">
                {article.sections.map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="py-8 first:pt-0"
                  >
                    <h2 className="text-xl font-display font-bold text-foreground mb-3 leading-snug">
                      {section.heading}
                    </h2>
                    <p className="text-muted-foreground leading-[1.85] text-base">{section.body}</p>
                  </motion.div>
                ))}
              </div>

              {/* Further Reading – inline keyword-rich internal links */}
              {article.relatedLinks && article.relatedLinks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="mt-10 p-6 rounded-2xl bg-muted/50 border border-border/40"
                >
                  <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Further Reading</h3>
                  <ul className="space-y-2.5">
                    {article.relatedLinks.map((link) => {
                      const target = articles.find((a) => a.slug === link.slug);
                      if (!target) return null;
                      return (
                        <li key={link.slug} className="flex items-start gap-2.5">
                          <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <Link
                            to={`/blog/${link.slug}`}
                            className="text-primary hover:underline text-sm font-medium leading-snug"
                            aria-label={`Read our guide on ${link.anchorText}`}
                          >
                            {link.anchorText}
                          </Link>
                          <span className="text-xs text-muted-foreground ml-auto flex-shrink-0 hidden sm:block">
                            {target.readTime}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}

              {/* Medical disclaimer */}
              <div className="mt-8 p-5 rounded-2xl bg-muted/60 border border-border/40">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Medical disclaimer:</strong> This article is for general informational purposes only and does not constitute medical advice. Always consult your GP, rheumatologist, or physiotherapist before making changes to your treatment or exercise programme.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-10 p-8 rounded-3xl bg-gradient-to-br from-primary/8 via-secondary/5 to-transparent border border-primary/10">
                <h3 className="text-xl font-display font-bold text-foreground mb-2">Get personalised advice</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  Every arthritis journey is different. Book a free consultation with our team to discuss your specific symptoms and get a tailored plan.
                </p>
                <AppointmentModal
                  trigger={
                    <Button className="btn-primary-cta rounded-full px-6 h-11 text-sm font-bold">
                      <CalendarCheck className="w-4 h-4 mr-2" />
                      Book Free Consultation
                    </Button>
                  }
                />
              </div>
            </div>
          </section>

          {/* Related articles */}
          {related.length > 0 && (
            <section className="bg-muted/40 py-16">
              <div className="container mx-auto px-6 md:px-10">
                <h2 className="text-2xl font-display font-bold text-foreground mb-8">Related Articles</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {related.map((rel) => (
                    <Link
                      key={rel.slug}
                      to={`/blog/${rel.slug}`}
                      className="group block rounded-2xl border border-border/50 bg-card p-6 shadow-soft hover:shadow-medium transition-all duration-300"
                    >
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full mb-3 inline-block ${categoryColors[rel.category]}`}>
                        {rel.category}
                      </span>
                      <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-2 leading-snug line-clamp-2">
                        {rel.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
                        Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="mt-10">
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4" /> View all articles
                  </Link>
                </div>
              </div>
            </section>
          )}
        </main>
        <Footer />
        <FloatingChatButton />
      </div>
    </>
  );
};

export default ArticlePage;
