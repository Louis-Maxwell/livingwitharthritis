import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingChatButton } from "@/components/FloatingChatButton";
import { articles, categoryColors } from "@/data/articles";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = ["All", "Exercise", "Nutrition", "Conditions", "Physiotherapy", "Treatment"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <>
      <Helmet>
        <title>Arthritis Articles & Guides UK | Living With Arthritis</title>
        <meta
          name="description"
          content="Expert UK arthritis guides covering exercises, diet, conditions, and treatments. Evidence-based advice for the 10 million people living with arthritis in Britain."
        />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/blog" />
        <meta property="og:title" content="Arthritis Articles & Guides UK | Living With Arthritis" />
        <meta property="og:description" content="Expert UK arthritis guides covering exercises, diet, conditions, and treatments." />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/blog" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Living With Arthritis UK – Articles & Guides",
          "url": "https://livingwitharthritis.org.uk/blog",
          "inLanguage": "en-GB",
          "description": "Expert UK arthritis guides covering exercises, diet, conditions, and treatments.",
          "publisher": {
            "@type": "Organization",
            "name": "Living With Arthritis",
            "url": "https://livingwitharthritis.org.uk",
          },
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="relative overflow-hidden bg-background py-20 lg:py-28">
            <div className="gradient-orb w-[600px] h-[600px] bg-primary top-[-200px] right-[-200px] opacity-40" />
            <div className="container mx-auto px-6 md:px-10 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <span className="section-label text-primary mb-4 block">UK Arthritis Resource Centre</span>
                <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-5 leading-tight">
                  Expert guides for living well with{" "}
                  <span className="text-primary italic">arthritis</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Evidence-based articles on exercises, nutrition, conditions, and treatments — written for the 10 million people managing arthritis across the UK.
                </p>
              </motion.div>

              {/* Category filter */}
              <div className="flex flex-wrap gap-2 mt-10">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground shadow-medium"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                    aria-pressed={activeCategory === cat}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Article grid */}
          <section className="container mx-auto px-6 md:px-10 pb-24">
            {/* Featured article */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <Link
                  to={`/blog/${featured.slug}`}
                  className="group block rounded-3xl border border-border/50 bg-card overflow-hidden shadow-soft hover:shadow-large transition-all duration-300 lg:grid lg:grid-cols-2"
                >
                  <div className="bg-gradient-to-br from-primary/8 via-secondary/5 to-transparent flex items-center justify-center p-12 lg:p-16 min-h-[220px]">
                    <BookOpen className="w-20 h-20 text-primary/20 group-hover:text-primary/30 transition-colors duration-300" strokeWidth={1} />
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[featured.category]}`}>
                        {featured.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> {featured.readTime}
                      </span>
                      <Badge variant="secondary" className="text-xs">Featured</Badge>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200 leading-snug">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-5 line-clamp-3">{featured.description}</p>
                    <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                      Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Article grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article, i) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link
                    to={`/blog/${article.slug}`}
                    className="group flex flex-col h-full rounded-2xl border border-border/50 bg-card overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300"
                  >
                    <div className="bg-gradient-to-br from-primary/5 via-secondary/3 to-transparent flex items-center justify-center p-8 min-h-[140px]">
                      <BookOpen className="w-10 h-10 text-primary/20 group-hover:text-primary/35 transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[article.category]}`}>
                          {article.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.readTime}
                        </span>
                      </div>
                      <h2 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 leading-snug line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3 mb-4">
                        {article.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm mt-auto">
                        Read more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
        <FloatingChatButton />
      </div>
    </>
  );
};

export default Blog;
