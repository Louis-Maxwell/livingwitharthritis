import AnswerBox from "@/components/seo/AnswerBox";
import answers from "@/data/priority-direct-answers.json";
import INTERNATIONAL_LEXICON from "@/data/international-lexicon.json";

/** A source-linked lead, reusing the site's answer-box presentation. */
export default function DirectAnswerCapsule({ route }: { route: string }) {
  const entry = (answers as Record<string, typeof answers[keyof typeof answers]>)[route];
  if (!entry) return null;
  return <section className="quick-answer-card my-6 text-left" aria-label="Quick answer and sources">
    <AnswerBox question={entry.question}><p>{entry.answer}</p></AnswerBox>
    <p className="mt-2 text-xs text-muted-foreground">Source-based educational summary. This updated summary is awaiting a separate clinical review.</p>
    <p className="text-sm text-muted-foreground">Sources: {entry.sources.map((source, i) => <span key={source.url}>{i > 0 && " · "}<a href={source.url} className="underline" rel="noopener noreferrer">{source.label}</a></span>)}</p>
    <details className="mt-3 text-sm"><summary className="min-h-11 cursor-pointer py-3 pr-4 font-semibold">UK terms explained for international readers</summary><dl className="space-y-3">{INTERNATIONAL_LEXICON.filter((term) => term.term !== "Paracetamol" || route.includes("arthritis")).map((term) => <div key={term.term}><dt className="font-semibold">{term.term}</dt><dd>{term.explanation} <a href={term.source} className="underline" rel="noopener noreferrer">{term.label}</a></dd></div>)}</dl><p className="mt-3">UK care pathways and medicine advice remain UK-specific. Check local advice where you live.</p></details>
  </section>;
}
