import { Link } from "react-router-dom";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { getClusterForPath, getClusterForSlug } from "@/data/topicClusters";
import { trackInternalLink } from "@/lib/analytics";

interface Props {
  title: string;
  category?: string;
  slug?: string;
}

/** A short, relevant next step after the reader has received their answer. */
const ArticleClosingCTA = ({ title, category, slug }: Props) => {
  const cluster = (slug ? getClusterForPath(`/blog/${slug}`) : null)
    ?? getClusterForSlug(slug ?? "", [title, category].filter(Boolean).join(" "));
  const actions = [
    {
      to: cluster?.pillarPath ?? "/guides",
      label: cluster?.pillarTitle ?? "Explore practical arthritis guides",
      detail: "Read the full guide for this topic",
    },
    {
      to: cluster?.toolPath ?? "/self-help",
      label: cluster?.toolLabel ?? "Explore self-help tools",
      detail: "Find a practical next step",
    },
    { to: "/contact", label: "Contact our team", detail: "Ask about our support and resources" },
  ].filter((item, index, items) => items.findIndex(other => other.to === item.to) === index);

  return (
    <section aria-label="Find support" className="not-prose mt-10 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5 md:p-6">
      <h2 className="mb-2 flex items-center gap-2 font-display text-xl font-medium text-foreground">
        <HeartHandshake className="h-5 w-5 text-primary" aria-hidden="true" />
        What would help you next?
      </h2>
      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
        Choose a useful next step after reading this article. Our resources provide educational support and do not replace advice from your clinician.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {actions.map(({ to, label, detail }) => (
          <Link key={to} to={to} onClick={() => trackInternalLink(label, to)}
            className="group flex min-h-11 flex-col rounded-xl border border-border/50 bg-card p-4 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <span className="font-semibold text-foreground group-hover:text-primary">{label}</span>
            <span className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</span>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">Explore <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ArticleClosingCTA;
