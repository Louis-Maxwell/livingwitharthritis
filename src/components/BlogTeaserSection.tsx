import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const posts = [
  {
    title: "How Tai Chi Eases Arthritis Pain",
    excerpt:
      "Research shows gentle Tai Chi practice can reduce joint pain and stiffness by up to 29% in people with knee osteoarthritis.",
    href: "#",
  },
  {
    title: "Best Anti-Inflammatory Foods",
    excerpt:
      "From fatty fish to berries, discover the evidence-based foods that help calm systemic inflammation and protect your joints.",
    href: "#",
  },
  {
    title: "Exercise Myths Busted",
    excerpt:
      "Contrary to old advice, low-impact exercise does not worsen arthritis — it's one of the most effective treatments available.",
    href: "#",
  },
];

export default function BlogTeaserSection() {
  return (
    <section aria-labelledby="blog-teaser-heading" className="space-y-10">
      <div className="text-center space-y-4">
        <h2
          id="blog-teaser-heading"
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Latest Insights
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Evidence-informed articles to help you live better with arthritis
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.title}
            className="bg-card/80 backdrop-blur-sm border border-border/40 rounded-2xl p-7 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col gap-4"
          >
            <h3 className="text-lg font-semibold leading-snug">{post.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed flex-1">
              {post.excerpt}
            </p>
            <Button variant="outline" size="sm" className="self-start gap-2" asChild>
              <a href={post.href} aria-label={`Read more about ${post.title}`}>
                Read more <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
