'use client';

import Link from 'next/link';
import { useState } from 'react';
import { brand } from '@/lib/brand';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { SupportUsButton } from './SupportUsButton';

const links = [
  ['/clusters', 'Clusters'],
  ['/who-we-are', 'Who We Are'],
  [brand.contactPath, brand.contactLabel]
];

export function Header({ scrolled = false }: { scrolled?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="shell site-header__inner">
        <Logo markOnly />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/">Home</Link>
          {links.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <ThemeToggle className="site-header__theme" />
        <SupportUsButton />
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span /> <span /> <span />
          <span className="sr-only">Toggle navigation</span>
        </button>
      </div>
      <div id="mobile-nav" className={`mobile-nav ${open ? 'is-open' : ''}`}>
        <div className="shell">
          <div className="mobile-theme">
            <ThemeToggle />
          </div>
          {[['/', 'Home'] as const, ...links].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <SupportUsButton variant="nav" onOpen={() => setOpen(false)} />
        </div>
      </div>
    </header>
  );
}
