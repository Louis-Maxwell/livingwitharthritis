import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BlogIndex from "./BlogIndex";
import SeoHead from "@/components/SeoHead";
import { useConditionArticles } from "@/hooks/useBlogArticles";
import categoryMeta from "@/data/blogCategoryMeta.json";
import {
  BLOG_CATEGORY_KEYS,
  LEGACY_BLOG_CATEGORY_KEYS,
  blogCategoryAliases,
  BLOG_CATEGORY_LABELS,
  type BlogCategoryKey,
} from "@/data/blogCategories";

const validCategories = new Set<string>(BLOG_CATEGORY_KEYS);

const CATEGORY_META = categoryMeta as Record<BlogCategoryKey, { title: string; description: string }>;

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
    60,
  );

  if (!category || !canonicalKey) {
    const legacy = LEGACY_BLOG_CATEGORY_KEYS[key];
    return <Navigate to={legacy ? `/blog/category/${legacy}` : "/blog"} replace />;
  }

  const meta = CATEGORY_META[canonicalKey];
  const categoryLabel = BLOG_CATEGORY_LABELS[canonicalKey];
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
