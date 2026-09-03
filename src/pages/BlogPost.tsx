import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { BLOG_SLUG_REDIRECTS } from "@/data/blogRedirects";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MedicalReviewBadge from "@/components/MedicalReviewBadge";
import { Eye, BookOpen, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sanitizeHtml } from "@/utils/sanitizeHtml";

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
import CrossLinkBanner from "@/components/CrossLinkBanner";
import InternalLinks from "@/components/InternalLinks";
import { Skeleton } from "@/components/ui/skeleton";
import { marked } from "marked";
import DOMPurify from "dompurify";
import ArticleCitations, { type Citation } from "@/components/blog/ArticleCitations";
import AnswerBox from "@/components/seo/AnswerBox";
import NextReadStrip from "@/components/NextReadStrip";
import KeyTakeaways from "@/components/article/KeyTakeaways";
import FeedbackPoll from "@/components/article/FeedbackPoll";
import InlineRelatedStrip from "@/components/article/InlineRelatedStrip";
import ArticleFaqSection from "@/components/article/ArticleFaqSection";
import ArticleClosingCTA from "@/components/article/ArticleClosingCTA";
import ArticleVoiceover from "@/components/article/ArticleVoiceover";
import { renderCallouts } from "@/components/article/Callouts";
import { markVisited } from "@/lib/visitedArticles";
import { getArticleImages, coverImage } from "@/lib/articleImages";
import NotFound from "@/pages/NotFound";

/**
 * Remove any H2/H3 whose text ends in "?" plus everything up to the next
 * heading. These get rendered as a dedicated FAQ block below the body, so
 * we drop them from the main prose to prevent duplicate content.
 */
function stripQuestionHeadings(html: string): string {
  return html.replace(
    /<h([23])[^>]*>([^<]*\?)\s*<\/h\1>[\s\S]*?(?=<h[1-3][^>]*>|$)/gi,
    "",
  );
}

/** Build a fallback direct-answer sentence from the first substantive paragraph. */
function firstParagraphSummary(html: string): string {
  const m = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (!m) return "";
  const text = m[1].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length < 60) return "";
  // First 1–2 sentences, capped at ~280 chars
  const sentences = text.split(/(?<=[.!?])\s+/).slice(0, 2).join(" ");
  return sentences.length > 300 ? sentences.slice(0, 297) + "…" : sentences;
}



function markdownToHtml(md: string): string {
  // If content already looks like HTML, sanitize and return
  if (md.trim().startsWith("<")) {
    return DOMPurify.sanitize(md, { USE_PROFILES: { html: true } });
  }
  // Database may store literal \n instead of real newlines
  const normalized = md.replace(/\\n/g, "\n");
  const rawHtml = marked.parse(normalized, { async: false }) as string;
  return DOMPurify.sanitize(rawHtml, { USE_PROFILES: { html: true } });
}

function getReadingTime(html: string) {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}

/**
 * Extract Q&A pairs from rendered HTML for FAQPage JSON-LD.
 * Looks for headings (h2/h3) ending in "?" followed by paragraph(s) of answer text.
 * Returns only questions that are present in the article and later rendered
 * in the visible FAQ section. Never manufacture fallback questions for schema.
 */
