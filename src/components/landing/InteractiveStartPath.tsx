import { memo, useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type JointId = "knee" | "hip" | "hands" | "back" | "neck" | "all-over";
type NeedId = "exercises" | "condition" | "diet" | "benefits" | "donate";

type ResultLink = {
  href: string;
  label: string;
  sub: string;
};

const JOINTS: { id: JointId; label: string }[] = [
  { id: "knee", label: "Knee" },
  { id: "hip", label: "Hip" },
  { id: "hands", label: "Hands" },
  { id: "back", label: "Back" },
  { id: "neck", label: "Neck" },
  { id: "all-over", label: "All over" },
];

const NEEDS: { id: NeedId; label: string }[] = [
  { id: "exercises", label: "Gentle exercises" },
  { id: "condition", label: "Understand my condition" },
  { id: "diet", label: "Diet" },
  { id: "benefits", label: "Benefits & PIP" },
  { id: "donate", label: "Donate" },
];

const JOINT_COPY: Record<JointId, string> = {
  knee: "knee",
  hip: "hip",
  hands: "hands and wrists",
  back: "back",
  neck: "neck",
  "all-over": "joints throughout the body",
};

const CONDITION_BY_JOINT: Record<JointId, ResultLink> = {
  knee: {
    href: "/conditions/knee-arthritis",
    label: "Knee arthritis guide",
    sub: "Causes, NICE-aligned care and what to ask your clinician.",
  },
  hip: {
    href: "/conditions/hip-arthritis",
    label: "Hip arthritis guide",
    sub: "Stiffness, walking and when to seek assessment.",
  },
  hands: {
    href: "/conditions/hand-arthritis",
    label: "Hand arthritis guide",
    sub: "Fingers, thumbs and everyday grip — in plain English.",
  },
  back: {
    href: "/living-with-arthritis",
    label: "Living with arthritis",
    sub: "A calm overview if back stiffness is part of a wider picture.",
  },
  neck: {
    href: "/living-with-arthritis",
    label: "Living with arthritis",
    sub: "General guidance when neck pain sits alongside other joints.",
  },
  "all-over": {
    href: "/conditions/osteoarthritis",
    label: "Osteoarthritis guide",
    sub: "The most common form of arthritis in the UK.",
  },
};

const EXERCISE_BY_JOINT: Record<JointId, ResultLink> = {
  knee: {
    href: "/exercises/stretching-for-knee-arthritis",
    label: "Gentle knee stretching",
    sub: "Slow, joint-friendly stretches you can do at home.",
  },
  hip: {
    href: "/guides/hip-exercises-for-osteoarthritis",
    label: "Hip exercises for osteoarthritis",
    sub: "Clinically reviewed movements for hip OA.",
  },
  hands: {
    href: "/exercises/stretching-for-hand-arthritis",
    label: "Gentle hand stretching",
    sub: "Finger and wrist mobility without forcing through pain.",
  },
  back: {
    href: "/exercises/stretching-for-back-arthritis",
    label: "Gentle back stretching",
    sub: "Slow spinal mobility — stop if you feel sharp pain.",
  },
  neck: {
    href: "/exercises/neck-arthritis-exercises",
    label: "Neck arthritis exercises",
    sub: "Small, controlled movements for a stiff neck.",
  },
  "all-over": {
    href: "/exercises/tai-chi-for-arthritis",
    label: "Tai chi for arthritis",
    sub: "A whole-body, low-impact starting point.",
  },
};

const DIET_LINKS: ResultLink[] = [
  {
    href: "/diet",
    label: "Anti-inflammatory diet hub",
    sub: "Food that can support joints — it does not replace treatment.",
  },
  {
    href: "/diet/mediterranean-diet-for-arthritis",
    label: "Mediterranean-style eating",
    sub: "A practical UK pattern with arthritis in mind.",
  },
  {
    href: "/diet/foods-to-avoid-with-arthritis",
    label: "Foods that may flare symptoms",
    sub: "General patterns, not a personal meal plan.",
  },
];

const BENEFITS_LINKS: ResultLink[] = [
  {
    href: "/guides/benefits-pip",
    label: "Benefits & PIP guide",
    sub: "Eligibility, claiming and appealing PIP for arthritis.",
  },
  {
    href: "/guides/disability-support",
    label: "Disability support",
    sub: "Practical UK help beyond the clinic.",
  },
  {
    href: "/guides/work-with-arthritis",
    label: "Working with arthritis",
    sub: "Rights and adjustments at work.",
  },
];

const DONATE_LINKS: ResultLink[] = [
  {
    href: "/donate",
    label: "Donate",
    sub: "Keep these guides free for people across the UK.",
  },
  {
    href: "/ways-to-help",
    label: "Ways to help",
    sub: "Give time, skills or a gift — whatever fits today.",
  },
  {
    href: "/about",
    label: "About the charity",
    sub: "Registered charity 1218461, serving the UK. Independent of Arthritis UK.",
  },
];

const ON_PAGE_EXERCISES: ResultLink = {
  href: "#joint-exercises",
  label: "Home plan on this page",
  sub: "Tap a joint chip or the figure for a short exercise plan.",
};

const EXERCISE_HUB: ResultLink = {
  href: "/exercises",
  label: "Exercise hub",
  sub: "Chair, pool and joint-by-joint routines.",
};

const OA_GUIDE: ResultLink = {
  href: "/conditions/osteoarthritis",
  label: "Osteoarthritis guide",
  sub: "The commonest cause of joint pain in later life.",
};

const NEWLY_DIAGNOSED: ResultLink = {
  href: "/guides/newly-diagnosed",
  label: "Newly diagnosed",
  sub: "A calm first read if you have a recent diagnosis.",
};

function uniqueLinks(links: ResultLink[]): ResultLink[] {
  const seen = new Set<string>();
  return links.filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
}

function buildResults(joint: JointId, need: NeedId): { links: ResultLink[]; nextStep: string } {
  const area = JOINT_COPY[joint];

  if (need === "diet") {
    return {
      links: DIET_LINKS,
      nextStep: `Read the diet hub first, then try one small change that fits ${area} pain. Food can support joints; it does not replace your clinician.`,
    };
  }

  if (need === "benefits") {
    return {
      links: BENEFITS_LINKS,
      nextStep: `Start with the PIP guide. Awards look at how ${area} pain affects daily life — not at a diagnosis from this website.`,
    };
  }

  if (need === "donate") {
    return {
      links: DONATE_LINKS,
      nextStep:
        "A gift keeps clinically reviewed guidance free. Living With Arthritis is charity 1218461, a UK national charity independent of Arthritis UK.",
    };
  }

  if (need === "exercises") {
    return {
      links: uniqueLinks([EXERCISE_BY_JOINT[joint], ON_PAGE_EXERCISES, EXERCISE_HUB]).slice(0, 3),
      nextStep: `Try one gentle movement for your ${area} today. Stop if it hurts. This is not a prescribed physio programme.`,
    };
  }

  // understand my condition
  return {
    links: uniqueLinks([CONDITION_BY_JOINT[joint], OA_GUIDE, NEWLY_DIAGNOSED]).slice(0, 3),
    nextStep: `Read the ${area} page first. It is general information to help you prepare for a conversation with your GP or physiotherapist.`,
  };
}

const chipBase =
  "inline-flex items-center justify-center min-h-11 min-w-[44px] px-3.5 py-2 rounded-full border text-sm font-semibold leading-tight text-center select-none max-w-full break-words focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const chipIdle = "bg-card text-foreground border-border hover:border-primary/50";
const chipOn = "bg-primary text-primary-foreground border-primary";

function ChoiceChip<T extends string>({
  id,
  label,
  checked,
  onChange,
}: {
  id: T;
  label: string;
  checked: boolean;
  onChange: (id: T) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(id)}
      className={`${chipBase} ${checked ? chipOn : chipIdle}`}
    >
      {label}
    </button>
  );
}

