import { FundingClient } from '@/components/FundingClient';

export default function FundingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero__grid">
          <div>
            <span className="eyebrow">Funding</span>
            <h1>Who pledged and how much.</h1>
            <p>
              Public list on this page — same for every visitor. Names and euro amounts are saved in a local JSON file (and a
              .txt log when you run the app on your machine).
            </p>
          </div>
          <div className="page-hero__aside">
            <strong>No cloud database</strong>
            <p>Open Funding after you submit from Support us. Export a notepad file anytime.</p>
          </div>
        </div>
      </section>
      <section className="page-section page-section--soft">
        <div className="shell">
          <FundingClient />
        </div>
      </section>
    </>
  );
}
