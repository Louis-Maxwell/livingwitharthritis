import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import videoCtaImage from "@/assets/video-cta-exercise.jpg";

const YOUTUBE_VIDEO_ID = "t4UEYGoZwuw";

const VideoCTASection = memo(() => {
  const [playing, setPlaying] = useState(false);

  const handlePlay = useCallback(() => setPlaying(true), []);
  const handleClose = useCallback(() => setPlaying(false), []);

  return (
    <section className="py-24 lg:py-32 bg-background section-divider">
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1">
            <span className="section-label text-primary mb-4 block">Watch & Learn</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-5">
              Gentle exercises you can do <span className="text-primary italic">at home</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our video library features physiotherapist-led exercises designed specifically for people with arthritis. Start with just 5 minutes a day.
            </p>
            <Button className="rounded-full btn-primary-cta px-8 h-12" onClick={handlePlay}>
              Watch Exercise Video <Play className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
            <div
              className="aspect-video rounded-3xl relative overflow-hidden group cursor-pointer border border-border/20"
              onClick={handlePlay}
              role="button"
              aria-label="Play exercise video"
            >
              {playing ? (
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                  title="Gentle exercises for arthritis relief"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={videoCtaImage}
                    alt="Woman doing gentle yoga exercises at home"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                  </div>
                </>
              )}
            </div>
            {playing && (
              <button
                onClick={handleClose}
                className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto"
              >
                <X className="w-3.5 h-3.5" /> Close video
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

VideoCTASection.displayName = "VideoCTASection";
export default VideoCTASection;
