import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { splitHtmlAtMiddleH2 } from "@/lib/splitHtmlAtMiddleH2";
import RecommendedNextStep from "@/components/RecommendedNextStep";

interface ArticleHtmlWithNextStepProps {
  html: string;
  /** Current route, used to choose the "Recommended next step" links. */
  path: string;
  className?: string;
  as?: "article" | "div";
}

/**
 * Renders a guide's HTML body with the "Recommended next step" module at the
 * section boundary nearest the halfway point. Static markup, so it prerenders.
 */
export default function ArticleHtmlWithNextStep({ html, path, className, as = "article" }: ArticleHtmlWithNextStepProps) {
  const { first, second } = splitHtmlAtMiddleH2(html);
  const Tag = as;
  return (
    <Tag className={className}>
      <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(first) }} />
      {second && <RecommendedNextStep path={path} placement="mid" />}
      {second && <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(second) }} />}
    </Tag>
  );
}
