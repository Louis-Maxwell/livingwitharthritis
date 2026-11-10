// Match SeoHead's length policy in the HTML read by non-JavaScript crawlers.
import { cleanBrand } from '../../src/lib/technicalSeo.mjs';
const BRAND = ' | Living With Arthritis';

function truncateOnWord(text, max) {
  if (text.length <= max) return text;
  const slice = text.slice(0, max - 1);
  const space = slice.lastIndexOf(' ');
  const base = space > max * 0.6 ? slice.slice(0, space) : slice;
  return base.replace(/[\s\-–—,;:.]+$/, '') + '…';
}

export function normalizeStaticMeta(data) {
  if (!data) return data;
  let title = cleanBrand(data.title).trim();
  if (title.length > 60 && title.endsWith(BRAND)) {
    const subject = title.slice(0, -BRAND.length);
    // One brand suffix only: drop it rather than abbreviate it.
    title = subject;
  }
  return {
    ...data,
    title: truncateOnWord(title, 60),
    description: truncateOnWord(cleanBrand(data.description).trim().replace(/\s+/g, ' '), 160),
  };
}
