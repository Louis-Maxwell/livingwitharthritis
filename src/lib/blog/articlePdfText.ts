export interface PdfCitation {
  label: string;
  url: string;
}

interface Input {
  html: string;
  origin: string;
  directAnswer?: string;
  faqs?: { question: string; answer: string }[];
  citations?: PdfCitation[];
  reviewLine?: string;
  disclaimer?: string;
}

/** Plain-text body of the complete article PDF, in reading order. */
export function buildArticlePdfText(input: Input): string {
  const parsed = new DOMParser().parseFromString(input.html, 'text/html');
  parsed.querySelectorAll('script, style, iframe').forEach((n) => n.remove());
  parsed
    .querySelectorAll('p,h1,h2,h3,h4,li,tr,figcaption')
    .forEach((n) => n.append('\n'));
  const parts: string[] = [];
  if (input.reviewLine) parts.push(input.reviewLine);
  if (input.directAnswer) parts.push('In short', input.directAnswer);
  parts.push(parsed.body.textContent ?? '');
  const bodyText = parsed.body.textContent ?? '';
  const extraFaqs = (input.faqs ?? []).filter((f) => !bodyText.includes(f.question));
  if (extraFaqs.length) {
    parts.push('Frequently asked questions');
    extraFaqs.forEach((f) => parts.push(f.question, f.answer));
  }
  // Only genuine recorded sources; in-text links are listed separately.
  const sources = (input.citations ?? []).filter((c) => c.label && /^https?:\/\//i.test(c.url));
  if (sources.length) {
    parts.push('Sources and references');
    sources.forEach((c, i) => parts.push(`${i + 1}. ${c.label}: ${c.url}`));
  }
  const links = Array.from(parsed.querySelectorAll('a[href]'))
    .map((a) => {
      try {
        return `${a.textContent?.trim()}: ${new URL(a.getAttribute('href') ?? '', input.origin).href}`;
      } catch {
        return '';
      }
    })
    .filter(Boolean);
  if (links.length) parts.push('Links in this guide', ...links);
  if (input.disclaimer) parts.push('Important', input.disclaimer);
  return parts.join('\n');
}
