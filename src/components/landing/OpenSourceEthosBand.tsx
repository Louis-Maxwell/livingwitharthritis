import { memo } from "react";
import { GitCommit, Github, FileText, Users } from "lucide-react";

const COMMITS = [
  { hash: "this week", msg: "Added kinder, plain-English notes on the Mediterranean way of eating", when: "this week" },
  { hash: "last week", msg: "New seated tai chi videos for sore knees — gentle enough for any day", when: "last week" },
  { hash: "2 weeks ago", msg: "Rewrote our pain-relief guide so it reads like a friend, not a leaflet", when: "2 weeks ago" },
  { hash: "3 weeks ago", msg: "Expanded our help for living with painful hands", when: "3 weeks ago" },
  { hash: "1 month ago", msg: "Refreshed our notes on turmeric and ginger — what helps, what doesn't", when: "1 month ago" },
] as const;

const STATS = [
  { icon: FileText, label: "Caring articles, all free to read", value: "180+" },
  { icon: Users, label: "People we've helped so far", value: "10,000+" },
  { icon: GitCommit, label: "Updates made this quarter, with love", value: "47" },
] as const;

const OpenSourceEthosBand = memo(() => {
  return (
    <section
      aria-labelledby="open-source"
      className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: manifesto */}
          <div className="lg:col-span-6">
            <p className="flex items-center gap-3 text-[10px] sm:text-[11px] font-bold tracking-[0.32em] uppercase text-primary-foreground/70 mb-8">
              <span className="w-8 h-px bg-primary-foreground/50" aria-hidden="true" />
              Free, open, for everyone
            </p>

            <h2
              id="open-source"
              className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold tracking-tight leading-[1.06] mb-8"
            >
              Everything we make is <span className="italic text-primary-foreground/80">free to read.</span>
              <br />
              Written openly. Belonging to no one — and to all of us.
            </h2>

            <p className="text-primary-foreground/80 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
              We share our arthritis guides the way good neighbours share a recipe — openly, clearly,
              and so anyone can pick it up. If something can be said more kindly or more clearly,
              tell us. A clinician checks every change before it goes out.
            </p>

            <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-primary-foreground/15">
              {STATS.map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <Icon className="w-4 h-4 text-primary-foreground/60 mb-3" aria-hidden="true" />
                  <p className="font-display text-2xl sm:text-3xl font-bold tracking-tight">{value}</p>
                  <p className="text-[11px] sm:text-xs text-primary-foreground/70 tracking-wide mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: changelog */}
          <div className="lg:col-span-6 lg:pl-8">
            <div className="bg-primary-foreground/[0.08] border border-primary-foreground/15 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary-foreground/15">
                <span className="flex items-center gap-2 text-xs font-medium text-primary-foreground/80">
                  <Github className="w-4 h-4" aria-hidden="true" />
                  What we've been working on
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary-foreground/60">
                  Live updates
                </span>
              </div>

              <ul className="space-y-5">
                {COMMITS.map(({ hash, msg, when }) => (
                  <li key={hash} className="flex items-start gap-4 group">
                    <GitCommit className="w-4 h-4 mt-1 text-primary-foreground/60 flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-[15px] text-primary-foreground leading-snug">
                        {msg}
                      </p>
                      <p className="text-[11px] text-primary-foreground/60 mt-1">
                        {when}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

OpenSourceEthosBand.displayName = "OpenSourceEthosBand";
export default OpenSourceEthosBand;
