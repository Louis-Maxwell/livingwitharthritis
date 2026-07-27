import { useState } from "react";
import { ChevronDown, User2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ChatProfile,
  ARTHRITIS_TYPES,
  AGE_RANGES,
  JOINTS,
  SEVERITY_LEVELS,
  hasAnyProfileFields,
} from "@/lib/chatProfile";

interface AboutYouPanelProps {
  profile: ChatProfile;
  onChange: (next: ChatProfile) => void;
}

export function AboutYouPanel({ profile, onChange }: AboutYouPanelProps) {
  const [open, setOpen] = useState(false);
  const filled = hasAnyProfileFields(profile);

  const toggleJoint = (joint: string) => {
    const current = profile.affectedJoints ?? [];
    const next = current.includes(joint)
      ? current.filter((j) => j !== joint)
      : [...current, joint].slice(0, 10);
    onChange({ ...profile, affectedJoints: next });
  };

  return (
    <div className="border-b border-border/40 bg-muted/20">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-muted/40 transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2 text-xs">
          <User2 className="h-3.5 w-3.5 text-primary" />
          <span className="font-medium text-foreground">About you</span>
          {filled && (
            <span className="inline-flex items-center gap-0.5 text-[10px] text-primary bg-primary/8 px-1.5 py-0.5 rounded">
              <Check className="h-2.5 w-2.5" />
              Personalised
            </span>
          )}
          {!filled && (
            <span className="text-[10px] text-muted-foreground">Optional — for tailored answers</span>
          )}
        </div>
        <ChevronDown
          className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 pt-1 space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-foreground/80 mb-1">
                  Arthritis type
                </label>
                <select
                  value={profile.arthritisType ?? ""}
                  onChange={(e) => onChange({ ...profile, arthritisType: e.target.value || undefined })}
                  className="w-full rounded-md border border-border/50 bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary/30"
                >
                  <option value="">Prefer not to say</option>
                  {ARTHRITIS_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-foreground/80 mb-1">Age</label>
                  <select
                    value={profile.ageRange ?? ""}
                    onChange={(e) => onChange({ ...profile, ageRange: e.target.value || undefined })}
                    className="w-full rounded-md border border-border/50 bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary/30"
                  >
                    <option value="">—</option>
                    {AGE_RANGES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-foreground/80 mb-1">Severity</label>
                  <select
                    value={profile.severity ?? ""}
                    onChange={(e) => onChange({ ...profile, severity: e.target.value || undefined })}
                    className="w-full rounded-md border border-border/50 bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary/30"
                  >
                    <option value="">—</option>
                    {SEVERITY_LEVELS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-foreground/80 mb-1">
                  Most affected joints
                </label>
                <div className="flex flex-wrap gap-1">
                  {JOINTS.map((joint) => {
                    const selected = (profile.affectedJoints ?? []).includes(joint);
                    return (
                      <button
                        key={joint}
                        type="button"
                        onClick={() => toggleJoint(joint)}
                        className={cn(
                          "px-2 py-1 rounded-full text-[11px] border transition-colors",
                          selected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground/70 border-border/50 hover:border-primary/40",
                        )}
                      >
                        {joint}
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="text-[10px] text-muted-foreground pt-1">
                Saved only on this device. Not shared with anyone.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
