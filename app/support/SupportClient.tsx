'use client';

import Link from 'next/link';
import { FundingGoalProgress } from '@/components/FundingGoalProgress';

export function SupportClient() {
  return (
    <>
      <FundingGoalProgress />
      <section className="page-section page-section--soft">
        <div className="shell">
          <div className="contact-layout">
            <div className="contact-aside">
              <span className="eyebrow">Reward tiers</span>
              <h2>Small support. Wider view.</h2>
              <p>Your support helps us add more outlets, improve comparisons, and keep the site independent.</p>
            </div>
            <div>
              <table className="reward-table">
                <thead>
                  <tr>
                    <th>Tier</th>
                    <th>Thank you</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Small</td>
                    <td>Sticker in the post</td>
                  </tr>
                  <tr>
                    <td>Medium</td>
                    <td>Sticker + spin the wheel</td>
                  </tr>
                  <tr>
                    <td>Big</td>
                    <td>Custom rumour note + photo booth</td>
                  </tr>
                  <tr>
                    <td>Team</td>
                    <td>Your name on the Hall of Both Sides</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="shell">
          <div className="support-band">
            <div>
              <span className="eyebrow">Blue vs Red</span>
              <h2>Friendly rivalry, useful results.</h2>
              <p>Blue team: 1,842 points. Red team: 1,769 points.</p>
            </div>
            <Link className="button button--dark" href="/contact">
              Join the challenge <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="page-section" style={{ paddingBottom: 0 }}>
            <div className="methodology">
              <p>
                <strong>Share your code, both get a bonus.</strong> Referral codes will unlock when the support flow is
                connected. For now, send a friend to Perspectra and tell us what they should compare first.
              </p>
            </div>
            <div style={{ marginTop: 24 }}>
              <Link className="text-link" href="/contact">
                Ask about supporting Perspectra <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
