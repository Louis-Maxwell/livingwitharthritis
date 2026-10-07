import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import data from "@/data/international-arthritis-support.json";

function ResourceLink({ url, name }: { url: string; name: string }) {
  return url.startsWith("/") ? <Link className="underline underline-offset-4" to={url}>{name}</Link> : <a className="underline underline-offset-4" href={url}>{name}</a>;
}

export default function InternationalArthritisSupport() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-12 space-y-8">
      <SeoHead title={data.title} description={data.description} path={data.path} includeSiteName={false} />
      <h1 className="text-3xl font-bold">{data.heading}</h1>
      <p className="leading-relaxed">{data.intro}</p>
      <nav aria-label="Choose your country">
        <ul className="flex flex-wrap gap-4">
          {data.countries.map(country => <li key={country.id}><a className="underline underline-offset-4" href={`#${country.id}`}>{country.name}</a></li>)}
        </ul>
      </nav>
      {data.countries.map(country => (
        <section key={country.id} id={country.id} className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl font-semibold">Arthritis support in {country.name}</h2>
          <p className="leading-relaxed">{country.text}</p>
          <ul className="list-disc pl-6 space-y-2">{country.links.map(link => <li key={link.url}><ResourceLink {...link} /></li>)}</ul>
        </section>
      ))}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Prepare for an arthritis appointment</h2>
        <ul className="list-disc pl-6 space-y-2">{data.preparation.map(item => <li key={item}>{item}</li>)}</ul>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Free arthritis guides</h2>
        <ul className="list-disc pl-6 space-y-2">{data.guides.map(link => <li key={link.url}><ResourceLink {...link} /></li>)}</ul>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Using information outside the UK</h2>
        <p className="leading-relaxed">{data.scope}</p>
        <p>Educational information, not a substitute for personalised medical advice. <Link className="underline" to="/disclaimer">Read our medical disclaimer</Link>.</p>
        <p className="text-sm text-muted-foreground">Resource directory updated <time dateTime={data.updatedAt}>7 October 2026</time>. External organisations manage their own services and information.</p>
      </section>
    </main>
  );
}
