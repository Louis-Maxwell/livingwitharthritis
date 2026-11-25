import { useState } from 'react';
import type { BlogVideo } from '@/data/blogVideos';

/** No remote thumbnail, preconnect, player or storage before per-video consent. */
export default function ArticleVideo({ video }: { video: BlogVideo }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <section aria-label="Related Living With Arthritis video" className="no-print print:hidden my-8 rounded-xl border border-border bg-card p-5" data-testid="article-video">
      <h2 className="text-xl font-semibold text-foreground">Watch: {video.title}</h2>
      <p className="mt-2 text-sm text-foreground/80">{video.format === 'landscape' ? 'A video from Living With Arthritis.' : 'A short video from Living With Arthritis.'}</p>
      <div className={`mt-4 mx-auto w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center ${video.format === 'landscape' ? `aspect-video ${loaded ? '' : 'min-h-[360px] sm:min-h-0'}` : 'aspect-[9/16] max-w-[320px]'}`}>
        {loaded ? (
          <iframe
            title={video.title}
            src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
            width={video.format === 'landscape' ? 1280 : 320}
            height={video.format === 'landscape' ? 720 : 569}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="h-full w-full border-0"
          />
        ) : (
          <div className="p-6 text-center">
            <p className="mb-5 text-sm text-foreground">Loading this video connects to YouTube (Google), which receives information about your visit and may use cookies or similar storage. This choice applies to this video only.</p>
            <button type="button" onClick={() => setLoaded(true)} className="rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">
              Allow YouTube and load video
            </button>
          </div>
        )}
      </div>
      {loaded && (
        <button type="button" onClick={() => setLoaded(false)} className="mt-4 rounded border border-border px-4 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">
          Remove YouTube player
        </button>
      )}
      <p className="mt-4 text-sm text-foreground/80">Prefer to leave this site? <a href={video.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-foreground">Watch on YouTube (opens a new tab)</a>.</p>
      <p className="mt-2 text-sm"><a href="https://www.youtube.com/@livingwitharthritisorg" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-foreground">Visit Living With Arthritis on YouTube to subscribe</a>.</p>
    </section>
  );
}
