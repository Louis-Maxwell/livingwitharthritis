import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import { injectJsonLd } from '@/lib/jsonLd';
import copy from '@/data/arthritisFlagshipApproved.json';
const links = [
  ['/guides/uk-arthritis', 'UK arthritis guide'],
  ['/conditions/osteoarthritis', 'Osteoarthritis'],
  ['/conditions/rheumatoid-arthritis', 'Rheumatoid arthritis'],
  ['/conditions/psoriatic-arthritis', 'Psoriatic arthritis'],
  ['/conditions/gout', 'Gout'],
  ['/living-with-arthritis', 'Living with arthritis'],
];
export default function Arthritis() {
  useEffect(() => {
    const clearArticle = injectJsonLd('arthritis-article', { '@context': 'https://schema.org', '@type': 'MedicalWebPage', headline: copy.title, description: copy.description, dateModified: '2026-11-26', mainEntityOfPage: 'https://livingwitharthritis.org.uk/conditions/arthritis', publisher: { '@type': 'Organization', name: 'Living With Arthritis' } });
    const clearFaq = injectJsonLd('arthritis-faq', { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: copy.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
    return () => { clearArticle(); clearFaq(); };
  }, []);
  return <article className="max-w-4xl mx-auto py-12 px-4">
    <SeoHead title={copy.title} includeSiteName={false} description={copy.description} path="/conditions/arthritis" type="article" />
    <nav aria-label="Breadcrumb" className="text-sm mb-4"><Link to="/" className="underline">Home</Link> / Arthritis</nav>
    <h1 className="text-4xl md:text-5xl font-bold mb-6">{copy.h1}</h1>
    <aside aria-label="Quick answer" className="my-8 pl-5 border-l-4 border-primary"><h2 className="text-lg font-semibold mb-2">What is arthritis?</h2><p className="leading-relaxed">{copy.answer}</p></aside>
    <aside aria-label="Editorial and clinical review status" className="my-6 rounded-lg border p-5 text-sm">{copy.note}</aside>
    {copy.sections.map(section => <section key={section.heading} className="mb-10">
      <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
      {section.paragraphs.map(p => p.startsWith('- ') ? <ul key={p} className="list-disc pl-6 space-y-2 mb-4">{p.split('\n').map(item => <li key={item}>{item.slice(2)}</li>)}</ul> : <p key={p} className="mb-4 leading-relaxed">{p}</p>)}
    </section>)}
    <nav aria-label="Related arthritis guides" className="flex flex-col gap-3 mb-10">{links.map(([to,label]) => <Link key={to} to={to} className="text-foreground underline">{label}</Link>)}</nav>
    <section className="mb-10"><h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>{copy.faqs.map(f => <div key={f.q} className="mb-6"><h3 className="text-lg font-semibold mb-2">{f.q}</h3><p>{f.a}</p></div>)}</section>
    <section className="mb-10"><h2 className="text-2xl font-bold mb-4">Sources for this text</h2><ul className="list-disc pl-6 space-y-2">{copy.sources.map(s => <li key={s.url}><a href={s.url} className="text-foreground underline">{s.name}</a></li>)}</ul></section>
    <p className="text-sm text-muted-foreground">General information from Living With Arthritis, not a diagnosis or personal treatment plan.</p>
  </article>;
}
