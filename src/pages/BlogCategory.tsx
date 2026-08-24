import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BlogIndex from "./BlogIndex";
import SeoHead from "@/components/SeoHead";
import { useConditionArticles } from "@/hooks/useBlogArticles";
import {
  BLOG_CATEGORY_KEYS,
  blogCategoryAliases,
  type BlogCategoryKey,
} from "@/data/blogCategories";

const validCategories = new Set<string>(BLOG_CATEGORY_KEYS);

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  exercise: {
    title: "Arthritis Exercise Articles & Guides",
    description: "Evidence-based articles on safe exercise for arthritis — strength, mobility, low-impact cardio and joint-protective movement, written for UK patients.",
  },
  nutrition: {
    title: "Anti-Inflammatory Nutrition for Arthritis",
    description: "Mediterranean diet, anti-inflammatory recipes and food guidance for people living with arthritis in the UK.",
  },
  lifestyle: {
    title: "Lifestyle Tips for Living With Arthritis",
    description: "Practical lifestyle advice for arthritis — sleep, stress, work, daily routines and relationships. UK-focused guidance from our team.",
  },
  health: {
    title: "Arthritis Health & Wellbeing Articles",
    description: "UK arthritis health articles covering symptoms, flare-ups, mental health, care pathways and treatment updates.",
  },
  supplements: {
    title: "Supplements for Arthritis: Evidence & Reviews",
    description: "Evidence-led reviews of arthritis supplements including turmeric, omega-3, glucosamine and collagen.",
  },
  treatment: {
    title: "Arthritis Treatment Articles & Updates",
    description: "Latest arthritis treatment articles — medications, public healthcare pathways, physiotherapy, surgery and emerging research, explained for UK patients.",
  },
  "mental-health": {
    title: "Mental Health & Arthritis: UK Guides",
    description: "Living with arthritis affects mental wellbeing. Read evidence-based UK guides on mood, anxiety, sleep and coping with chronic pain.",
  },
  frailty: {
    title: "Frailty in Older Adults: UK Guides",
    description: "UK articles on frailty, sarcopenia, falls prevention, nutrition and exercise for older adults.",
  },
};

const BlogCategory = () => {
  const { category } = useParams<{ category: string }>();
  const key = category?.toLowerCase() ?? "";
  const canonicalKey = validCategories.has(key)
    ? (key as BlogCategoryKey)
    : undefined;
  // Hook must run unconditionally (rules-of-hooks) — the invalid-category
  // redirect below happens after this, so it's fine to key it on "" here.
  const { data: catArticles = [] } = useConditionArticles(
    canonicalKey ? blogCategoryAliases(canonicalKey) : [],
    20,
  );

  if (!category || !canonicalKey) {
    return <Navigate to="/blog" replace />;
  }

  const meta = CATEGORY_META[key];
  const categoryLabel = meta?.title?.split(":")[0]?.split("Articles")[0]?.trim() || key;
  const url = `https://livingwitharthritis.org.uk/blog/category/${key}`;

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: meta?.title ?? categoryLabel,
    url,
    itemListElement: catArticles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://livingwitharthritis.org.uk/blog/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <>
      {meta && (
        <SeoHead
          title={meta.title}
          description={meta.description}
          path={`/blog/category/${key}`}
        />
      )}
      {meta && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://livingwitharthritis.org.uk/" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://livingwitharthritis.org.uk/blog" },
              { "@type": "ListItem", "position": 3, "name": categoryLabel, "item": url }
            ]
          })}</script>
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": meta.title,
            "description": meta.description,
            "url": url,
            "inLanguage": "en-GB"
          })}</script>
          {catArticles.length > 0 && (
            <script type="application/ld+json">{JSON.stringify(itemListLd)}</script>
          )}
        </Helmet>
      )}
      <BlogIndex
        initialCategory={category}
        heroTitle={meta?.title}
        heroSubtitle={meta?.description}
      />
    </>
  );
};

export default BlogCategory;
