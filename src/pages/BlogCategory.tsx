import { useParams, Navigate } from "react-router-dom";
import BlogIndex from "./BlogIndex";

const validCategories = ["exercise", "nutrition", "lifestyle", "health", "supplements", "treatment"];

const BlogCategory = () => {
  const { category } = useParams<{ category: string }>();

  if (!category || !validCategories.includes(category.toLowerCase())) {
    return <Navigate to="/blog" replace />;
  }

  return <BlogIndex initialCategory={category} />;
};

export default BlogCategory;
