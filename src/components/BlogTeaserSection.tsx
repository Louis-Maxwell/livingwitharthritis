import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { articles, categoryColors } from "@/data/articles";

const PREVIEW_ARTICLES = articles.slice(0, 3);

const BlogTeaserSection = () => (
  <section className="py-20 lg:py-24 bg-muted/30">
    <div className="container mx-auto px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
      >
        <div>
          <span className="section-label text-primary mb-3 block">UK Arthritis Guides</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground leading-tight">
            Evidence-based advice for{" "}
            <span className="text-primary italic">every patient</span>
          </h2>
        </div>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline shrink-0"
        >
          View all 10 articles <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PREVIEW_ARTICLES.map((article, i) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link
              to={`/blog/${article.slug}`}
              className="group flex flex-col h-full rounded-2xl border border-border/50 bg-card overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-primary/6 via-secondary/3 to-transparent flex items-center justify-center p-8 min-h-[120px]">
                <BookOpen
                  className="w-10 h-10 text-primary/20 group-hover:text-primary/35 transition-colors duration-300"
                  strokeWidth={1.5}
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[article.category]}`}
                  >
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </span>
                </div>
                <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 leading-snug line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3 mb-4">
                  {article.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm mt-auto">
                  Read guide{" "}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BlogTeaserSection;
