import { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, Clock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const posts = [
  { slug: "arthritis-and-cold-weather-uk", title: "Arthritis and Cold Weather in the UK: Why Joints Hurt More in Winter", category: "Lifestyle", readTime: "6 min", date: "Mar 2026" },
  { slug: "arthritis-and-mental-health", title: "Arthritis and Mental Health: Breaking the Pain-Mood Cycle", category: "Health", readTime: "7 min", date: "Mar 2026" },
  { slug: "arthritis-friendly-recipes-uk", title: "Anti-Inflammatory Recipes: Easy UK Meals for Joint Health", category: "Nutrition", readTime: "8 min", date: "Mar 2026" },
];

const BlogPreviewSection = memo(() => {
  const navigate = useNavigate();
  return (
    <section className="py-14 lg:py-20 bg-tint-cyan section-divider">
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4"
        >
          <div>
            <span className="section-label text-primary mb-4 block">From Our Blog</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Latest <span className="text-primary italic">articles</span></h2>
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => navigate("/blog")}
            className="text-sm font-bold text-primary flex items-center gap-1.5 tracking-wider uppercase"
          >
            View all 24 articles <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-7">
          {posts.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={`/blog/${p.slug}`} className="block h-full">
                <Card className="p-7 premium-card cursor-pointer group h-full flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4">{p.category}</span>
                  <h3 className="text-base font-display font-semibold text-foreground mb-5 group-hover:text-primary transition-colors duration-300 flex-1">{p.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground/40 font-medium">
                      <span>{p.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime}</span>
                    </div>
                    <span className="text-primary text-xs font-medium inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

BlogPreviewSection.displayName = "BlogPreviewSection";
export default BlogPreviewSection;
