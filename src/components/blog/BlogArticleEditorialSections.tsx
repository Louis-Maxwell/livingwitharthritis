import type { ReactNode } from "react";
import type { Citation } from "@/components/blog/ArticleCitations";
import type { BlogReviewStatus } from "@/lib/blog/review";
import ArticleCitations from "@/components/blog/ArticleCitations";
import ArticleFaqSection from "@/components/article/ArticleFaqSection";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";

export interface BlogArticleFaq {
  question: string;
  answer: string;
}

/**
 * Shared end-of-article layout for all published guides.
 *
 * Displays only actual sourced references and questions present in content.
 * It never invents FAQs, citations, or clinical review dates.
 * Body sections and licensed images remain managed by the parent page.
 */
export default function BlogArticleEditorialSections({
  faqs,
  citations,
  reviewStatus,
  lastReviewed,
  children,
}: {
  faqs: BlogArticleFaq[];
  citations: Citation[];
  reviewStatus: BlogReviewStatus;
  lastReviewed?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <ArticleFaqSection faqs={faqs} />
      {children}
      <ArticleCitations citations={citations} />
      <div className="mt-10">
        <EducationalDisclaimerBox
          lastReviewed={lastReviewed}
          reviewStatus={reviewStatus}
        />
      </div>
    </>
  );
}
