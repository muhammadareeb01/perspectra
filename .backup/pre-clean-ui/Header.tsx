'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

const links = [
  ['/how-it-works', 'How It Works'],
  ['/sources', 'Sources'],
  ['/dome-gossip', 'Dome Gossip'],
  ['/about', 'About'],
  ['/who-we-are', 'Who We Are'],
  ['/contact', 'Contact']
];

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="shell site-header__inner">
    <Logo />
    <nav className="desktop-nav" aria-label="Primary navigation"><Link href="/">Home</Link>{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</nav>
    <ThemeToggle className="site-header__theme" />
    <Link href="/support" className="button button--dark site-header__support">Support Us <span aria-hidden="true">↗</span></Link>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((value) => !value)}><span /> <span /> <span /><span className="sr-only">Toggle navigation</span></button>
  </div><div id="mobile-nav" className={`mobile-nav ${open ? 'is-open' : ''}`}><div className="shell"><div className="mobile-theme"><ThemeToggle /></div>{[...[['/', 'Home']], ...links, ['/support', 'Support Us']].map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</div></div></header>;
}
