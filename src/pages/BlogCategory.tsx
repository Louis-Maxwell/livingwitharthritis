import { useParams, Navigate } from "react-router-dom";
import BlogIndex from "./BlogIndex";
import SeoHead from "@/components/SeoHead";

const validCategories = ["exercise", "nutrition", "lifestyle", "health", "mental-health", "supplements", "treatment"];

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  exercise: {
    title: "Arthritis Exercise Articles & Guides",
    description: "Evidence-based articles on safe exercise for arthritis — strength, mobility, low-impact cardio and joint-protective movement, written for UK patients.",
  },
  nutrition: {
    title: "Anti-Inflammatory Nutrition for Arthritis",
    description: "Mediterranean diet, anti-inflammatory recipes and food guidance for people living with arthritis in the UK. Written by clinicians.",
  },
  lifestyle: {
    title: "Lifestyle Tips for Living With Arthritis",
    description: "Practical lifestyle advice for arthritis — sleep, stress, work, daily routines and relationships. UK-focused guidance from our team.",
  },
  health: {
    title: "Arthritis Health & Wellbeing Articles",
    description: "Trusted UK arthritis health articles — symptoms, flare-ups, mental health, care pathways and clinical updates from HCPC-registered authors.",
  },
  supplements: {
    title: "Supplements for Arthritis: Evidence & Reviews",
    description: "Independent reviews of arthritis supplements — turmeric, omega-3, glucosamine, collagen and more. Evidence-graded by UK clinicians.",
  },
  treatment: {
    title: "Arthritis Treatment Articles & Updates",
    description: "Latest arthritis treatment articles — medications, public healthcare pathways, physiotherapy, surgery and emerging research, explained for UK patients.",
  },
  "mental-health": {
    title: "Mental Health & Arthritis: UK Guides",
    description: "Living with arthritis affects mental wellbeing. Read evidence-based UK guides on mood, anxiety, sleep and coping with chronic pain.",
  },
};

const BlogCategory = () => {
  const { category } = useParams<{ category: string }>();

  if (!category || !validCategories.includes(category.toLowerCase())) {
    return <Navigate to="/blog" replace />;
  }

  const key = category.toLowerCase();
  const meta = CATEGORY_META[key];

  const categoryLabel = meta?.title?.split(":")[0]?.split("Articles")[0]?.trim() || key;
  const url = `https://livingwitharthritis.org.uk/blog/category/${key}`;

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
        </Helmet>
      )}
      <BlogIndex initialCategory={category} />
    </>
  );
};

export default BlogCategory;
