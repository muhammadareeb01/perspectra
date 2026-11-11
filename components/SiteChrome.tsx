'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { NewsTicker } from './NewsTicker';
import { ThemeProvider } from './ThemeProvider';

export function SiteChrome({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <ThemeProvider>
      <div className={`site-top ${scrolled ? 'is-scrolled' : ''}`}>
        <Header scrolled={scrolled} />
        <NewsTicker />
      </div>
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
