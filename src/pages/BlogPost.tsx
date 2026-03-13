import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Eye, BookOpen, Calendar, Clock } from "lucide-react";
import { blogArticles } from "@/data/blogArticles";
import { useBlogViews } from "@/hooks/useBlogViews";
import BlogComments from "@/components/BlogComments";
import BlogHelpfulness from "@/components/BlogHelpfulness";
import RelatedArticles from "@/components/RelatedArticles";
import SocialShareButtons from "@/components/SocialShareButtons";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

function getReadingTime(html: string) {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles[slug ?? ""];
  const viewCount = useBlogViews(slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 md:px-10 py-24 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">← Back to blog</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <meta name="keywords" content={article.keywords} />
        <meta property="og:title" content={article.metaTitle} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://livingwitharthritis.org.uk/blog/${slug}`} />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/og-blog-default.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={article.title} />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:section" content="Health" />
        <meta property="article:tag" content="arthritis" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.metaTitle} />
        <meta name="twitter:description" content={article.metaDescription} />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/og-blog-default.jpg" />
        <meta name="geo.region" content="GB" />
        <link rel="canonical" href={`https://livingwitharthritis.org.uk/blog/${slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "headline": article.title,
          "description": article.metaDescription,
          "datePublished": article.date,
          "dateModified": article.date,
          "author": { "@type": "Organization", "name": "Living With Arthritis", "url": "https://livingwitharthritis.org.uk" },
          "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": "https://livingwitharthritis.org.uk", "logo": { "@type": "ImageObject", "url": "https://livingwitharthritis.org.uk/favicon.ico" } },
          "inLanguage": "en-GB",
          "mainEntityOfPage": `https://livingwitharthritis.org.uk/blog/${slug}`,
          "about": { "@type": "MedicalCondition", "name": "Arthritis", "alternateName": ["Osteoarthritis", "Rheumatoid Arthritis"] },
          "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } },
          "lastReviewed": article.date,
          "medicalAudience": { "@type": "MedicalAudience", "audienceType": "Patient" }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://livingwitharthritis.org.uk/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://livingwitharthritis.org.uk/blog" },
            { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://livingwitharthritis.org.uk/blog/${slug}` }
          ]
        })}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb segments={[{ label: "Blog", href: "/blog" }, { label: article.title }]} className="max-w-3xl" />

        {/* Decorative article header */}
        <div className="relative bg-gradient-to-br from-primary/6 via-background to-violet-500/4 border-b border-border/20 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15%" cy="30%" r="3" fill="hsl(var(--primary))" />
            <circle cx="80%" cy="20%" r="2" fill="hsl(var(--primary))" />
            <circle cx="60%" cy="70%" r="2.5" fill="hsl(var(--secondary))" />
          </svg>

          <div className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl relative">
            <Link to="/blog" className="text-primary text-sm font-medium inline-flex items-center gap-1.5 mb-6 hover:gap-2.5 transition-all">
              <ArrowLeft className="w-3.5 h-3.5" /> All articles
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary/10 text-primary border-0 text-xs font-bold px-3 py-1.5">
                <Calendar className="w-3 h-3 mr-1.5" />
                {new Date(article.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </Badge>
              {viewCount !== null && (
                <Badge className="bg-muted text-muted-foreground border-0 text-xs px-3 py-1.5">
                  <Eye className="w-3 h-3 mr-1.5" /> {viewCount.toLocaleString()} view{viewCount !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
              {article.title}
            </h1>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>

        <article className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">
          <div
            className="prose prose-lg max-w-none text-foreground/85 
              prose-headings:font-display prose-headings:text-foreground prose-headings:font-semibold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:mb-4
              prose-li:leading-relaxed
              prose-strong:text-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {slug && <SocialShareButtons title={article.title} slug={slug} />}
          {slug && <BlogHelpfulness slug={slug} />}
          {slug && <RelatedArticles currentSlug={slug} />}
          {slug && <BlogComments slug={slug} />}
        </article>
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
