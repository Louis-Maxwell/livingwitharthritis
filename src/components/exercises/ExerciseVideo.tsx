import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, VideoOff } from "lucide-react";
import {
  Frame,
  Head,
  Torso,
  StandingLegs,
  Limb,
  Joint,
} from "./CinematicHumanoid";

interface ExerciseVideoProps {
  src: string;
  poster?: string;
  label?: string;
  className?: string;
  /** Hide the "AI demonstration" caption (defaults to false) */
  hideDisclaimer?: boolean;
}

/** Labelled SVG still when the .mp4 is missing or fails to load. */
const DemoUnavailable = ({ label, className }: { label?: string; className?: string }) => (
  <div
    className={cn("relative w-full h-full min-h-[160px]", className)}
    role="img"
    aria-label={label ? `${label} — demonstration unavailable` : "Demonstration unavailable"}
  >
    <Frame label={label ? `${label} illustration` : "Exercise illustration"} className="h-full">
      <g transform="translate(200, 150)">
        <StandingLegs />
        <Torso breathe />
        <Head />
        <Limb x1={-22} y1={-55} x2={-48} y2={-20} width={9} />
        <Limb x1={22} y1={-55} x2={48} y2={-20} width={9} />
        <Joint cx={-22} cy={-55} r={4} />
        <Joint cx={22} cy={-55} r={4} />
      </g>
    </Frame>
    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 px-3 py-3 bg-gradient-to-t from-background/95 via-background/80 to-transparent">
      <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
        <VideoOff className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden />
        <span>Demonstration unavailable</span>
      </div>
      {label ? (
        <p className="text-[11px] text-muted-foreground text-center leading-snug">
          {label} — written steps below still apply.
        </p>
      ) : (
        <p className="text-[11px] text-muted-foreground text-center leading-snug">
          Follow the written exercise list on this page.
        </p>
      )}
    </div>
  </div>
);

/**
 * Looping, muted, autoplay exercise video used as a drop-in replacement for
 * the previous SVG humanoid animations. Defers loading until visible to keep
 * the page light when many videos are rendered together.
 * Missing / 404 videos never blank the panel or throw — SVG fallback instead.
 */
export const ExerciseVideo = ({ src, poster, label, className, hideDisclaimer }: ExerciseVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

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

  if (failed || !src) {
    return <DemoUnavailable label={label} className={className} />;
  }

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
          preload="none"
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
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
