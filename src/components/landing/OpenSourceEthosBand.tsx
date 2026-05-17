import { memo } from "react";
import { GitCommit, Github, FileText, Users } from "lucide-react";

const COMMITS = [
  { hash: "a8f3c12", msg: "Update Mediterranean diet evidence (2025 meta-analysis)", when: "this week" },
  { hash: "7d21e9b", msg: "Add seated tai chi progressions for severe knee OA", when: "last week" },
  { hash: "3c4b2a1", msg: "Plain-English rewrite: NSAIDs vs topical diclofenac", when: "2 weeks ago" },
  { hash: "e9f1d04", msg: "Expand the hand OA self-management section", when: "3 weeks ago" },
  { hash: "b6a52f7", msg: "Refresh ginger and turmeric dosage guidance", when: "1 month ago" },
] as const;

const STATS = [
  { icon: FileText, label: "Articles published", value: "180+" },
  { icon: Users, label: "People reached", value: "10,000+" },
  { icon: GitCommit, label: "Updates this quarter", value: "47" },
] as const;

const OpenSourceEthosBand = memo(() => {
  return (
    <section
      aria-labelledby="open-source"
      className="py-24 lg:py-32 bg-foreground text-background relative overflow-hidden"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: manifesto */}
          <div className="lg:col-span-6">
            <p className="flex items-center gap-3 text-[10px] sm:text-[11px] font-bold tracking-[0.32em] uppercase text-background/60 mb-8">
              <span className="w-8 h-px bg-background/40" aria-hidden="true" />
              Open Source · Free Forever
            </p>

            <h2
              id="open-source"
              className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold tracking-tight leading-[1.06] mb-8"
            >
              Everything we publish is <span className="italic text-background/70">free.</span>
              <br />
              Reviewed in public. Owned by no one.
            </h2>

            <p className="text-background/70 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
              We treat the osteoarthritis management plan the way the open-source community
              treats software — versioned, transparent, peer-reviewable. Anyone can read it.
              Anyone can flag a mistake. Clinicians review every change before it ships.
            </p>

            <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-background/10">
              {STATS.map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <Icon className="w-4 h-4 text-background/50 mb-3" aria-hidden="true" />
                  <p className="font-display text-2xl sm:text-3xl font-bold tracking-tight">{value}</p>
                  <p className="text-[11px] sm:text-xs text-background/50 tracking-wide mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: commit log */}
          <div className="lg:col-span-6 lg:pl-8">
            <div className="bg-background/[0.04] border border-background/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-background/10">
                <span className="flex items-center gap-2 text-xs font-mono text-background/60">
                  <Github className="w-4 h-4" aria-hidden="true" />
                  oa-plan / main
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-background/40">
                  Live changelog
                </span>
              </div>

              <ul className="space-y-5">
                {COMMITS.map(({ hash, msg, when }) => (
                  <li key={hash} className="flex items-start gap-4 group">
                    <GitCommit className="w-4 h-4 mt-1 text-background/40 flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-[15px] text-background leading-snug">
                        {msg}
                      </p>
                      <p className="text-[11px] text-background/40 mt-1 font-mono">
                        <span className="text-background/60">{hash}</span> · {when}
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
