import { brand } from '@/lib/brand';
import { ContactClient } from './ContactClient';

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero__grid">
          <div>
            <span className="eyebrow">{brand.contactLabel}</span>
            <h1>Flag a blindspot or a rating.</h1>
            <p>
              Wrong lean on an outlet? Missing publisher in a cluster? Tell us what you compared and what we should add.
            </p>
          </div>
          <div className="page-hero__aside">
            <strong>{brand.email}</strong>
            <p>Source disputes: include the outlet name and links to methodology or examples.</p>
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="shell contact-layout">
          <aside className="contact-aside">
            <span className="eyebrow">Open channel</span>
            <h2>Make the next comparison better.</h2>
            <p>We read every message. The useful ones often start with “I noticed…”</p>
            <div className="contact-links">
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                Instagram ↗
              </a>
              <a href="https://bsky.app/" target="_blank" rel="noopener noreferrer">
                Bluesky ↗
              </a>
            </div>
          </aside>
          <ContactClient />
        </div>
      </section>
    </>
  );
}