function extractFaqs(html: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const headingRe = /<h[23][^>]*>([\s\S]*?)<\/h[23]>([\s\S]*?)(?=<h[23][^>]*>|$)/gi;
  let m: RegExpExecArray | null;
  while ((m = headingRe.exec(html)) !== null) {
    const qRaw = m[1].replace(/<[^>]*>/g, "").trim();
    if (!qRaw.endsWith("?")) continue;
    const aRaw = m[2]
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 500);
    if (qRaw && aRaw && aRaw.length > 30) {
      faqs.push({ question: qRaw, answer: aRaw });
    }
    if (faqs.length >= 6) break;
  }
  return faqs;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const redirectTo = slug ? BLOG_SLUG_REDIRECTS[slug] : undefined;
  const { data: article, isLoading } = useBlogArticle(redirectTo ? undefined : slug);
  const viewCount = useBlogViews(redirectTo ? undefined : slug);

  // Mark this article as visited after 5s dwell so bounces don't pollute the set.
  useEffect(() => {
    if (!slug || redirectTo) return;
    const t = window.setTimeout(() => markVisited(slug), 5000);
    return () => window.clearTimeout(t);
  }, [slug, redirectTo]);

  if (redirectTo) {
    return <Navigate to={`/blog/${redirectTo}`} replace />;
  }


  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content" className="container mx-auto px-6 md:px-10 py-24 max-w-[860px]">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return <NotFound />;
  }

  const htmlContent = markdownToHtml(article.content);
  const faqs = extractFaqs(htmlContent);
  const bodyForRender = renderCallouts(stripQuestionHeadings(htmlContent));
  const htmlWithIds = addHeadingIds(bodyForRender);
  // Split after the first </h2> so we can inject an inline related-strip mid-article.
  const firstH2End = htmlWithIds.search(/<\/h2>/i);
  const splitAt = firstH2End >= 0 ? firstH2End + "</h2>".length : -1;
  const htmlBeforeStrip = splitAt > 0 ? htmlWithIds.slice(0, splitAt) : htmlWithIds;
  const htmlAfterStrip = splitAt > 0 ? htmlWithIds.slice(splitAt) : "";
  const articleImages = getArticleImages(article.category, article.title, slug || article.title);
  const cover = coverImage(article.category, article.title, slug || article.title);
  const coverAbsolute = cover?.src
    ? `https://livingwitharthritis.org.uk${cover.src}`
    : "https://livingwitharthritis.org.uk/images/og-blog-default.webp";
  const directAnswer = article.direct_answer || firstParagraphSummary(htmlContent);
  const readingTime = getReadingTime(htmlContent);
  const publishDate = new Date(article.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const updatedAtRaw = (article as { updated_at?: string | null }).updated_at ?? null;
  const updatedDate = updatedAtRaw
    ? new Date(updatedAtRaw).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : null;
  const showUpdated = !!updatedAtRaw && new Date(updatedAtRaw).toDateString() !== new Date(article.date).toDateString();
  const metaTitle = article.meta_title || article.title;
  const metaDesc = article.meta_description || article.excerpt;
  const pageUrl = `https://livingwitharthritis.org.uk/blog/${slug}`;
  const authorName = article.author || "Living With Arthritis UK Editorial Team";
  const rawAuthorCreds = article.author_credentials || "Editorial content";
  const authorCreds = /PH123456/i.test(rawAuthorCreds)
    ? "Editorial content"
    : rawAuthorCreds;
  const MAXWELL_NAME = "Maxwell";
  const MAXWELL_CREDS = "First Contact Practitioner, HCPC PH128483, CSP member";
  const rawReviewerName = article.reviewed_by || "";
  const rawReviewerCreds = article.reviewer_credentials || "";
  // Normalise any legacy placeholder credentials to the verified clinician
  const isPlaceholderReviewer =
    /sarah\s+jennings/i.test(rawReviewerName) || /PH123456/i.test(rawReviewerCreds);
  const reviewerName = isPlaceholderReviewer ? MAXWELL_NAME : rawReviewerName;
  const reviewerCreds = isPlaceholderReviewer ? MAXWELL_CREDS : rawReviewerCreds;
  const hasVerifiedReviewer =
    reviewerName === MAXWELL_NAME && /\bPH128483\b/.test(reviewerCreds);
  const citations = Array.isArray(article.citations)
    ? article.citations.filter(
        (citation): citation is Citation =>
          Boolean(citation?.label && /^https?:\/\//i.test(citation.url)),
      )
    : [];
  const dateModifiedIso = updatedAtRaw || article.date;

  const maxwellSchemaFields = {
    "identifier": "HCPC PH128483",
    "url": "https://livingwitharthritis.org.uk/authors/maxwell",
    "affiliation": { "@type": "Organization", "name": "Chartered Society of Physiotherapy" },
  };
  const authorSchema =
    authorName === "Maxwell" && /\bPH128483\b/.test(authorCreds)
      ? {
          "@type": "Person",
          "name": authorName,
          "jobTitle": authorCreds,
          ...maxwellSchemaFields,
        }
      : {
          "@type": "Organization",
          "name": authorName,
        };
  const reviewedBySchema = hasVerifiedReviewer
    ? {
        "@type": "Person",
        "name": reviewerName,
        "jobTitle": reviewerCreds,
        ...maxwellSchemaFields,
      }
    : null;
  const citationSchema = citations.map((citation) => ({
    "@type": "CreativeWork",
    "name": citation.label,
    "url": citation.url,
    ...(citation.publisher
      ? {
          "publisher": {
            "@type": "Organization",
            "name": citation.publisher,
          },
        }
      : {}),
  }));

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
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content={coverAbsolute} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={article.title} />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:modified_time" content={dateModifiedIso} />
        <meta property="article:section" content={article.category || "Health"} />
        <meta property="article:tag" content="arthritis" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={coverAbsolute} />
        <meta name="geo.region" content="GB" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "@id": `${pageUrl}#webpage`,
          "url": pageUrl,
          "headline": article.title,
          "description": metaDesc,
          "datePublished": article.date,
          "dateModified": dateModifiedIso,
          "author": authorSchema,
          "publisher": { "@id": "https://livingwitharthritis.org.uk/#organization" },
          "inLanguage": "en-GB",
          "mainEntity": { "@id": `${pageUrl}#article` },
          "about": { "@type": "MedicalCondition", "name": "Arthritis" },
          "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } },
          ...(reviewedBySchema ? { "reviewedBy": reviewedBySchema } : {}),
          "medicalAudience": { "@type": "MedicalAudience", "audienceType": "Patient" },
          "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".speakable-intro"] },
          ...(citationSchema.length ? { "citation": citationSchema } : {})
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${pageUrl}#article`,
          "headline": article.title,
          "description": metaDesc,
          "image": coverAbsolute,
          "datePublished": article.date,
          "dateModified": dateModifiedIso,
          "author": authorSchema,
          "publisher": { "@id": "https://livingwitharthritis.org.uk/#organization" },
          "mainEntityOfPage": { "@id": `${pageUrl}#webpage` },
          "wordCount": htmlContent.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length,
          "inLanguage": "en-GB",
          "isAccessibleForFree": true,
          "articleSection": article.category || "Health",
          "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".speakable-intro"] },
          ...(reviewedBySchema ? { "reviewedBy": reviewedBySchema } : {}),
          ...(citationSchema.length ? { "citation": citationSchema } : {})
        })}</script>

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://livingwitharthritis.org.uk/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://livingwitharthritis.org.uk/blog" },
            { "@type": "ListItem", "position": 3, "name": article.title, "item": pageUrl }
          ]
        })}</script>
        {faqs.length >= 2 && (
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${pageUrl}#faq`,
            "url": pageUrl,
            "inLanguage": "en-GB",
            "mainEntity": faqs.map((f) => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": { "@type": "Answer", "text": f.answer }
            }))
          })}</script>
        )}
      </Helmet>
      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <div className="no-print"><Header /></div>

        <article itemScope itemType="https://schema.org/MedicalWebPage">


        <header className="border-b border-border/20">
          <div className="container mx-auto px-6 md:px-10 max-w-[860px]">
            <nav className="pt-6 pb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground/60 truncate max-w-[200px]">{article.title}</span>
            </nav>

            <div className="pb-10 md:pb-14">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-5">
                <span>
                  Published{" "}
                  <time dateTime={article.date} itemProp="datePublished" className="font-medium text-foreground/80">
                    {publishDate}
                  </time>
                </span>
                {showUpdated && updatedDate && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <span>
                      Updated{" "}
                      <time dateTime={updatedAtRaw!} itemProp="dateModified" className="font-medium text-foreground/80">
                        {updatedDate}
                      </time>
                    </span>
                  </>
                )}
                {!showUpdated && updatedAtRaw && (
                  <time dateTime={updatedAtRaw} itemProp="dateModified" className="sr-only">
                    {updatedDate}
                  </time>
                )}
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

                {hasVerifiedReviewer && (
                  <>
                    <div className="hidden sm:block w-px h-8 bg-border/40" />
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 w-fit">
                      <BookOpen className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium text-primary">
                        Reviewed by {reviewerName}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <ArticleVoiceover slug={article.slug} className="mt-6 max-w-[640px]" />

              {slug && (
                <SocialShareButtons title={article.title} slug={slug} instance="header" />
              )}

            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 md:px-10 max-w-[860px]">
          <figure className="mt-6 md:mt-8 mb-2">
            <img
              src={articleImages[0].src}
              alt={articleImages[0].alt}
              width={1600}
              height={900}
              loading="eager"
              decoding="async"
              className="w-full h-auto rounded-2xl shadow-sm object-cover aspect-[16/9]"
            />
            <figcaption className="text-xs text-muted-foreground/70 mt-2">
              {articleImages[0].credit}
            </figcaption>
          </figure>
        </div>

        <main id="main-content" className="container mx-auto px-6 md:px-10 py-10 md:py-14 max-w-[860px]">
          {directAnswer && (
            <AnswerBox
              question={article.title.replace(/[?.!]+$/, "").trim() + "?"}
            >
              {directAnswer}
            </AnswerBox>
          )}

          {/* Print header: only visible when saving to PDF / printing */}
          <div className="print-only mb-6 pb-4 border-b border-black">
            <div className="flex items-center justify-between text-xs">
              <strong>Living With Arthritis UK</strong>
              <span>livingwitharthritis.org.uk</span>
            </div>
            {hasVerifiedReviewer && (
              <div className="text-[10px] mt-1">
                Reviewed by {reviewerName}, {reviewerCreds}
              </div>
            )}
          </div>

          <div className="no-print mb-6 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              aria-label="Download this article as PDF"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>

          {hasVerifiedReviewer && (
            <MedicalReviewBadge
              reviewer={reviewerName}
              title="First Contact Practitioner"
              credential="HCPC PH128483"
              authorSlug="maxwell"
              date={updatedDate ?? publishDate}
            />
          )}

          <KeyTakeaways html={htmlContent} title={article.title} />
          <TableOfContents html={htmlContent} />



          <section
            aria-label="Article body"
            itemProp="articleBody"
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
          >
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(htmlBeforeStrip) }} />
            {htmlAfterStrip && (
              <figure className="not-prose my-8">
                <img
                  src={articleImages[1].src}
                  alt={articleImages[1].alt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-xl shadow-sm object-cover aspect-[3/2]"
                />
                <figcaption className="text-xs text-muted-foreground/70 mt-2">
                  {articleImages[1].credit}
                </figcaption>
              </figure>
            )}
            {slug && htmlAfterStrip && (
              <InlineRelatedStrip
                currentSlug={slug}
                currentCategory={article.category}
                currentTitle={article.title}
                currentExcerpt={article.excerpt}
                currentKeywords={article.keywords ?? undefined}
              />
            )}
            {htmlAfterStrip && (
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(htmlAfterStrip) }} />
            )}

            <figure className="not-prose my-8">
              <img
                src={articleImages[2].src}
                alt={articleImages[2].alt}
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-xl shadow-sm object-cover aspect-[3/2]"
              />
              <figcaption className="text-xs text-muted-foreground/70 mt-2">
                {articleImages[2].credit}
              </figcaption>
            </figure>
          </section>

          <ArticleFaqSection faqs={faqs} />
          <ArticleClosingCTA title={article.title} />

          {/* Print footer: only visible when saving to PDF / printing */}
          <div className="print-only mt-8 pt-4 border-t border-black text-[10px] leading-snug">
            <p>
              Source: https://livingwitharthritis.org.uk/blog/{slug}
            </p>
            <p>
              © Living With Arthritis UK. For personal and informational use only.
              This article is not a substitute for professional medical advice —
              always consult your GP or a qualified clinician.
            </p>
          </div>



          <ArticleCitations citations={citations} />

          {slug && <FeedbackPoll slug={slug} title={article.title} />}

          <HealthToolsCTA />


          <footer className="mt-14 pt-8 border-t border-border/20">
            {slug && <SocialShareButtons title={article.title} slug={slug} instance="footer" />}
            {slug && <BlogHelpfulness slug={slug} />}

            <CrossLinkBanner preset="blog" exclude={`/blog/${slug}`} title="Related resources" />

            {slug && (
              <RelatedArticles
                currentSlug={slug}
                currentCategory={article.category}
                currentTitle={article.title}
                currentExcerpt={article.excerpt}
                currentKeywords={article.keywords ?? undefined}
                preferUnvisited
              />

            )}
            {slug && <BlogComments slug={slug} />}
          </footer>
        </main>
        </article>
        <div className="no-print">
          {slug && <ContinueReadingBar currentSlug={slug} />}
          <InternalLinks />
          <NextReadStrip currentPath={`/blog/${slug}`} heading="Keep reading arthritis insights" />
          <Footer />
        </div>

      </div>

    </>
  );
};

export default BlogPost;
