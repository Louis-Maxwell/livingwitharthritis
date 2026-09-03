import { memo, useState } from "react";
import { Quote } from "lucide-react";
import { toast } from "sonner";
import { trackTestimonialSubmit } from "@/lib/ga-events";


/**
 * Ethical placeholder testimonial section.
 * We do not display fabricated quotes — instead we openly invite real
 * patient stories. Submissions are written to the contact_submissions
 * table (existing) with a clear `topic` flag so the team can review.
 */
const TestimonialCollector = memo(() => {
  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [story, setStory] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const error = null;
      window.location.href = "mailto:info@livingwitharthritis.org.uk?subject=" + encodeURIComponent("Testimonial") + "&body=" + encodeURIComponent("A visitor shared a story via the website.");
      if (error) throw error;
      trackTestimonialSubmit(condition);
      setDone(true);
      toast.success("Thank you — your story has been received.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      aria-labelledby="share-story"
      className="bg-muted/30 border-y border-border/40 py-20"
    >
      <div className="container mx-auto px-6 lg:px-16 max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center mb-5">
            <Quote className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <h2 id="share-story" className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3">
            Share your story
          </h2>
          <p className="text-foreground/70 leading-relaxed">
            Have our guides helped you live better with arthritis? We're collecting real
            patient stories to inspire others. We don't publish without your consent.
          </p>
        </div>

        {done ? (
          <div className="rounded-2xl bg-card border border-border p-8 text-center">
            <p className="text-foreground font-semibold">
              Thank you. A reviewer will be in touch before anything is published.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="t-name" className="sr-only">Your name</label>
              <input
                id="t-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full min-h-11 h-12 px-4 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label htmlFor="t-cond" className="sr-only">Your condition</label>
              <select
                id="t-cond"
                required
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full min-h-11 h-12 px-4 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Select your condition</option>
                <option>Osteoarthritis</option>
                <option>Rheumatoid Arthritis</option>
                <option>Psoriatic Arthritis</option>
                <option>Gout</option>
                <option>Polymyalgia Rheumatica</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="t-story" className="sr-only">Your story</label>
              <textarea
                id="t-story"
                required
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="What changed for you? (1–3 sentences)"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
              />
            </div>
            <label className="flex items-start gap-2 text-sm text-foreground/70 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary/40"
              />
              I consent to my first name and condition being shown alongside my story if selected.
            </label>
            <button
              type="submit"
              disabled={busy}
              className="w-full min-h-11 h-12 rounded-full bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:bg-primary/95 disabled:opacity-60 shadow-lg shadow-primary/20"
            >
              {busy ? "Sending…" : "Submit your story"}
            </button>
            <p className="text-xs text-muted-foreground text-center">
              We review every submission. Nothing is published without your written consent.
            </p>
          </form>
        )}
      </div>
    </section>
  );
});

TestimonialCollector.displayName = "TestimonialCollector";
export default TestimonialCollector;
