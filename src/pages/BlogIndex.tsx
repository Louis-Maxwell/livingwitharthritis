import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    slug: "best-diet-for-joint-pain-uk",
    title: "Best Diet for Joint Pain in the UK",
    excerpt: "Discover which anti-inflammatory foods help ease joint pain and stiffness, based on evidence recommended by NHS-aligned health professionals.",
    date: "2026-02-20",
  },
  {
    slug: "nhs-arthritis-exercises",
    title: "NHS-Recommended Arthritis Exercises",
    excerpt: "A guide to low-impact exercises endorsed by UK physiotherapists for managing osteoarthritis and rheumatoid arthritis symptoms.",
    date: "2026-02-18",
  },
  {
    slug: "osteoarthritis-symptoms-uk",
    title: "Osteoarthritis Symptoms & When to See Your GP",
    excerpt: "Recognise the early signs of osteoarthritis, understand UK treatment pathways, and learn when to seek NHS support.",
    date: "2026-02-15",
  },
  {
    slug: "arthritis-supplements-uk",
    title: "Best Supplements for Arthritis in the UK",
    excerpt: "An evidence-based review of glucosamine, collagen, turmeric and omega-3 supplements available in the UK for joint health.",
    date: "2026-02-12",
  },
  {
    slug: "arthritis-medication-uk",
    title: "Understanding Arthritis Medication in the UK",
    excerpt: "A plain-English guide to prescription and over-the-counter arthritis medications available on the NHS and in UK pharmacies.",
    date: "2026-02-10",
  },
];

const BlogIndex = () => (
  <>
    <Helmet>
      <title>Arthritis Blog UK – Joint Pain, Diet & Exercise Advice</title>
      <meta name="description" content="Expert UK arthritis articles covering anti-inflammatory diet, NHS exercises, supplements and osteoarthritis management. Free guidance for people living with arthritis." />
      <meta name="keywords" content="arthritis blog UK, joint pain advice, NHS arthritis, anti-inflammatory diet UK, osteoarthritis exercises" />
      <meta property="og:locale" content="en_GB" />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/blog" />
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 md:px-10 py-16 md:py-24">
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
          Arthritis Advice &amp; Guidance
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-12 text-lg">
          Evidence-based articles to help UK residents manage arthritis, reduce joint pain and live well.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 hover:shadow-medium transition-all duration-300"
            >
              <time className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
              <h2 className="font-display text-xl font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read more <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default BlogIndex;
