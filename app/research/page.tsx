import Link from 'next/link';
import { NewsAvoidanceSection } from '@/components/NewsAvoidanceSection';
import { NewsRoutesSection } from '@/components/NewsRoutesSection';
import { MisinformationSpreadSection } from '@/components/MisinformationSpreadSection';
import { ResearchSourcesSection } from '@/components/ResearchSourcesSection';

export default function ResearchPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero__grid">
          <div>
            <span className="eyebrow">Research</span>
            <h1>Numbers behind the product.</h1>
            <p>Charts from Reuters, Pew, and peer-reviewed work. Every figure links to its source.</p>
          </div>
          <div className="page-hero__aside">
            <Link className="text-link" href="/who-we-are">
              Meet the team <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <NewsAvoidanceSection />
      <NewsRoutesSection />
      <MisinformationSpreadSection />
      <ResearchSourcesSection />
    </>
  );
}
