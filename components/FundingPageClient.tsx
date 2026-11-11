'use client';

import Link from 'next/link';
import { FundingGoalProgress } from '@/components/FundingGoalProgress';
import { FundingPledgeList } from '@/components/FundingPledgeList';

export function FundingPageClient() {
  return (
    <section className="page-section page-section--soft">
      <div className="shell funding-page-layout">
        <FundingGoalProgress embedded />
        <div className="funding-page-layout__list">
          <span className="eyebrow">Supporters</span>
          <h2 className="funding-page-layout__title">Who pledged</h2>
          <p className="muted funding-page-layout__intro">Names and amounts everyone can see here — no payment taken yet.</p>
          <FundingPledgeList />
          <p className="funding-back">
            <Link className="text-link" href="/support">
              Reward tiers &amp; goals <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
