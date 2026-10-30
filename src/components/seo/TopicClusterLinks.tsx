import { Link } from "react-router-dom";
import clusters from "@/data/topicClusterLinks.json";
import { getBlogMeta } from "@/lib/blog/catalog";

/** Hub-level internal links into each arthritis topic cluster. */
export default function TopicClusterLinks() {
  const publishedClusters = clusters.map(cluster => ({
    ...cluster,
    articles: cluster.slugs.flatMap(slug => {
      const article = getBlogMeta(slug);
      return article ? [article] : [];
    }),
  })).filter(cluster => cluster.articles.length > 0);
  return (
    <section aria-labelledby="topic-clusters-heading" className="my-10">
      <h2 id="topic-clusters-heading" className="font-display text-2xl font-bold text-foreground mb-4">
        Browse guides by topic
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {publishedClusters.map((c) => (
          <div key={c.label}>
            <h3 className="font-semibold text-foreground mb-2">{c.label}</h3>
            <ul className="space-y-1 list-disc pl-5">
              {c.articles.map((article) => (
                <li key={article.slug}>
                  <Link to={`/blog/${article.slug}`} className="text-primary underline underline-offset-2">{article.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-4">
        <Link to="/resources/symptom-flare-tracker" className="text-primary underline underline-offset-2 font-semibold">
          Free printable symptom and flare tracker
        </Link>
      </p>
    </section>
  );
}
