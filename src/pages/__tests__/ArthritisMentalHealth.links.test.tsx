import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { readFileSync } from 'node:fs';
import ArthritisMentalHealth from '../ArthritisMentalHealth';

type Post = { slug: string; title: string };
const catalog = JSON.parse(readFileSync('src/content/blog/catalog.generated.json', 'utf8')) as Post[];
const published = new Map(catalog.map((post) => [post.slug, post]));
const bodies = JSON.parse(readFileSync('scripts/data/rendered-bodies.json', 'utf8')) as Record<string, string>;
const overrides = JSON.parse(readFileSync('scripts/data/rendered-bodies.overrides.json', 'utf8')) as Record<string, string>;
const railPattern = /(<h2>In-depth articles<\/h2>)<ul>[\s\S]*?<\/ul>/;

afterEach(cleanup);

function visibleRail() {
  render(<HelmetProvider><MemoryRouter><ArthritisMentalHealth /></MemoryRouter></HelmetProvider>);
  const section = screen.getByRole('heading', { name: 'In-depth articles' }).closest('section');
  if (!section) throw new Error('Missing in-depth articles section');
  return within(section).getAllByRole('link').map((link) => ({
    href: link.getAttribute('href'),
    title: link.textContent?.trim(),
  }));
}

function cachedRail() {
  const body = overrides['/arthritis-mental-health'];
  const document = new DOMParser().parseFromString(body, 'text/html');
  const heading = Array.from(document.querySelectorAll('h2')).find((node) => node.textContent === 'In-depth articles');
  const list = heading?.nextElementSibling;
  if (list?.tagName !== 'UL') throw new Error('Missing cached in-depth articles list');
  return Array.from(list.querySelectorAll('a')).map((link) => ({
    href: link.getAttribute('href'),
    title: link.textContent?.trim(),
  }));
}

describe('mental-health published related articles', () => {
  it('renders ten distinct destinations in the published catalogue', () => {
    const links = visibleRail();
    expect(links).toHaveLength(10);
    expect(new Set(links.map((link) => link.href)).size).toBe(10);
    for (const link of links) {
      expect(link.href).toMatch(/^\/blog\/[a-z0-9-]+$/);
      expect(published.has(link.href!.slice('/blog/'.length))).toBe(true);
    }
  });

  it('uses the real published titles rather than draft outline titles', () => {
    for (const link of visibleRail()) {
      expect(link.title).toBe(published.get(link.href!.slice('/blog/'.length))?.title);
    }
  });

  it('keeps the crawler rail equal to the visible React rail', () => {
    expect(cachedRail()).toEqual(visibleRail());
  });

  it('preserves every byte of the saved article outside the related rail', () => {
    const original = bodies['/arthritis-mental-health'];
    const corrected = overrides['/arthritis-mental-health'];
    expect(original).toMatch(railPattern);
    expect(corrected).toMatch(railPattern);
    expect(corrected.replace(railPattern, '$1')).toBe(original.replace(railPattern, '$1'));
  });
});
