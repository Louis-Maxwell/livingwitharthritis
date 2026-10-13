import { useState } from 'react';
const questions = [
  'New difficulty starting urine, inability to pass urine, altered bladder fullness or urine-flow sensation, or new leakage?',
  'New loss of bowel control or reduced awareness when passing a bowel movement?',
  'New numbness, pins and needles or changed feeling around the genitals, anus, inner thighs or when wiping?',
  'With back pain, pain, tingling, weakness or numbness in both legs?',
  'New changes in genital sensation during sex, erection or orgasm with back pain?',
];
export default function CaudaEquinaQuestions() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const concern = Object.values(answers).some(a => a === 'yes' || a === 'unsure');
  return <section aria-labelledby="ces-questions" className="my-8 rounded-xl border-2 border-primary p-5">
    <h2 id="ces-questions" className="text-xl font-medium">Cauda equina warning-sign questions</h2>
    <p className="mt-3 font-semibold">If you have the warning signs described above, call 999 or go to A&amp;E now. Do not wait to answer these questions.</p>
    <p className="mt-2">This is an educational checklist, not a validated diagnostic test. It cannot confirm or rule out cauda equina syndrome. Answers stay in memory in this browser tab and are not submitted or saved by this checklist.</p>
    {questions.map((q, i) => <fieldset key={q} className="mt-5 border-t pt-4"><legend className="font-medium">{q}</legend><div className="flex flex-wrap gap-5 mt-2">{['yes', 'no', 'unsure'].map(value => <label key={value} className="inline-flex min-h-11 items-center gap-2"><input type="radio" name={`ces-${i}`} value={value} checked={answers[i] === value} onChange={() => setAnswers(prev => ({...prev, [i]: value}))}/>{value === 'unsure' ? 'Not sure' : value === 'yes' ? 'Yes' : 'No'}</label>)}</div></fieldset>)}
    <p role="status" aria-live="polite" className="mt-5 rounded-lg bg-muted p-4 font-semibold">{concern ? 'A new or worsening warning sign, or uncertainty about one, needs urgent medical assessment. With the back pain or nerve symptoms described here, call 999 or go to A&E now. Do not wait for all symptoms to appear.' : 'Answering No does not exclude cauda equina syndrome. There is no safe score. Seek emergency care for any new or worsening warning signs, even after using this checklist.'}</p>
    <button type="button" className="mt-3 min-h-11 underline no-print" onClick={() => setAnswers({})}>Clear answers</button>
  </section>;
}
