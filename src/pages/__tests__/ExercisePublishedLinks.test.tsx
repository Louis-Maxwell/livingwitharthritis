import { afterEach, describe, expect, it } from 'vitest';
import type { ReactNode } from 'react';
import { cleanup, render, screen, within, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { readFileSync } from 'node:fs';
import TaiChiForArthritis from '../exercises/TaiChiForArthritis';
import NeckArthritisExercises from '../exercises/NeckArthritisExercises';
import { exerciseJointPages } from '@/data/exerciseJointMatrix';

const seed = JSON.parse(readFileSync('scripts/data/rendered-bodies.json', 'utf8')) as Record<string, string>;
const overrides = JSON.parse(readFileSync('scripts/data/rendered-bodies.overrides.json', 'utf8')) as Record<string, string>;
const sitemap = new Set([...readFileSync('public/sitemap.xml', 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
const known = new Set(exerciseJointPages.map((page) => `/exercises/${page.slug}`));
const taiChiRoute = '/exercises/tai-chi-for-arthritis';
const neckRoute = '/exercises/neck-arthritis-exercises';
const shoulder = '/conditions/shoulder-arthritis/exercises';
const oldShoulder = '/exercises/shoulder-arthritis-exercises';
const invalid = ['/exercises/tai-chi-for-wrist-arthritis', '/exercises/tai-chi-for-foot-arthritis'];
const expectedJoints = ['Knee', 'Hip', 'Hand', 'Shoulder', 'Back', 'Ankle'];

afterEach(cleanup);
function show(page: ReactNode) {
  return render(<HelmetProvider><MemoryRouter>{page}</MemoryRouter></HelmetProvider>);
}
function visibleJoints() {
  show(<TaiChiForArthritis />);
  const section = screen.getByRole('heading', { name: 'Tai chi for your joint' }).closest('section');
  if (!section) throw new Error('Missing joint navigation');
  return within(section).getAllByRole('link').filter((link) => link.querySelector('h3')).map((link) => ({
    href: link.getAttribute('href')!,
    joint: link.querySelector('h3')?.textContent,
  }));
}
function cachedJoints() {
  const doc = new DOMParser().parseFromString(overrides[taiChiRoute], 'text/html');
  return Array.from(doc.querySelectorAll('a')).filter((a) => /^\/exercises\/tai-chi-for-[a-z-]+-arthritis$/.test(a.getAttribute('href') || '')).map((a) => ({ href: a.getAttribute('href')!, joint: a.querySelector('h3')?.textContent }));
}

describe('published exercise navigation', () => {
  it('keeps exactly the six configured tai-chi joint guides', () => {
    const links = visibleJoints();
    expect(links.map((link) => link.joint)).toEqual(expectedJoints);
    expect(new Set(links.map((link) => link.href)).size).toBe(6);
    for (const link of links) {
      expect(known.has(link.href)).toBe(true);
      expect(sitemap.has(link.href)).toBe(true);
    }
  });

  it('keeps the crawler joint links equal to the visible cards', () => {
    expect(cachedJoints()).toEqual(visibleJoints());
  });

  it('keeps only valid guide URLs in the matching ItemList schema', async () => {
    visibleJoints();
    await waitFor(() => {
      const blocks = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((script) => JSON.parse(script.textContent || '{}'));
      const list = blocks.find((block) => block['@type'] === 'ItemList' && block.itemListElement?.some((item: { url?: string }) => item.url?.endsWith('/exercises/tai-chi-for-knee-arthritis')));
      expect(list).toBeDefined();
      const urls = list.itemListElement.map((item: { url: string }) => new URL(item.url).pathname);
      expect(urls).toHaveLength(9);
      expect(list.itemListElement.map((item: { position: number }) => item.position)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      for (const href of invalid) expect(urls).not.toContain(href);
      for (const href of urls) expect(sitemap.has(href)).toBe(true);
    });
  });

  it('links neck readers to the real shoulder exercise page in both render paths', () => {
    show(<NeckArthritisExercises />);
    const heading = Array.from(document.querySelectorAll('article h2')).find((h) => h.textContent === 'Related guides');
    const section = heading?.closest('section');
    if (!section) throw new Error('Missing related guides');
    expect(within(section).getByRole('link', { name: 'Shoulder arthritis exercises' }).getAttribute('href')).toBe(shoulder);
    expect(sitemap.has(shoulder)).toBe(true);
    const doc = new DOMParser().parseFromString(overrides[neckRoute], 'text/html');
    const link = Array.from(doc.querySelectorAll('a')).find((a) => a.textContent === 'Shoulder arthritis exercises');
    expect(link?.getAttribute('href')).toBe(shoulder);
    expect(overrides[neckRoute]).not.toContain(oldShoulder);
  });

  it('preserves the tai-chi snapshot outside the two invalid navigation cards', () => {
    let expected = seed[taiChiRoute];
    for (const href of invalid) {
      const pattern = new RegExp(`<a\\b[^>]*\\bhref="${href}"[^>]*>[\\s\\S]*?<\\/a>`, 'g');
      expect(expected.match(pattern)).toHaveLength(1);
      expected = expected.replace(pattern, '');
    }
    expect(overrides[taiChiRoute]).toBe(expected);
  });

  it('preserves every other byte of the neck snapshot', () => {
    expect(overrides[neckRoute].replace(shoulder, oldShoulder)).toBe(seed[neckRoute]);
  });
});
