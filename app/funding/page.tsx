import { FundingPageClient } from '@/components/FundingPageClient';

export default function FundingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero__grid">
          <div>
            <span className="eyebrow">Funding</span>
            <h1>Who pitched in and how far we are.</h1>
            <p>Public list of supporters plus progress toward our €12,000 goal.</p>
          </div>
          <div className="page-hero__aside">
            <strong>Transparent</strong>
            <p>Open the list after you pledge — no card charged in this demo.</p>
          </div>
        </div>
      </section>
      <FundingPageClient />
    </>
  );
}
