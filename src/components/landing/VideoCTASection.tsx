import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import videoCtaImage from "@/assets/video-cta-exercise.jpg";

const YOUTUBE_VIDEO_ID = "hEu--9lGdLk";

const VideoCTASection = memo(() => {
  const [playing, setPlaying] = useState(false);

  const handlePlay = useCallback(() => setPlaying(true), []);
  const handleClose = useCallback(() => setPlaying(false), []);

  return (
    <section className="py-28 lg:py-36 bg-background section-divider">
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <span className="section-label text-primary mb-4 block">Watch & Learn</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
              Gentle exercises you can do <span className="text-primary italic">at home</span>
            </h2>
            <div className="luxury-divider justify-start mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
            </div>
            <p className="text-muted-foreground leading-[1.8] mb-10">
              Our video library features physiotherapist-led exercises designed specifically for people with arthritis. Start with just 5 minutes a day.
            </p>
            <Button className="rounded-full btn-primary-cta px-9 h-13" onClick={handlePlay}>
              Watch Exercise Video <Play className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div
              className="aspect-video rounded-[2rem] relative overflow-hidden group cursor-pointer border border-border/15 shadow-large hover:shadow-xl transition-all duration-700"
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/50 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-20 h-20 rounded-full bg-background/90 backdrop-blur-md flex items-center justify-center shadow-xl"
                    >
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </motion.div>
                  </div>
                </>
              )}
            </div>
            {playing && (
              <button
                onClick={handleClose}
                className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto"
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
