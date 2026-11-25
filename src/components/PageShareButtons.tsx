import { useEffect, useState } from 'react';
import SocialShareButtons from './SocialShareButtons';

/** Shared guide chrome reads the existing headline, never invents page copy. */
export default function PageShareButtons({ path }: { path: string }) {
  const [title, setTitle] = useState('');
  useEffect(() => {
    const read = () => setTitle(document.querySelector('main h1')?.textContent?.trim() || '');
    read();
    const observer = new MutationObserver(read);
    const main = document.querySelector('main');
    if (main) observer.observe(main, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [path]);
  if (!title) return null;
  return <div className="container mx-auto max-w-5xl px-6 pt-6 print:hidden">
    <SocialShareButtons title={title} path={path} variant="compact" />
  </div>;
}