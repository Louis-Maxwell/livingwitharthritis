import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Sun, Droplets, Apple, Footprints, Moon, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dailyTips, dailyLivingIntro } from "@/data/dailyTips";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const iconMap: Record<string, React.ElementType> = {
  Sun, Droplets, Apple, Footprints, Moon, Lightbulb,
};

const DailyTipDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // "overview" is a special slug for the daily living intro page
  const isOverview = slug === "overview";

  const tip = !isOverview ? dailyTips.find((t) => t.slug === slug) : null;

  if (!isOverview && !tip) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Tip not found</h1>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const title = isOverview ? dailyLivingIntro.title : tip!.title;
  const description = isOverview ? dailyLivingIntro.subtitle : tip!.desc;
  const content = isOverview
    ? `${dailyLivingIntro.content}\n\n---\n\n## Tips for Every Day\n\n${dailyLivingIntro.tipsOverview}`
    : tip!.detail;
  const image = isOverview ? dailyLivingIntro.image : tip!.image;
  const IconComponent = !isOverview && tip ? iconMap[tip.icon] : null;

  // Get adjacent tips for navigation
  const currentIndex = !isOverview ? dailyTips.findIndex((t) => t.slug === slug) : -1;
  const prevTip = currentIndex > 0 ? dailyTips[currentIndex - 1] : null;
  const nextTip = currentIndex < dailyTips.length - 1 ? dailyTips[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{title} — Daily Living Tips | Living With Arthritis</title>
        <meta name="description" content={description} />
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero banner */}
        <section className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container mx-auto max-w-4xl">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="mb-4 text-foreground/80 hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center gap-3">
                {IconComponent && (
                  <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-gold" />
                  </div>
                )}
                <div>
                  <span className="text-xs uppercase tracking-wider text-primary font-semibold">Daily Living</span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground">
                    {title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto max-w-4xl px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Overview extra image */}
              {isOverview && (
                <div className="mb-10 rounded-2xl overflow-hidden">
                  <img
                    src={dailyLivingIntro.overviewImage}
                    alt="Health tips mind map"
                    className="w-full h-auto max-h-96 object-contain bg-muted/30"
                  />
                </div>
              )}

              <div className="prose prose-lg max-w-none text-muted-foreground">
                {content.split("\n").map((line, i) => {
                  const trimmed = line.trim();
                  if (!trimmed) return <br key={i} />;
                  if (trimmed.startsWith("## "))
                    return (
                      <h2 key={i} className="text-xl font-display font-bold text-foreground mt-10 mb-4">
                        {trimmed.replace("## ", "")}
                      </h2>
                    );
                  if (trimmed.startsWith("---")) return <hr key={i} className="my-10 border-border/40" />;
                  if (trimmed.startsWith("•"))
                    return (
                      <p key={i} className="pl-6 relative before:content-['•'] before:absolute before:left-1 before:text-primary text-sm leading-relaxed mb-1">
                        {trimmed.replace("• ", "")}
                      </p>
                    );
                  if (/^\d+\./.test(trimmed))
                    return (
                      <p key={i} className="pl-6 text-sm leading-relaxed mb-2 font-medium text-foreground/90">
                        {trimmed}
                      </p>
                    );
                  return (
                    <p key={i} className="text-sm md:text-base leading-relaxed mb-4">
                      {trimmed}
                    </p>
                  );
                })}
              </div>

              {/* Other tips navigation (on individual pages) */}
              {!isOverview && (
                <div className="mt-16 pt-10 border-t border-border/30">
                  <h3 className="text-lg font-display font-bold text-foreground mb-6">
                    Explore more tips
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {dailyTips
                      .filter((t) => t.slug !== slug)
                      .slice(0, 4)
                      .map((t) => {
                        const TipIcon = iconMap[t.icon];
                        return (
                          <Link
                            key={t.slug}
                            to={`/daily-tips/${t.slug}`}
                            className="flex items-center gap-4 p-4 rounded-2xl border border-border/20 hover:border-primary/30 hover:bg-accent/40 transition-all group"
                          >
                            <img
                              src={t.image}
                              alt={t.title}
                              className="w-16 h-16 rounded-xl object-cover shrink-0"
                            />
                            <div>
                              <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                {t.title}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {t.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Prev/Next navigation */}
              {!isOverview && (
                <div className="mt-10 flex justify-between items-center gap-4">
                  {prevTip ? (
                    <Link
                      to={`/daily-tips/${prevTip.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      ← {prevTip.title}
                    </Link>
                  ) : (
                    <span />
                  )}
                  {nextTip ? (
                    <Link
                      to={`/daily-tips/${nextTip.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {nextTip.title} →
                    </Link>
                  ) : (
                    <span />
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DailyTipDetail;
