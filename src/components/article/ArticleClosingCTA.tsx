import { Link } from "react-router-dom";
import { HeartHandshake, ArrowRight } from "lucide-react";

interface Props {
  title: string;
}

/**
 * Closing "Find Support" block matching the layout at the end of the uploaded
 * knee-exercises reference article. Static — makes no medical claims and links
 * to existing on-site support routes only.
 */
const ArticleClosingCTA = ({ title }: Props) => {
  return (
    <section
      aria-label="Find support"
      className="not-prose mt-14 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 md:p-8"
    >
      <div className="flex items-center gap-2 mb-3">
        <HeartHandshake className="w-5 h-5 text-primary" aria-hidden="true" />
        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground m-0">
          Find support for living with arthritis
        </h2>
      </div>
      <p className="text-foreground/85 leading-relaxed mb-5">
        You are not alone. If reading <em>{title}</em> has raised questions
        about your own symptoms, our team and community are here to help —
        from self-management tools to talking with someone who understands.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          to="/self-help"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Explore self-help tools
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
        >
          Talk to us
        </Link>
      </div>
    </section>
  );
};

export default ArticleClosingCTA;
