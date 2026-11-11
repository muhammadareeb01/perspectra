'use client';

import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { ThemeProvider } from './ThemeProvider';

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <div className="site-top">
        <Header />
      </div>
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
