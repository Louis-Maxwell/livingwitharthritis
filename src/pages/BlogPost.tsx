import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { blogArticles } from "@/data/blogArticles";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles[slug ?? ""];

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
        <meta name="geo.region" content="GB" />
        <link rel="canonical" href={`https://livingwitharthritis.org.uk/blog/${slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.title,
          "description": article.metaDescription,
          "datePublished": article.date,
          "author": { "@type": "Organization", "name": "Living With Arthritis" },
          "publisher": {
            "@type": "Organization",
            "name": "Living With Arthritis",
            "url": "https://livingwitharthritis.org.uk"
          },
          "inLanguage": "en-GB",
          "mainEntityOfPage": `https://livingwitharthritis.org.uk/blog/${slug}`
        })}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <article className="container mx-auto px-6 md:px-10 py-16 md:py-24 max-w-3xl">
          <Link to="/blog" className="text-primary text-sm font-medium inline-flex items-center gap-1.5 mb-8 hover:gap-2.5 transition-all">
            <ArrowLeft className="w-3.5 h-3.5" /> All articles
          </Link>
          <time className="text-xs text-muted-foreground block mb-3">
            {new Date(article.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </time>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
            {article.title}
          </h1>
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
        </article>
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