const InteractiveStartPath = memo(() => {
  const reduceMotion = useReducedMotion();
  const [joint, setJoint] = useState<JointId | null>(null);
  const [need, setNeed] = useState<NeedId | null>(null);

  const results = useMemo(
    () => (joint && need ? buildResults(joint, need) : null),
    [joint, need],
  );

  const onJoint = useCallback(
    (id: JointId) => {
      setJoint(id);
      trackEvent("start_path_joint", { joint: id });
    },
    [],
  );

  const onNeed = useCallback(
    (id: NeedId) => {
      setNeed(id);
      trackEvent("start_path_need", { need: id, joint: joint ?? "none" });
    },
    [joint],
  );

  const reset = useCallback(() => {
    setJoint(null);
    setNeed(null);
  }, []);

  const skipMotion = Boolean(reduceMotion);

  return (
    <section
      id="start-here"
      aria-labelledby="start-here-heading"
      className="scroll-mt-24 w-full max-w-full overflow-x-hidden border-y border-border/40 bg-secondary/30 py-10 lg:py-12"
    >
      <div className="container mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
          Start here
        </p>
        <h2
          id="start-here-heading"
          className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight text-balance"
        >
          Find your starting point
        </h2>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
          Living with pain is tiring enough without hunting for answers. Two taps, specific pages,
          and a clear next step. No diagnosis — this is general information, not personal medical advice.
        </p>

        <div className="mt-6 space-y-5">
          <fieldset className="min-w-0">
            <legend className="text-sm font-semibold text-foreground mb-2">
              <span className="text-primary mr-1.5" aria-hidden="true">
                1.
              </span>
              Where does it hurt?
            </legend>
            <div className="flex flex-wrap gap-2">
              {JOINTS.map((j) => (
                <ChoiceChip
                  key={j.id}
                  id={j.id}
                  label={j.label}
                  checked={joint === j.id}
                  onChange={onJoint}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="min-w-0">
            <legend className="text-sm font-semibold text-foreground mb-2">
              <span className="text-primary mr-1.5" aria-hidden="true">
                2.
              </span>
              What do you need today?
            </legend>
            <div className="flex flex-wrap gap-2">
              {NEEDS.map((n) => (
                <ChoiceChip
                  key={n.id}
                  id={n.id}
                  label={n.label}
                  checked={need === n.id}
                  onChange={onNeed}
                />
              ))}
            </div>
          </fieldset>
        </div>

        {results ? (
            <motion.div
              key={`${joint}-${need}`}
              initial={skipMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: skipMotion ? 0 : 0.2 }}
              className="mt-6 rounded-2xl border border-border bg-card p-4 sm:p-5"
              aria-live="polite"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-1">
                3. Next step
              </p>
              <p className="text-sm text-foreground leading-relaxed">{results.nextStep}</p>

              <ul className="mt-4 space-y-2">
                {results.links.map((link) => {
                  const inner = (
                    <>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold text-foreground group-hover:text-primary">
                          {link.label}
                        </span>
                        <span className="block text-xs text-muted-foreground mt-0.5">
                          {link.sub}
                        </span>
                      </span>
                      <ArrowRight
                        className="w-4 h-4 shrink-0 text-primary mt-0.5"
                        aria-hidden="true"
                      />
                    </>
                  );
                  const cls =
                    "group flex items-start gap-3 min-h-11 w-full max-w-full rounded-xl border border-border/60 bg-background px-3.5 py-3 text-left hover:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
                  return (
                    <li key={link.href} className="min-w-0">
                      {link.href.startsWith("#") ? (
                        <a href={link.href} className={cls}>
                          {inner}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className={cls}
                          onClick={() =>
                            trackEvent("start_path_result", {
                              joint,
                              need,
                              to: link.href,
                            })
                          }
                        >
                          {inner}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                This is general information, not personal medical advice. Living With Arthritis
                is a registered charity in England and Wales (no.&nbsp;1218461), serving the UK,
                and independent of Arthritis UK. Clinical review: HCPC PH128483.
              </p>

              <button
                type="button"
                onClick={reset}
                className="mt-3 inline-flex items-center gap-1.5 min-h-11 px-3 text-sm font-semibold text-foreground/80 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Start again
              </button>
            </motion.div>
          ) : (
            <p className="mt-5 text-sm text-muted-foreground">
              Choose a joint and what you need — we will show two or three honest next pages.
            </p>
          )}
      </div>
    </section>
  );
});

InteractiveStartPath.displayName = "InteractiveStartPath";
export default InteractiveStartPath;
