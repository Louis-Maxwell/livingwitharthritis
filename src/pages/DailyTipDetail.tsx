import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Sun, Droplets, Apple, Footprints, Moon, Lightbulb, Clock, BookOpen, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dailyTips, dailyLivingIntro } from "@/data/dailyTips";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const iconMap: Record<string, React.ElementType> = {
  Sun, Droplets, Apple, Footprints, Moon, Lightbulb,
};

const estimateReadingTime = (text: string) => Math.max(1, Math.ceil(text.split(/\s+/).length / 200));

const extractKeyTakeaways = (content: string): string[] => {
  const bullets = content.match(/• .+/g);
  if (bullets && bullets.length >= 3) return bullets.slice(0, 4).map(b => b.replace("• ", ""));
  const sentences = content.split(/\.\s+/).filter(s => s.length > 20 && s.length < 120);
  return sentences.slice(0, 4).map(s => s.trim().replace(/\.$/, ""));
};

const ContentRenderer = ({ content }: { content: string }) => (
  <div className="prose prose-lg max-w-none">
    {content.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      if (trimmed.startsWith("## "))
        return (
          <h2 key={i} className="text-xl md:text-2xl font-display font-bold text-foreground mt-12 mb-4 flex items-center gap-3">
            <span className="w-1 h-6 bg-primary rounded-full inline-block" />
            {trimmed.replace("## ", "")}
          </h2>
        );
      if (trimmed.startsWith("---")) return <hr key={i} className="my-12 border-border/30" />;
      if (trimmed.startsWith("•"))
        return (
          <div key={i} className="flex gap-3 mb-2 pl-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">{trimmed.replace("• ", "")}</p>
          </div>
        );
      if (/^\d+\./.test(trimmed))
        return (
          <p key={i} className="pl-4 text-sm md:text-base leading-relaxed mb-3 font-medium text-foreground/90">
            {trimmed}
          </p>
        );
      return (
        <p key={i} className="text-sm md:text-base leading-relaxed mb-5 text-muted-foreground">
          {trimmed}
        </p>
      );
    })}
  </div>
);

const DailyTipDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const isOverview = slug === "overview";
  const tip = !isOverview ? dailyTips.find((t) => t.slug === slug) : null;

  if (!isOverview && !tip) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tip not found</h2>
            <Button variant="outline" onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const title = isOverview ? dailyLivingIntro.title : tip!.title;
  const metaTitle = isOverview ? dailyLivingIntro.title : (tip!.metaTitle || tip!.title);
  const description = isOverview ? dailyLivingIntro.subtitle : tip!.desc;
  const content = isOverview
    ? `${dailyLivingIntro.content}\n\n---\n\n## Tips for Every Day\n\n${dailyLivingIntro.tipsOverview}`
    : tip!.detail;
  const image = isOverview ? dailyLivingIntro.image : tip!.image;
  const IconComponent = !isOverview && tip ? iconMap[tip.icon] : null;
  const readingTime = estimateReadingTime(content);
  const keyTakeaways = extractKeyTakeaways(content);

  const currentIndex = !isOverview ? dailyTips.findIndex((t) => t.slug === slug) : -1;
  const prevTip = currentIndex > 0 ? dailyTips[currentIndex - 1] : null;
  const nextTip = currentIndex < dailyTips.length - 1 ? dailyTips[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{metaTitle} — Daily Living Tips | Living With Arthritis</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${metaTitle} — Daily Living Tips`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://livingwitharthritis.org.uk/daily-tips/${slug || "overview"}`} />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={image || "https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${tip?.name || "Daily Tip"}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${metaTitle} — Daily Living Tips`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image || "https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp"} />
      </Helmet>

      <Header />

      <main id="main-content" className="flex-1">
        {/* Hero banner */}
        <section className="relative h-72 sm:h-80 md:h-[28rem] overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container mx-auto max-w-4xl">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="mb-5 text-foreground/80 hover:text-foreground backdrop-blur-sm bg-background/30 rounded-full px-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-start gap-4">
                {IconComponent && (
                  <div className="w-14 h-14 rounded-2xl bg-primary/15 backdrop-blur-sm flex items-center justify-center shrink-0 border border-primary/20">
                    <IconComponent className="w-7 h-7 text-primary" />
                  </div>
                )}
                <div>
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-1 block">Daily Living</span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight">
                    {title}
                  </h1>
                  <div className="flex items-center gap-4 mt-3 text-muted-foreground">
                    <span className="flex items-center gap-1.5 text-xs">
                      <Clock className="w-3.5 h-3.5" /> {readingTime} min read
                    </span>
                    <span className="flex items-center gap-1.5 text-xs">
                      <BookOpen className="w-3.5 h-3.5" /> Health & Wellness
                    </span>
                  </div>
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
              {/* Description callout */}
              <div className="mb-10 p-6 rounded-2xl bg-accent/50 border border-border/20">
                <p className="text-base md:text-lg text-foreground/80 italic leading-relaxed">{description}</p>
              </div>

              {/* Key Takeaways */}
              {keyTakeaways.length > 0 && (
                <div className="mb-12 p-6 md:p-8 rounded-2xl bg-primary/5 border border-primary/15">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                    <Heart className="w-4 h-4" /> Key Takeaways
                  </h3>
                  <ul className="space-y-3">
                    {keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="text-primary font-bold text-sm mt-0.5">{i + 1}.</span>
                        <span className="text-sm md:text-base text-foreground/80">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Overview extra image */}
              {isOverview && (
                <div className="mb-10 rounded-2xl overflow-hidden border border-border/20">
                  <img
                    src={dailyLivingIntro.overviewImage}
                    alt="Health tips mind map"
                    className="w-full h-auto max-h-96 object-contain bg-muted/30"
                  />
                </div>
              )}

              <ContentRenderer content={content} />

              {/* CTA section */}
              <div className="mt-16 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/40 to-primary/5 border border-primary/15 text-center">
                <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-3">
                  Need personalised guidance?
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                  Our help chat can help you create a tailored daily routine based on your specific needs and condition.
                </p>
                <Link to="/chat">
                  <Button className="rounded-full px-8">
                    Talk to Our Assistant <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
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
                            <img src={t.image} alt={t.title} className="w-16 h-16 rounded-xl object-cover shrink-0" loading="lazy" decoding="async" />
                            <div>
                              <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{t.title}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">{t.desc}</p>
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
                    <Link to={`/daily-tips/${prevTip.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      {prevTip.title}
                    </Link>
                  ) : <span />}
                  {nextTip ? (
                    <Link to={`/daily-tips/${nextTip.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                      {nextTip.title}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : <span />}
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
