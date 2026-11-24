import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ArticleVideo from '../blog/ArticleVideo';
import { BLOG_VIDEOS } from '@/data/blogVideos';

const video = BLOG_VIDEOS['cooking-with-arthritis-uk'];
afterEach(() => { cleanup(); localStorage.clear(); });

describe('ArticleVideo privacy and reader control', () => {
  it('makes no third-party resource request before an explicit choice, even with analytics consent', () => {
    localStorage.setItem('lwa_cv3', JSON.stringify({ a: true, m: true }));
    const { container } = render(<ArticleVideo video={video} />);
    expect(container.querySelector('iframe,img,video,script,link')).toBeNull();
    expect(screen.getByRole('link', { name: /Watch on YouTube/ })).toHaveAttribute('href', video.url);
    expect(screen.getByRole('button', { name: /Allow YouTube/ })).toBeVisible();
  });
  it('loads only the selected privacy-enhanced player without autoplay or changing site consent', () => {
    localStorage.setItem('lwa_cv3', JSON.stringify({ a: false, m: false }));
    const before = { ...localStorage };
    render(<ArticleVideo video={video} />);
    fireEvent.click(screen.getByRole('button', { name: /Allow YouTube/ }));
    const frame = screen.getByTitle(video.title);
    expect(frame).toHaveAttribute('src', `https://www.youtube-nocookie.com/embed/${video.id}?rel=0`);
    expect(frame).toHaveAttribute('loading', 'lazy');
    expect(frame.getAttribute('allow')).not.toContain('autoplay');
    expect({ ...localStorage }).toEqual(before);
    fireEvent.click(screen.getByRole('button', { name: /Remove YouTube player/ }));
    expect(screen.queryByTitle(video.title)).toBeNull();
    expect({ ...localStorage }).toEqual(before);
  });
  it('uses landscape geometry for a public long film without changing Short geometry', () => {
    const long = BLOG_VIDEOS['osteoporosis-arthritis-frailty-bone-joint-uk'];
    const { container } = render(<ArticleVideo video={long} />);
    expect(container.querySelector('.aspect-video')).toBeTruthy();
    expect(screen.getByText('A video from Living With Arthritis.')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: /Allow YouTube/ }));
    expect(screen.getByTitle(long.title)).toHaveAttribute('width', '1280');
    expect(screen.getByTitle(long.title)).toHaveAttribute('height', '720');
  });
  it('keeps a small explicit topic map with only checked public films', () => {
    expect(Object.keys(BLOG_VIDEOS)).toHaveLength(4);
    for (const item of Object.values(BLOG_VIDEOS)) {
      expect(item.id).toMatch(/^[a-zA-Z0-9_-]{11}$/);
      expect(item.url).toBe(item.format === 'landscape' ? `https://www.youtube.com/watch?v=${item.id}` : `https://www.youtube.com/shorts/${item.id}`);
    }
  });
});
