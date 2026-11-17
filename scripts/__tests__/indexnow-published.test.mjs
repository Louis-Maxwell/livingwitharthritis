import { describe, expect, it, vi } from 'vitest';
import { buildRevision, publicationMarker } from '../publication-marker.mjs';
import { changedPaths, pageIsPublished, verifyPublication } from '../indexnow-published.mjs';
import { ORIGIN } from '../indexnow-ping.mjs';

const revision = 'a'.repeat(40);
const url = `${ORIGIN}/blog/example`;
const html = `<html><head><link rel="canonical" href="${url}"><meta name="lwa-build-revision" content="${revision}"></head></html>`;

describe('production-gated IndexNow', () => {
  it('only accepts a proven full build revision, without inventing a fallback', () => {
    expect(buildRevision(() => revision)).toBe(revision);
    expect(buildRevision(() => 'main')).toBeNull();
    expect(buildRevision(() => { throw Error('no git'); })).toBeNull();
    expect(publicationMarker().apply).toBe('build');
  });
  it('selects changed published blog sources and changed ledger paths, not all URLs', () => {
    const files = ['src/content/blog/posts/example.json','src/content/blog/posts/draft.json','src/pages/App.tsx','src/data/content-modifications.json'];
    const current = file => file.includes('example') ? { slug: 'example', is_published: true } : file.includes('draft') ? { slug: 'draft', is_published: false } : { '/resources/tracker': { modified: '2026-11-17' }, '/same': { modified: '2026-01-01' }, '//foreign.test': {} };
    const previous = () => ({ '/same': { modified: '2026-01-01' } });
    expect(changedPaths(files, current, previous)).toEqual(['/blog/example','/resources/tracker']);
  });
  it('requires the exact page revision and canonical, and rejects noindex', () => {
    expect(pageIsPublished(html, url, revision)).toBe(true);
    expect(pageIsPublished(html, url, 'b'.repeat(40))).toBe(false);
    expect(pageIsPublished(html, url + '/alias', revision)).toBe(false);
    expect(pageIsPublished(html.replace('</head>','<meta name="robots" content="noindex,follow"></head>'), url, revision)).toBe(false);
    expect(pageIsPublished(html.replace('lwa-build-revision','old-marker'), url, revision)).toBe(false);
  });
  it('does not even read the sitemap or page when production revision is stale', async () => {
    const request = vi.fn().mockResolvedValue(new Response(JSON.stringify({ revision: 'b'.repeat(40) })));
    expect(await verifyPublication(revision, [url], request)).toBe(false);
    expect(request).toHaveBeenCalledTimes(1);
  });
  it('requires sitemap membership and exact published page, never submits in the verifier', async () => {
    const request = vi.fn().mockImplementation(async input => input.includes('/.well-known/') ? new Response(JSON.stringify({revision})) : input.endsWith('/sitemap.xml') ? new Response(`<urlset><url><loc>${url}</loc></url></urlset>`) : new Response(html));
    expect(await verifyPublication(revision, [url], request)).toBe(true);
    expect(request).toHaveBeenCalledTimes(3);
    expect(request.mock.calls.every(([input]) => input.startsWith(ORIGIN))).toBe(true);
  });
  it('rejects HTTP noindex and URLs absent from the production sitemap', async () => {
    const request = vi.fn().mockImplementation(async input => input.includes('/.well-known/') ? new Response(JSON.stringify({revision})) : input.endsWith('/sitemap.xml') ? new Response(`<urlset><url><loc>${url}</loc></url></urlset>`) : new Response(html, {headers:{'x-robots-tag':'noindex'}}));
    expect(await verifyPublication(revision, [url], request)).toBe(false);
    request.mockClear();
    expect(await verifyPublication(revision, [url + '-missing'], request)).toBe(false);
    expect(request).toHaveBeenCalledTimes(2);
  });
});
