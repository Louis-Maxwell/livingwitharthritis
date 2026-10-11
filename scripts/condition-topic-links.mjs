import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const clusters = JSON.parse(readFileSync(resolve('src/data/conditionTopicClusters.json'), 'utf8'));
const escape = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Condition links match the hydrated navigation and reference only known hubs. */
export function conditionTopicLinks(article) {
  const text = `${article?.slug ?? ''} ${article?.title ?? ''}`.replace(/-/g, ' ').toLowerCase();
  const cluster = clusters.find((row) => row.triggers.some((trigger) => text.includes(trigger)));
  if (!cluster) return '';
  const paths = [cluster.pillarPath, ...cluster.supportingPaths.slice(0, 3), cluster.toolPath];
  const current = `/blog/${article.slug}`;
  const links = [...new Set(paths)].filter((path) => path !== current).map((path) => {
    const label = path === cluster.pillarPath ? cluster.pillarTitle : path === cluster.toolPath ? cluster.toolLabel : `${cluster.label}: ${path.split('/').pop()}`;
    return `<li><a href="${escape(path)}">${escape(label)}</a></li>`;
  }).join('');
  return `<nav aria-label="${escape(cluster.label)} topic links"><h2>Explore ${escape(cluster.label)}</h2><ul>${links}</ul></nav>`;
}
