import StubPage, { type StubPageFAQ } from '@/components/StubPage';
import { PODCAST_EPISODES } from '@/data/podcastEpisodes';

const FAQS: StubPageFAQ[] = [
  { q: 'Is there a Living With Arthritis podcast?', a: 'Episodes appear on this page as soon as they are published, each with an audio player and a full written transcript.' },
  { q: 'Will every episode have a transcript?', a: 'Yes. Every episode is published with a full transcript on this page so it can be read as well as heard.' },
  { q: 'Is the podcast medical advice?', a: 'No. Episodes are general information. Speak to your GP, rheumatology team or pharmacist about your own care.' },
  { q: 'Can I suggest a topic?', a: 'Yes. Email info@livingwitharthritis.org.uk with the questions you would like answered.' },
];

export default function Podcasts() {
  const hasEpisodes = PODCAST_EPISODES.length > 0;
  return (
    <StubPage
      slug="podcasts"
      title="Living With Arthritis Podcast | Episodes & Transcripts"
      description="Listen to Living With Arthritis UK podcast episodes on everyday life with arthritis, each with an accessible audio player and full written transcript."
      answer="Our podcast episodes are published here, each with an audio player and a full transcript. Until the first episode is out, our written guides and the Listen button on each guide are the best place to start."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Community & Support', href: '/community' },
        { label: 'Podcasts', href: '/podcasts' },
      ]}
      faqs={FAQS}
      intro={
        <section aria-labelledby="episodes" className="space-y-6">
          <h2 id="episodes" className="text-2xl font-semibold">Episodes</h2>
          {!hasEpisodes && (
            <p>
              No episodes have been published yet. In the meantime, every
              guide on our blog has a Listen button so you can hear it read
              aloud. Email info@livingwitharthritis.org.uk to suggest a topic.
            </p>
          )}
          {PODCAST_EPISODES.map((ep) => (
            <article key={ep.slug} id={ep.slug} className="rounded-lg bg-muted p-5">
              <h3 className="text-xl font-semibold">{ep.title}</h3>
              <p className="mt-1 text-sm">
                <time dateTime={ep.published}>
                  {new Date(ep.published).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </time>{' '}
                · {ep.durationMinutes} min
              </p>
              <p className="mt-2">{ep.summary}</p>
              <audio controls preload="none" src={ep.audioUrl} className="mt-3 w-full">
                <a href={ep.audioUrl}>Download the episode</a>
              </audio>
              <details className="mt-3">
                <summary className="cursor-pointer font-medium">Read the transcript</summary>
                {ep.transcript.split(/\n\s*\n/).map((p, i) => (
                  <p key={i} className="mt-2">{p}</p>
                ))}
              </details>
            </article>
          ))}
        </section>
      }
      relatedLinks={[
        { label: 'Blog guides', href: '/blog' },
        { label: 'Buddy Programme', href: '/buddy' },
        { label: 'Community hub', href: '/community' },
        { label: 'Events & webinars', href: '/events' },
      ]}
    />
  );
}
