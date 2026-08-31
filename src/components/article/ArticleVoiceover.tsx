import { useCallback, useEffect, useRef, useState } from 'react';
import { Headphones, Loader2, Pause, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

const SPEEDS = [1, 1.25, 1.5, 1.75, 2] as const;

interface ArticleVoiceoverProps {
  slug: string;
  className?: string;
}

interface AudioResponse {
  url: string;
  duration: number;
  cached: boolean;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

/**
 * "Listen to this article" bar. Audio is generated once per article version by
 * the `article-audio` edge function and cached, so the first listener waits a
 * few seconds and everyone afterwards plays instantly.
 */
export default function ArticleVoiceover({ slug, className }: ArticleVoiceoverProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Reset when navigating between articles.
    setUrl(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsHidden(false);
    setIsPreparing(false);
  }, [slug]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.playbackRate = speed;
  }, [speed, url]);

  const loadAudio = useCallback(async (): Promise<string | null> => {
    setIsPreparing(true);
    try {
      const { data, error } = await supabase.functions.invoke('article-audio', {
        body: { slug },
      });
      if (error) throw error;
      const payload = (data as { ok?: boolean; data?: AudioResponse })?.data;
      if (!payload?.url) throw new Error('No audio returned');
      setUrl(payload.url);
      if (payload.duration) setDuration(payload.duration);
      return payload.url;
    } catch {
      setIsHidden(true);
      return null;
    } finally {
      setIsPreparing(false);
    }
  }, [slug]);

  const handleToggle = useCallback(async () => {
    const el = audioRef.current;
    if (isPlaying && el) {
      el.pause();
      return;
    }
    let src = url;
    if (!src) {
      src = await loadAudio();
      if (!src) return;
    }
    // Wait a tick so the <audio> element picks up the new src.
    requestAnimationFrame(() => {
      audioRef.current?.play().catch(() => setIsHidden(true));
    });
  }, [isPlaying, loadAudio, url]);

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const el = audioRef.current;
    const value = Number(event.target.value);
    setCurrentTime(value);
    if (el && Number.isFinite(el.duration)) el.currentTime = value;
  };

  if (isHidden) return null;

  const remaining = duration > 0 ? Math.max(0, duration - currentTime) : 0;

  return (
    <section
      aria-label="Listen to this article"
      className={cn(
        'no-print rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 sm:px-5 sm:py-4',
        className,
      )}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={handleToggle}
          disabled={isPreparing}
          aria-label={isPlaying ? 'Pause article audio' : 'Play article audio'}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-70"
        >
          {isPreparing ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : isPlaying ? (
            <Pause className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Play className="ml-0.5 h-5 w-5" aria-hidden="true" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Headphones className="h-4 w-4 text-primary" aria-hidden="true" />
            {isPreparing ? 'Preparing audio…' : 'Listen to this article'}
          </p>
          <div className="mt-1.5 flex items-center gap-3">
            <span className="text-xs tabular-nums text-muted-foreground">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={1}
              value={currentTime}
              onChange={handleSeek}
              aria-label="Seek through the article audio"
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
            />
            <span className="text-xs tabular-nums text-muted-foreground">
              -{formatTime(remaining)}
            </span>
          </div>
        </div>

        <label className="shrink-0 text-xs">
          <span className="sr-only">Playback speed</span>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="rounded-full border border-border bg-background px-2 py-1 text-xs font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {SPEEDS.map((s) => (
              <option key={s} value={s}>
                {s}×
              </option>
            ))}
          </select>
        </label>
      </div>

      {url && (
        <audio
          ref={audioRef}
          src={url}
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
          }}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration;
            if (Number.isFinite(d) && d > 0) setDuration(d);
          }}
          onError={() => setIsHidden(true)}
        />
      )}
    </section>
  );
}
