import { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, Clock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const posts = [
  { slug: "arthritis-and-cold-weather-uk", title: "Arthritis and Cold Weather in the UK: Why Joints Hurt More in Winter", category: "Lifestyle", readTime: "6 min", date: "Feb 2026" },
  { slug: "best-diet-for-joint-pain-uk", title: "Best Diet for Joint Pain in the UK", category: "Nutrition", readTime: "7 min", date: "Feb 2026" },
  { slug: "arthritis-flare-up-what-to-do", title: "Arthritis Flare-Up: What to Do When Symptoms Get Worse", category: "Health", readTime: "5 min", date: "Feb 2026" },
];

const BlogPreviewSection = memo(() => {
  const navigate = useNavigate();
  return (
    <section className="py-14 lg:py-20 bg-primary text-primary-foreground section-divider relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4"
        >
          <div>
            <span className="section-label text-primary-foreground/70 mb-4 block">From Our Blog</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground">Latest <span className="italic">articles</span></h2>
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => navigate("/blog")}
            className="text-sm font-bold text-primary-foreground flex items-center gap-1.5 tracking-wider uppercase"
          >
            View all 40+ articles <ArrowRight className="w-4 h-4" />
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
                <Card className="p-7 bg-primary-foreground cursor-pointer group h-full flex flex-col rounded-2xl border-0">
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
