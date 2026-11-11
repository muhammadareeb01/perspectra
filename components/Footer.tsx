import Link from 'next/link';
import { brand } from '@/lib/brand';
import { Logo } from './Logo';
import { SupportUsLink } from './SupportUsLink';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__top">
          <div>
            <Logo size={50} className="logo--footer" />
            <p className="site-footer__tagline">{brand.tagline}</p>
            <Link className="site-footer__contact-cta" href={brand.contactPath}>
              {brand.contactLabel} →
            </Link>
          </div>
          <div className="footer-links">
            <div>
              <span className="footer-label">Explore</span>
              <Link href="/">Home</Link>
              <Link href="/clusters">All clusters</Link>
              <Link href="/research">Research</Link>
            </div>
            <div>
              <span className="footer-label">About</span>
              <Link href="/who-we-are">Who we are</Link>
              <Link href={brand.contactPath}>{brand.contactLabel}</Link>
              <SupportUsLink />
              <Link href="/support">Our €12k goal</Link>
            </div>
            <div>
              <span className="footer-label">Elsewhere</span>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${brand.name} on Instagram`}
              >
                Instagram
              </a>
              <a
                href="https://bsky.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${brand.name} on Bluesky`}
              >
                Bluesky
              </a>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>We are an aggregator, not a publisher. All articles belong to their original publishers.</p>
          <span>
            © {brand.year} {brand.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
