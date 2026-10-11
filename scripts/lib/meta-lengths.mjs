// Match SeoHead's length policy in the HTML read by non-JavaScript crawlers.
const BRAND = ' | Living With Arthritis';
const SHORT_BRAND = ' | LWA';

function truncateOnWord(text, max) {
  if (text.length <= max) return text;
  const slice = text.slice(0, max - 1);
  const space = slice.lastIndexOf(' ');
  const base = space > max * 0.6 ? slice.slice(0, space) : slice;
  return base.replace(/[\s\-–—,;:.]+$/, '') + '…';
}

export function normalizeStaticMeta(data) {
  if (!data) return data;
  let title = String(data.title ?? '').trim();
  if (title.length > 60 && title.endsWith(BRAND)) {
    const subject = title.slice(0, -BRAND.length);
    title = subject.length + SHORT_BRAND.length <= 60
      ? subject + SHORT_BRAND
      : subject;
  }
  return {
    ...data,
    title: truncateOnWord(title, 60),
    description: truncateOnWord(String(data.description ?? '').trim().replace(/\s+/g, ' '), 160),
  };
}
