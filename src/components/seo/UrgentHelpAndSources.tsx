import { getPrioritySources, RED_FLAGS } from "@/data/prioritySources";

/**
 * "When to get urgent help" (NHS wording, signposting only) plus NHS / NICE
 * sources for priority pages. Renders nothing for non-priority paths.
 */
export default function UrgentHelpAndSources({ path }: { path: string }) {
  const entry = getPrioritySources(path);
  if (!entry) return null;
  const flags = (entry.redFlags ?? []).map((k) => RED_FLAGS[k]);
  const urgent = flags.flatMap((f) => f.urgent);
  const emergency = flags.flatMap((f) => f.emergency);
  return (
    <div className="container mx-auto px-6 md:px-10 max-w-3xl my-10 space-y-8" data-testid="urgent-help-and-sources">
      {flags.length > 0 && (
        <section aria-labelledby="urgent-help-heading" className="rounded-lg border-l-4 border-destructive bg-destructive/5 p-6" data-testid="urgent-help">
          <h2 id="urgent-help-heading" className="text-xl font-semibold text-foreground mb-3">When to get urgent help</h2>
          <p className="text-sm text-muted-foreground mb-4">
            This is not a diagnosis. It follows NHS guidance on when symptoms need checking quickly.
          </p>
          {urgent.length > 0 && (
            <>
              <h3 className="font-semibold text-foreground mb-2">Ask for an urgent GP appointment or get help from NHS 111 if:</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1 text-foreground">
                {urgent.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </>
          )}
          {emergency.length > 0 && (
            <>
              <h3 className="font-semibold text-foreground mb-2">Go to A&amp;E or call 999 if you have:</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1 text-foreground">
                {emergency.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </>
          )}
          <p className="text-sm text-foreground">
            Do not wait for a routine appointment or for your next review if any of these apply.
          </p>
        </section>
      )}
      <section aria-labelledby="nhs-nice-sources-heading" data-testid="nhs-nice-sources">
        <h2 id="nhs-nice-sources-heading" className="text-xl font-semibold text-foreground mb-3">NHS and NICE sources</h2>
        <ul className="list-disc pl-6 space-y-1">
          {entry.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">{s.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
