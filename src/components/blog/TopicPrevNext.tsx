import { Link } from "react-router-dom";
import { topicNeighbours } from "@/lib/blog/guideLinks";
import { BLOG_CATEGORY_LABELS, type BlogCategoryKey } from "@/data/blogCategories";

export default function TopicPrevNext({ slug }: { slug: string }) {
  const { topic, prev, next } = topicNeighbours(slug);
  if (!prev && !next) return null;
  const label = BLOG_CATEGORY_LABELS[topic as BlogCategoryKey] || "this topic";
  return (
    <nav aria-label={`More in ${label}`} className="my-8 grid gap-3 sm:grid-cols-2 print:hidden">
      {prev && (
        <Link to={`/blog/${prev.slug}`} className="rounded-xl border border-border/60 p-4 hover:border-primary/40">
          <span className="block text-xs text-muted-foreground">← Previous in {label}</span>
          <span className="block font-semibold text-foreground">{prev.title}</span>
        </Link>
      )}
      {next && (
        <Link to={`/blog/${next.slug}`} className="rounded-xl border border-border/60 p-4 hover:border-primary/40 sm:text-right">
          <span className="block text-xs text-muted-foreground">Next in {label} →</span>
          <span className="block font-semibold text-foreground">{next.title}</span>
        </Link>
      )}
      <Link to={`/blog/category/${topic}`} className="sm:col-span-2 text-sm text-primary underline underline-offset-2">
        All guides in {label}
      </Link>
    </nav>
  );
}
