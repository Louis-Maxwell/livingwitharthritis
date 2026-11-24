import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/ui/PageBreadcrumb';
import AnswerBox from '@/components/seo/AnswerBox';
import copy from '@/data/supplementSafety24.json';

export default function SupplementSafetyGuide({ slug }: { slug: keyof typeof copy }) {
  const page = copy[slug];
  const path = slug.includes("-vs-") ? `/guides/${slug}` : `/supplements/${slug}`;
  const url = `https://livingwitharthritis.org.uk${path}`;
  return <><Helmet>
    <title>{page.title} | Living With Arthritis</title>
    <meta name="description" content={page.description} />
    <link rel="canonical" href={url} />
    <meta property="og:title" content={page.title} />
    <meta property="og:description" content={page.description} />
    <meta property="og:url" content={url} />
    <meta name="twitter:title" content={page.title} />
    <meta name="twitter:description" content={page.description} />
  </Helmet><Header /><PageBreadcrumb segments={[{ label: 'Supplements', href: '/supplements' }, { label: page.title }]} />
    <main id="main-content" className="container mx-auto max-w-3xl px-6 py-12 text-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">{page.title}</h1>
      <p className="text-lg mb-6">{page.description}</p>
      <p className="text-sm mb-6">Editorial safety update: 24 November 2026. This updated information is awaiting a separate clinical review. General information, not personal medical advice.</p>
      <AnswerBox question="What should I know before considering this supplement?"><p>{page.answer}</p></AnswerBox>
      {page.sections.map(section => <section key={section.heading} className="my-8"><h2 className="text-2xl font-bold mb-3">{section.heading}</h2><p className="leading-relaxed">{section.text}</p></section>)}
      <section className="my-8"><h2 className="text-2xl font-bold mb-3">Keep recommended care in place</h2><p className="leading-relaxed">For osteoarthritis, NICE recommends exercise tailored to your needs, such as muscle strengthening and aerobic activity. Weight management can help if you are living with overweight or obesity. If pain relief is needed, discuss suitable options with a pharmacist or clinician. The choice depends on your health conditions and other medicines. Supplements are not a replacement for this care. If you have rheumatoid arthritis or another inflammatory condition, continue the treatment agreed with your specialist team and ask them about symptoms that are not controlled.</p></section>
      <section className="my-8"><h2 className="text-2xl font-bold mb-3">Sources</h2><ul className="list-disc pl-6 space-y-3">{page.sources.map(source => <li key={source.url}><a className="underline" href={source.url} target="_blank" rel="noopener noreferrer">{source.name}</a></li>)}</ul></section>
      <p><Link className="underline" to="/supplements">Supplements overview</Link> · <Link className="underline" to="/conditions/osteoarthritis">Osteoarthritis care</Link></p>
    </main><Footer /></>;
}
