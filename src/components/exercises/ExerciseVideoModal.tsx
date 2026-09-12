import { useEffect, useRef, useState, ReactNode } from "react";
import { Sparkles, VideoOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ExerciseVideoModalProps {
  src: string;
  title: string;
  description?: string;
  poster?: string;
  /** The trigger element — typically a thumbnail with a play overlay */
  children: ReactNode;
}

/**
 * Consistent in-page video player. Click the trigger to open a focused
 * dialog with full controls; closing the dialog pauses + resets the clip.
 * Missing .mp4 files show an honest fallback — never a blank panel.
 */
export const ExerciseVideoModal = ({
  src,
  title,
  description,
  poster,
  children,
}: ExerciseVideoModalProps) => {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (open) {
      video.currentTime = 0;
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background">
        <DialogHeader className="px-6 pt-6 pb-3">
          <DialogTitle className="font-display text-xl md:text-2xl">
            {title}
          </DialogTitle>
          {description ? (
            <DialogDescription className="text-sm leading-relaxed">
              {description}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        <div className="relative bg-primary min-h-[200px]">
          {failed || !src ? (
            <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center text-primary-foreground">
              <VideoOff className="w-8 h-8 opacity-80" aria-hidden />
              <p className="font-semibold">Demonstration unavailable</p>
              <p className="text-sm opacity-80 max-w-md">
                The video file is not on this static build yet. Follow the written steps on the page — the exercise list still works.
              </p>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              controls
              playsInline
              preload="none"
              className="w-full h-auto max-h-[70vh] object-contain bg-primary"
              onError={() => setFailed(true)}
            />
          )}
        </div>

        <div className="flex items-center gap-2 px-6 py-3 border-t border-border/40 bg-muted/30 text-xs text-muted-foreground">
          <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden />
          <span>
            <strong className="text-foreground">Illustrative demonstration</strong>{" "}
            — illustrative only, not medical guidance.
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseVideoModal;
