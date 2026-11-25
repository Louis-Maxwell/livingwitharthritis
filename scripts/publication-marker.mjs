import { execFileSync } from 'node:child_process';

/** A build identity, not a deploy claim. Omit it if the checkout cannot prove its revision. */
export function buildRevision(read = () => execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()) {
  try {
    const revision = read();
    return /^[a-f0-9]{40}$/.test(revision) ? revision : null;
  } catch { return null; }
}

export function publicationMarker() {
  return {
    name: 'lwa-publication-marker',
    apply: 'build',
    transformIndexHtml() {
      const revision = buildRevision();
      return revision ? [{ tag: 'meta', attrs: { name: 'lwa-build-revision', content: revision }, injectTo: 'head' }] : [];
    },
  };
}
