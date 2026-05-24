import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface ExerciseVideoProps {
  src: string;
  poster?: string;
  label?: string;
  className?: string;
  /** Hide the "AI demonstration" caption (defaults to false) */
  hideDisclaimer?: boolean;
}

/**
 * Looping, muted, autoplay exercise video used as a drop-in replacement for
 * the previous SVG humanoid animations. Defers loading until visible to keep
 * the page light when many videos are rendered together.
 */
export const ExerciseVideo = ({ src, poster, label, className, hideDisclaimer }: ExerciseVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden rounded-2xl bg-gradient-to-br from-muted/40 to-muted/10 border border-border/40",
        className
      )}
      aria-label={label ? `${label} demonstration video` : "Exercise demonstration video"}
    >
      {inView ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        </div>
      )}

      {!hideDisclaimer && (
        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-background/85 backdrop-blur-sm border border-border/40 text-[10px] leading-tight text-muted-foreground">
          <Sparkles className="w-3 h-3 text-primary shrink-0" aria-hidden />
          <span><strong className="text-foreground">Illustrative demonstration</strong> — illustrative only, not medical guidance.</span>
        </div>
      )}
    </div>
  );
};

export default ExerciseVideo;
