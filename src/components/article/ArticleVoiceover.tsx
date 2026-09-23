import { useCallback, useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent, type PointerEvent } from 'react';
import { Headphones, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const SPEEDS = [1, 1.25, 1.5, 1.75, 2] as const;
const WPM = 155;
const MAX_WORDS = 12000;
const SKIP_SELECTORS = [
  'nav',
  'footer',
  'header',
  'figure',
  'figcaption',
  'img',
  'picture',
  'video',
  'audio',
  'button',
  'form',
  'iframe',
  'script',
  'style',
  'noscript',
  'svg',
  'aside',
  '[aria-hidden="true"]',
  '[hidden]',
  '.not-prose',
  '.no-print',
  '[aria-label="Listen to this article"]',
  '[id*="cookie" i]',
  '[class*="cookie" i]',
  '[role="dialog"]',
].join(',');

interface ArticleVoiceoverProps {
  slug: string;
  className?: string;
  /** Optional narration (plain text or HTML). When omitted, the article DOM is read. */
  text?: string;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function estimateDurationSec(text: string): number {
  const words = countWords(text);
  if (words <= 0) return 0;
  return Math.max(1, Math.round((words / WPM) * 60));
}

function capWords(text: string, max = MAX_WORDS): string {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= max) return words.join(' ');
  return words.slice(0, max).join(' ');
}

function snapToWord(text: string, index: number): number {
  if (index <= 0) return 0;
  if (index >= text.length) return text.length;
  let i = index;
  while (i > 0 && !/\s/.test(text.charAt(i - 1))) i -= 1;
  return i;
}

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices.length) return null;
  const gbExact = voices.find((v) => v.lang === 'en-GB');
  if (gbExact) return gbExact;
  const gb = voices.find(
    (v) => /^en-GB/i.test(v.lang) || /british|uk english|english \(united kingdom\)/i.test(v.name),
  );
  if (gb) return gb;
  const en = voices.find((v) => /^en\b/i.test(v.lang));
  return en ?? voices[0] ?? null;
}

function looksLikeHtml(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

function collapseSpeakable(value: string): string {
  return value
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+\./g, '.')
    .replace(/(\.\s*){2,}/g, '. ')
    .replace(/\s+/g, ' ')
    .trim();
}

function htmlToSpeakable(html: string): string {
  if (typeof document === 'undefined') {
    return collapseSpeakable(html.replace(/<[^>]+>/g, ' '));
  }
  const root = document.createElement('div');
  root.innerHTML = html;
  root.querySelectorAll(SKIP_SELECTORS).forEach((el) => el.remove());
  root.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,blockquote,tr,br').forEach((el) => {
    if (el.tagName === 'BR') {
      el.replaceWith('. ');
      return;
    }
    el.append('. ');
  });
  return collapseSpeakable(root.textContent ?? '');
}

function nodeToSpeakable(node: Element): string {
  const clone = node.cloneNode(true) as HTMLElement;
  clone.querySelectorAll(SKIP_SELECTORS).forEach((el) => el.remove());
  clone.querySelectorAll('h1,h2,h3,h4,h5,h6,li,blockquote').forEach((el) => {
    el.append('. ');
  });
  return collapseSpeakable(clone.innerText || clone.textContent || '');
}

function readArticleFromDom(): { title: string; body: string } {
  if (typeof document === 'undefined') return { title: '', body: '' };
  const article = document.querySelector('article');
  const h1 = document.querySelector('article h1, main h1, h1');
  const title = (h1?.textContent ?? '').trim();
  const bodyEl =
    document.querySelector('[itemprop="articleBody"]') ??
    document.querySelector('section[aria-label="Article body"]') ??
    article?.querySelector('.blog-prose');
  if (bodyEl) return { title, body: nodeToSpeakable(bodyEl) };
  if (article) {
    const clone = article.cloneNode(true) as HTMLElement;
    clone.querySelectorAll(SKIP_SELECTORS).forEach((el) => el.remove());
    return { title, body: collapseSpeakable(clone.innerText || clone.textContent || '') };
  }
  return { title, body: '' };
}

