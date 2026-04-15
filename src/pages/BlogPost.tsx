import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Eye, BookOpen, ChevronRight } from "lucide-react";
import { useBlogArticle } from "@/hooks/useBlogArticles";
import { useBlogViews } from "@/hooks/useBlogViews";
import BlogComments from "@/components/BlogComments";
import BlogHelpfulness from "@/components/BlogHelpfulness";
import RelatedArticles from "@/components/RelatedArticles";
import SocialShareButtons from "@/components/SocialShareButtons";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ScrollProgress from "@/components/ScrollProgress";
import ContinueReadingBar from "@/components/ContinueReadingBar";
import HealthToolsCTA from "@/components/HealthToolsCTA";
import { Skeleton } from "@/components/ui/skeleton";
import { marked } from "marked";

function markdownToHtml(md: string): string {
  // If content already looks like HTML, return as-is
  if (md.trim().startsWith("<")) return md;
  // Database may store literal \n instead of real newlines
  const normalized = md.replace(/\\n/g, "\n");
  return marked.parse(normalized, { async: false }) as string;
}

function getReadingTime(html: string) {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = useBlogArticle(slug);
  const viewCount = useBlogViews(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 md:px-10 py-24 max-w-[720px]">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full" />
        </main>
        <Footer />
      </div>
    );
  }

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

  const htmlContent = markdownToHtml(article.content);
  const readingTime = getReadingTime(htmlContent);
  const publishDate = new Date(article.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const metaTitle = article.meta_title || article.title;
  const metaDesc = article.meta_description || article.excerpt;
  const authorName = article.author || "Living With Arthritis Clinical Team";
  const authorCreds = article.author_credentials || "Evidence-based health content";
  const reviewerName = article.reviewed_by || "Dr. Amina Patel";
  const reviewerCreds = article.reviewer_credentials || "Consultant Rheumatologist";

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        {article.keywords && <meta name="keywords" content={article.keywords} />}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
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
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/og-blog-default.jpg" />
        <meta name="geo.region" content="GB" />
        <link rel="canonical" href={`https://livingwitharthritis.org.uk/blog/${slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "headline": article.title,
          "description": metaDesc,
          "datePublished": article.date,
          "dateModified": article.date,
          "author": { "@type": "Organization", "name": authorName, "url": "https://livingwitharthritis.org.uk" },
          "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": "https://livingwitharthritis.org.uk", "logo": { "@type": "ImageObject", "url": "https://livingwitharthritis.org.uk/favicon.ico" } },
          "inLanguage": "en-GB",
          "mainEntityOfPage": `https://livingwitharthritis.org.uk/blog/${slug}`,
          "about": { "@type": "MedicalCondition", "name": "Arthritis", "alternateName": ["Osteoarthritis", "Rheumatoid Arthritis"] },
          "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } },
          "lastReviewed": article.date,
          "reviewedBy": { "@type": "Person", "name": reviewerName, "jobTitle": reviewerCreds },
          "medicalAudience": { "@type": "MedicalAudience", "audienceType": "Patient" }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.title,
          "description": metaDesc,
          "image": "https://livingwitharthritis.org.uk/images/og-blog-default.jpg",
          "datePublished": article.date,
          "dateModified": article.date,
          "author": { "@type": "Organization", "name": authorName, "url": "https://livingwitharthritis.org.uk" },
          "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": "https://livingwitharthritis.org.uk", "logo": { "@type": "ImageObject", "url": "https://livingwitharthritis.org.uk/favicon.ico", "width": 512, "height": 512 } },
          "mainEntityOfPage": { "@type": "WebPage", "@id": `https://livingwitharthritis.org.uk/blog/${slug}` },
          "wordCount": htmlContent.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length,
          "inLanguage": "en-GB",
          "isAccessibleForFree": true,
          "articleSection": "Health"
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
        <ScrollProgress />
        <Header />

        <header className="border-b border-border/20">
          <div className="container mx-auto px-6 md:px-10 max-w-[720px]">
            <nav className="pt-6 pb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground/60 truncate max-w-[200px]">{article.title}</span>
            </nav>

            <div className="pb-10 md:pb-14">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
                <time dateTime={article.date} className="font-medium">{publishDate}</time>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span>{readingTime} min read</span>
                {viewCount !== null && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {viewCount.toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              <h1 className="font-display text-[1.75rem] md:text-[2.5rem] lg:text-[3rem] font-extrabold text-foreground leading-[1.15] tracking-tight mb-6">
                {article.title}
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-[600px]">
                {metaDesc}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-primary/15">
                    <AvatarFallback className="bg-primary/8 text-primary font-bold text-xs">LWA</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">{authorName}</p>
                    <p className="text-xs text-muted-foreground">{authorCreds}</p>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-8 bg-border/40" />

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 w-fit">
                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">
                    Reviewed by {reviewerName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <article className="container mx-auto px-6 md:px-10 py-10 md:py-14 max-w-[720px]">
          <TableOfContents html={htmlContent} />

          <div
            className="blog-prose prose prose-lg max-w-none text-foreground/90
              prose-headings:font-display prose-headings:text-foreground prose-headings:font-bold prose-headings:scroll-mt-24
              prose-h2:text-[1.5rem] prose-h2:md:text-[1.75rem] prose-h2:mt-14 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border/15
              prose-h3:text-lg prose-h3:md:text-xl prose-h3:mt-10 prose-h3:mb-3
              prose-p:leading-[1.9] prose-p:mb-6 prose-p:text-foreground/80
              prose-li:leading-[1.85] prose-li:text-foreground/80 prose-li:mb-1
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-primary prose-a:font-medium prose-a:underline prose-a:underline-offset-3 prose-a:decoration-primary/30 hover:prose-a:decoration-primary prose-a:transition-colors
              prose-blockquote:border-l-[3px] prose-blockquote:border-l-primary prose-blockquote:bg-primary/[0.03] prose-blockquote:rounded-r-lg prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-foreground/85 prose-blockquote:font-medium prose-blockquote:my-8
              prose-img:rounded-xl prose-img:shadow-sm prose-img:my-8
              prose-ul:my-6 prose-ol:my-6
              first:prose-p:first-letter:text-5xl first:prose-p:first-letter:font-bold first:prose-p:first-letter:text-primary first:prose-p:first-letter:float-left first:prose-p:first-letter:mr-3 first:prose-p:first-letter:mt-1 first:prose-p:first-letter:leading-none"
            dangerouslySetInnerHTML={{ __html: addHeadingIds(htmlContent) }}
          />

          <HealthToolsCTA />

          <div className="mt-14 pt-8 border-t border-border/20">
            {slug && <SocialShareButtons title={article.title} slug={slug} />}
            {slug && <BlogHelpfulness slug={slug} />}
          </div>

          {slug && <RelatedArticles currentSlug={slug} />}
          {slug && <BlogComments slug={slug} />}
        </article>
        {slug && <ContinueReadingBar currentSlug={slug} />}
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
