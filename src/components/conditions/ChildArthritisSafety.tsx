import safety from "@/data/childArthritisSafety.json";

export default function ChildArthritisSafety() {
  return <aside aria-label="Child joint and eye safety" className="my-8 rounded-xl border border-border bg-accent/30 p-5 space-y-4 text-foreground">
    <h2 className="text-xl font-semibold">A child with joint symptoms: when to get help</h2>
    <p>{safety.gp}</p>
    <h3 className="font-semibold">Emergency help</h3><p>{safety.emergency}</p>
    <h3 className="font-semibold">Eye symptoms and screening</h3><p>{safety.eyes}</p>
    <h3 className="font-semibold">Exercise must fit the child</h3><p>{safety.exercise}</p>
    <p className="text-sm font-medium">{safety.pending}</p>
    <h3 className="font-semibold">Sources checked for this update</h3>
    <ul className="list-disc pl-6 space-y-2">{safety.sources.map(s => <li key={s.url}><a className="text-foreground underline" href={s.url}>{s.label}</a></li>)}</ul>
  </aside>;
}
