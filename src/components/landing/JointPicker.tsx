/**
 * JointPicker — interactive "Where does it hurt?" band.
 * Clickable joint tiles route to the matching condition page.
 */
import { useNavigate } from "react-router-dom";
import {
  Footprints,
  PersonStanding,
  Hand,
  Move3d,
  Bone,
  Activity,
} from "lucide-react";
import "@/components/HeroSection.css";

type Joint = {
  label: string;
  icon: typeof Hand;
  to: string;
};

const JOINTS: Joint[] = [
  { label: "Knee", icon: Footprints, to: "/conditions/knee-arthritis" },
  { label: "Hip", icon: PersonStanding, to: "/conditions/osteoarthritis" },
  { label: "Hand", icon: Hand, to: "/conditions/hand-arthritis" },
  { label: "Shoulder", icon: Move3d, to: "/conditions/shoulder-arthritis" },
  { label: "Elbow", icon: Activity, to: "/conditions/elbow-arthritis" },
  { label: "Spine", icon: Bone, to: "/conditions/ankylosing-spondylitis" },
];

const JointPicker = () => {
  const navigate = useNavigate();

  return (
    <section
      id="joint-picker"
      aria-labelledby="joint-picker-heading"
      className="bg-background py-16 lg:py-20 border-b border-border/30 scroll-mt-24"
    >
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-16">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
            Find your guide
          </p>
          <h2
            id="joint-picker-heading"
            className="font-display text-3xl lg:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-foreground"
          >
            Where does it hurt?
          </h2>
          <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
            Tap a joint to jump straight to the clinically-reviewed plan for that area.
          </p>
        </div>

        <ul
          role="list"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5"
        >
          {JOINTS.map(({ label, icon: Icon, to }) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => navigate(to)}
                aria-label={`View guidance for ${label.toLowerCase()} pain`}
                className="hover-lift-crimson group w-full aspect-square flex flex-col items-center justify-center gap-3 rounded-2xl bg-secondary/40 hover:bg-secondary/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Icon
                  className="w-10 h-10 text-primary transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
                <span className="font-display text-base lg:text-lg font-semibold text-foreground">
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default JointPicker;