function withTitlePrefix(title: string, body: string): string {
  const t = title.trim();
  const b = body.trim();
  if (!t) return b;
  if (!b) return t;
  if (b.toLowerCase().startsWith(t.toLowerCase())) return b;
  return `${t}. ${b}`;
}

function resolveNarration(textProp?: string): string {
  if (textProp && textProp.trim()) {
    const raw = looksLikeHtml(textProp) ? htmlToSpeakable(textProp) : collapseSpeakable(textProp);
    return capWords(raw);
  }
  const { title, body } = readArticleFromDom();
  return capWords(withTitlePrefix(title, body));
}

/**
 * In-browser "Listen to this article" player.
 * Speaks immediately via the Web Speech API (no network request).
 * Falls back to a static `/audio/{slug}.mp3` when that file exists.
 */
export default function ArticleVoiceover({ slug, className, text }: ArticleVoiceoverProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const narrationRef = useRef('');
  const charOffsetRef = useRef(0);
  const durationRef = useRef(0);
  const speedRef = useRef(1);
  const genRef = useRef(0);
  const pausedRef = useRef(false);
  const seekingRef = useRef(false);
  const isPlayingRef = useRef(false);
  const autoplayTriedRef = useRef(false);
  const lastMarkRef = useRef({ t: 0, pos: 0 });
  const mp3UrlRef = useRef<string | null>(null);
  const usedSpeechRef = useRef(false);
  const speakTimerRef = useRef<number | null>(null);

  const [hasSpeech, setHasSpeech] = useState(true);
  const [voicesReady, setVoicesReady] = useState(false);
  const [mp3Url, setMp3Url] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  isPlayingRef.current = isPlaying;
  speedRef.current = speed;
  durationRef.current = duration;
  mp3UrlRef.current = mp3Url;

  const usingMp3 = Boolean(mp3Url) && !usedSpeechRef.current;

  const refreshNarration = useCallback(() => {
    const narration = resolveNarration(text);
    narrationRef.current = narration;
    if (!mp3UrlRef.current) {
      const est = estimateDurationSec(narration);
      durationRef.current = est;
      setDuration(est);
    }
    return narration;
  }, [text]);

  const cancelSpeech = useCallback(() => {
    genRef.current += 1;
    if (speakTimerRef.current != null) {
      window.clearTimeout(speakTimerRef.current);
      speakTimerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speakFrom = useCallback(
    (offset: number) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      const synth = window.speechSynthesis;
      const narration = narrationRef.current || refreshNarration();
      if (!narration) return;

      usedSpeechRef.current = true;
      const start = snapToWord(narration, offset);
      charOffsetRef.current = start;
      const slice = narration.slice(start);
      if (!slice.trim()) {
        setIsPlaying(false);
        isPlayingRef.current = false;
        setCurrentTime(durationRef.current);
        return;
      }

      const gen = ++genRef.current;
      pausedRef.current = false;

      if (speakTimerRef.current != null) {
        window.clearTimeout(speakTimerRef.current);
        speakTimerRef.current = null;
      }

      // Chrome drops utterances spoken in the same turn as cancel().
      const needsCancelGap = synth.speaking || synth.pending;
      if (needsCancelGap) {
        synth.cancel();
      }

      const launch = (allowRetry: boolean) => {
        if (gen !== genRef.current) return;

        const utterance = new SpeechSynthesisUtterance(slice);
        utterance.rate = speedRef.current;
        utterance.pitch = 1;
        utterance.volume = 1;
        utterance.lang = 'en-GB';
        const voice = pickVoice(voicesRef.current);
        if (voice) {
          utterance.voice = voice;
          if (voice.lang) utterance.lang = voice.lang;
        }

        const dur = durationRef.current;
        const startPos = narration.length > 0 ? (start / narration.length) * dur : 0;
        lastMarkRef.current = { t: performance.now(), pos: startPos };
        setCurrentTime(startPos);

        utterance.onboundary = (event) => {
          if (gen !== genRef.current) return;
          const abs = start + (event.charIndex || 0);
          charOffsetRef.current = abs;
          const pos = narration.length > 0 ? (abs / narration.length) * dur : 0;
          lastMarkRef.current = { t: performance.now(), pos };
          if (!seekingRef.current) setCurrentTime(pos);
        };

        utterance.onend = () => {
          if (gen !== genRef.current) return;
          setIsPlaying(false);
          isPlayingRef.current = false;
          setCurrentTime(dur);
          charOffsetRef.current = narration.length;
        };

        utterance.onerror = (event) => {
          if (gen !== genRef.current) return;
          // Chrome often fires "canceled" when cancel() races speak(); retry once.
          if (event.error === 'canceled' || event.error === 'interrupted') {
            if (allowRetry && !pausedRef.current) {
              speakTimerRef.current = window.setTimeout(() => launch(false), 60);
            }
            return;
          }
          setIsPlaying(false);
          isPlayingRef.current = false;
        };

        try {
          synth.speak(utterance);
        } catch {
          if (allowRetry) {
            speakTimerRef.current = window.setTimeout(() => launch(false), 60);
            return;
          }
          setIsPlaying(false);
          isPlayingRef.current = false;
          return;
        }

        setIsPlaying(true);
        isPlayingRef.current = true;

        // Chrome can accept speak() then silently drop the utterance after cancel().
        if (allowRetry) {
          speakTimerRef.current = window.setTimeout(() => {
            if (gen !== genRef.current || pausedRef.current) return;
            if (!synth.speaking && !synth.pending && isPlayingRef.current) {
              launch(false);
            }
          }, 120);
        }
      };

      if (needsCancelGap) {
        setIsPlaying(true);
        isPlayingRef.current = true;
        speakTimerRef.current = window.setTimeout(() => launch(true), 50);
      } else {
        // Same user-gesture turn — required for Safari / some Chromium builds.
        launch(true);
      }
    },
    [refreshNarration],
  );

  // Warm voices, probe optional static mp3, estimate duration from the article DOM.
  useEffect(() => {
    usedSpeechRef.current = false;
    pausedRef.current = false;
    seekingRef.current = false;
    autoplayTriedRef.current = false;
    charOffsetRef.current = 0;
    setMp3Url(null);
    mp3UrlRef.current = null;
    setIsPlaying(false);
    isPlayingRef.current = false;
    setCurrentTime(0);
    setDuration(0);
    setVoicesReady(false);

    if (typeof window === 'undefined') return undefined;

    const speechOk = 'speechSynthesis' in window;
    setHasSpeech(speechOk);

    let cleanupVoices = () => {};
    if (speechOk) {
      const synth = window.speechSynthesis;
      synth.cancel();
      const updateVoices = () => {
        const list = synth.getVoices();
        voicesRef.current = list;
        if (list.length > 0) setVoicesReady(true);
      };
      updateVoices();
      synth.addEventListener('voiceschanged', updateVoices);
      const readyFallback = window.setTimeout(() => setVoicesReady(true), 1500);
      cleanupVoices = () => {
        synth.removeEventListener('voiceschanged', updateVoices);
        window.clearTimeout(readyFallback);
      };
    }

    const raf = window.requestAnimationFrame(() => {
      refreshNarration();
    });

    const ctrl = new AbortController();
    const mp3Path = `/audio/${slug}.mp3`;
    const probeMp3 = () => {
      fetch(mp3Path, { method: 'HEAD', cache: 'no-store', signal: ctrl.signal })
        .then((res) => {
          const type = (res.headers.get('content-type') || '').toLowerCase();
          // SPA hosts sometimes return 200 HTML for missing files — only trust real audio.
          if (res.ok && type.includes('audio/')) {
            setMp3Url(mp3Path);
            mp3UrlRef.current = mp3Path;
          }
        })
        .catch(() => undefined);
    };
    // Defer optional MP3 probe so it does not contend with article LCP.
    let idleId = 0;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(probeMp3, { timeout: 2000 });
    } else {
      idleId = window.setTimeout(probeMp3, 1200);
    }

    return () => {
      window.cancelAnimationFrame(raf);
      if (typeof w.cancelIdleCallback === 'function') w.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      ctrl.abort();
      cleanupVoices();
      cancelSpeech();
    };
  }, [slug, refreshNarration, cancelSpeech]);

  useEffect(() => {
    const el = audioRef.current;
    return () => {
      if (!el) return;
      el.pause();
      el.removeAttribute('src');
    };
  }, [mp3Url]);

  // Progress ticker while speaking (covers browsers with sparse onboundary).
  useEffect(() => {
    if (!isPlaying || usingMp3) return undefined;
    const id = window.setInterval(() => {
      if (seekingRef.current || pausedRef.current) return;
      const { t, pos } = lastMarkRef.current;
      if (!t) return;
      const extra = ((performance.now() - t) / 1000) * speedRef.current;
      const next = Math.min(durationRef.current, pos + extra);
      setCurrentTime(next);
      const narration = narrationRef.current;
      if (narration && durationRef.current > 0) {
        charOffsetRef.current = Math.floor((next / durationRef.current) * narration.length);
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [isPlaying, usingMp3]);

  // Chrome stops utterances around 15s unless periodically resumed.
  useEffect(() => {
    if (!isPlaying || usingMp3) return undefined;
    const id = window.setInterval(() => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      const synth = window.speechSynthesis;
      if (synth.speaking && !synth.paused && isPlayingRef.current && !pausedRef.current && !seekingRef.current) {
        synth.pause();
        synth.resume();
      }
    }, 8000);
    return () => window.clearInterval(id);
  }, [isPlaying, usingMp3]);

  // ?listen=1 or #listen — scroll into view; try autoplay after voices are ready
  // (browsers often block autoplay without a gesture — Play stays ready).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const wantsListen = params.get('listen') === '1' || window.location.hash === '#listen';
    if (!wantsListen) return;
    const el = document.getElementById('listen');
    if (el) {
      try {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch {
        el.scrollIntoView();
      }
    }
    if (autoplayTriedRef.current) return;
    if (!voicesReady && !mp3Url) return;
    autoplayTriedRef.current = true;
    const focusPlay = () => {
      const btn = document.querySelector(
        '#listen button[aria-label="Play article audio"]',
      ) as HTMLButtonElement | null;
      btn?.focus({ preventScroll: true });
    };
    try {
      if (mp3Url && audioRef.current) {
        audioRef.current.playbackRate = speedRef.current;
        void audioRef.current.play().then(undefined, () => focusPlay());
        return;
      }
      if ('speechSynthesis' in window) {
        speakFrom(0);
        // If the browser blocked speech autoplay, nudge focus to Play.
        window.setTimeout(() => {
          if (!isPlayingRef.current) focusPlay();
        }, 200);
      }
    } catch {
      // Autoplay without a gesture is often blocked — leave Play ready.
      focusPlay();
    }
  }, [voicesReady, mp3Url, speakFrom]);

  const handleToggle = useCallback(() => {
    if (mp3UrlRef.current && audioRef.current && !usedSpeechRef.current) {
      const el = audioRef.current;
      if (isPlayingRef.current) {
        el.pause();
        return;
      }
      el.playbackRate = speedRef.current;
      void el.play().catch(() => undefined);
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;

    if (isPlayingRef.current && !pausedRef.current) {
      pausedRef.current = true;
      setIsPlaying(false);
      isPlayingRef.current = false;
      synth.pause();
      window.setTimeout(() => {
        if (!pausedRef.current) return;
        if (synth.speaking && !synth.paused) {
          cancelSpeech();
        }
      }, 60);
      return;
    }

    refreshNarration();

    if (synth.paused) {
      pausedRef.current = false;
      synth.resume();
      setIsPlaying(true);
      isPlayingRef.current = true;
      lastMarkRef.current = { t: performance.now(), pos: currentTime };
      window.setTimeout(() => {
        if (!isPlayingRef.current) return;
        if (!window.speechSynthesis.speaking) {
          speakFrom(charOffsetRef.current);
        }
      }, 60);
      return;
    }

    // Same user-gesture turn: no await, no fetch.
    speakFrom(charOffsetRef.current);
  }, [cancelSpeech, currentTime, refreshNarration, speakFrom]);

  const commitSeek = useCallback(
    (seconds: number) => {
      seekingRef.current = false;
      const dur = durationRef.current;
      const clamped = Math.max(0, Math.min(dur || 0, seconds));
      setCurrentTime(clamped);

      if (usingMp3 && audioRef.current) {
        audioRef.current.currentTime = clamped;
        return;
      }

      const narration = narrationRef.current;
      const offset =
        dur > 0 && narration ? snapToWord(narration, Math.floor((clamped / dur) * narration.length)) : 0;
      charOffsetRef.current = offset;
      lastMarkRef.current = { t: performance.now(), pos: clamped };
      if (isPlayingRef.current) speakFrom(offset);
    },
    [speakFrom, usingMp3],
  );

  const handleSeekInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    seekingRef.current = true;
    setCurrentTime(value);
  };

  const handleSeekCommit = (event: PointerEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>) => {
    commitSeek(Number((event.target as HTMLInputElement).value));
  };

  const handleSpeedChange = (next: number) => {
    setSpeed(next);
    speedRef.current = next;
    if (usingMp3 && audioRef.current) {
      audioRef.current.playbackRate = next;
      return;
    }
    if (isPlayingRef.current) speakFrom(charOffsetRef.current);
  };

  const showUnsupported = !hasSpeech && !mp3Url;
  const remaining = duration > 0 ? Math.max(0, duration - currentTime) : 0;
  const progressPct = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
  const statusLabel = isPlaying ? 'Playing' : voicesReady || mp3Url ? 'Ready' : null;

  return (
    <section
      id="listen"
      aria-label="Listen to this article"
      className={cn(
        'no-print min-w-0 max-w-full overflow-hidden rounded-2xl bg-card bg-gradient-to-br from-primary/[0.07] via-card to-card',
        'px-4 py-3.5 shadow-sm ring-1 ring-primary/15 sm:px-5 sm:py-4',
        className,
      )}
    >
      {showUnsupported ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Headphones className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          Audio isn&apos;t supported in this browser
        </p>
      ) : (
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleToggle}
            aria-label={isPlaying ? 'Pause article audio' : 'Play article audio'}
            aria-pressed={isPlaying}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-safe:transition-transform motion-safe:hover:scale-[1.04] motion-reduce:transform-none"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" fill="currentColor" aria-hidden="true" />
            ) : (
              <Play className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true" />
            )}
          </button>

          <div className="min-w-0 flex-1 basis-44">
            <div className="flex items-center gap-2">
              <p className="flex min-w-0 items-center gap-2 text-sm font-semibold text-foreground">
                <Headphones className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="truncate">Listen to this article</span>
              </p>
              {statusLabel && (
                <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary ring-1 ring-primary/15">
                  {statusLabel}
                </span>
              )}
            </div>

            <div className="mt-2 flex items-center gap-3">
              <span className="w-8 shrink-0 text-xs tabular-nums text-muted-foreground">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 1}
                step={0.25}
                value={Math.min(currentTime, duration || 1)}
                onChange={handleSeekInput}
                onPointerUp={handleSeekCommit}
                onKeyUp={handleSeekCommit}
                aria-label="Seek through the article audio"
                aria-valuemin={0}
                aria-valuemax={duration || 0}
                aria-valuenow={Math.round(currentTime)}
                aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                className="h-2 w-full min-w-0 cursor-pointer appearance-none rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                style={{
                  background: `linear-gradient(to right, hsl(var(--primary)) ${progressPct}%, hsl(var(--border)) ${progressPct}%)`,
                }}
              />
              <span className="w-10 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                -{formatTime(remaining)}
              </span>
            </div>
          </div>

          <label className="shrink-0">
            <span className="sr-only">Playback speed</span>
            <select
              value={speed}
              onChange={(e) => handleSpeedChange(Number(e.target.value))}
              className="h-8 rounded-full border-0 bg-primary/10 px-2.5 text-xs font-semibold text-primary ring-1 ring-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {SPEEDS.map((s) => (
                <option key={s} value={s}>
                  {s}×
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {mp3Url && (
        <audio
          ref={audioRef}
          src={mp3Url}
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
            charOffsetRef.current = 0;
          }}
          onTimeUpdate={(e) => {
            if (!seekingRef.current) setCurrentTime(e.currentTarget.currentTime);
          }}
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration;
            if (Number.isFinite(d) && d > 0) {
              setDuration(d);
              durationRef.current = d;
            }
          }}
          onError={() => {
            setMp3Url(null);
            mp3UrlRef.current = null;
          }}
        />
      )}
    </section>
  );
}
