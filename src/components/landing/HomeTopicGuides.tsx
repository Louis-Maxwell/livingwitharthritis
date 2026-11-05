import { Link } from "react-router-dom";
import { trackStartHereCard } from "@/lib/ga-events";

// Keep these links in the initial render so visitors and crawlers do not
// need to scroll or expand a control to discover the existing guides.
const TOPIC_GROUPS = [
  {
    title: "Arthritis exercises",
    description: "Explore joint-specific movement and strengthening routines, with guidance on choosing a suitable starting point.",
    links: [{ label: "Choose arthritis exercises", href: "/exercises" }, { label: "Exercise and arthritis guide", href: "/guides/exercise" }],
  },
  {
    title: "PIP arthritis guidance",
    description: "Understand how arthritis affects daily living and mobility, and find help preparing evidence for a PIP application.",
    links: [{ label: "Read the arthritis PIP guide", href: "/guides/benefits-pip" }],
  },
  {
    title: "Understand pain relief",
    description: "Questions about medicines? Start with what they are used for, safety information and what to ask your pharmacist.",
    links: [
      { label: "Naproxen for arthritis", href: "/guides/painkillers-and-nsaids#naproxen" },
      { label: "Painkillers and NSAIDs", href: "/guides/painkillers-and-nsaids" },
    ],
  },
  {
    title: "Explore movement and supplements",
    description: "Find shoulder exercise guidance and explore the evidence and uncertainties around joint supplements.",
    links: [
      { label: "Shoulder exercises for arthritis", href: "/blog/shoulder-arthritis-exercises-uk" },
      { label: "Glucosamine: evidence and safety", href: "/supplements/glucosamine" },
      { label: "MSM: evidence and safety", href: "/supplements/msm" },
    ],
  },
  {
    title: "Understand your condition",
    description: "Explore symptoms, diagnosis and support, then choose the next step that fits your situation.",
    links: [
      { label: "What is arthritis?", href: "/conditions/arthritis" },
      { label: "Rheumatoid arthritis", href: "/conditions/rheumatoid-arthritis" },
      { label: "Axial spondyloarthritis and ankylosing spondylitis", href: "/conditions/ankylosing-spondylitis" },
      { label: "Gout", href: "/conditions/gout" },
    ],
  },
];

export default function HomeTopicGuides() {
  return (
    <section aria-labelledby="arthritis-topic-guides" className="bg-muted/40 py-10 md:py-14">
      <div className="container mx-auto max-w-6xl px-5 md:px-10">
        <p className="text-sm font-semibold text-primary">Find your next step</p>
        <h2 id="arthritis-topic-guides" className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
          Arthritis exercises, PIP and practical support
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Clear information for the questions that come with living with arthritis.
          Choose a topic to explore a free guide at your own pace.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {TOPIC_GROUPS.map((group) => (
            <div key={group.title} className="min-w-0 rounded-2xl border border-border bg-card p-5 md:p-6">
              <h3 className="text-lg font-bold">{group.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{group.description}</p>
              <ul className="mt-4 space-y-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={() => trackStartHereCard(link.label, link.href)}
                      className="inline-flex min-h-11 items-center rounded-sm py-2 text-sm font-semibold text-primary underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          General information, not a diagnosis or personal treatment plan. Ask a pharmacist
          or your healthcare team before changing medicines or starting supplements.
        </p>
      </div>
    </section>
  );
}
