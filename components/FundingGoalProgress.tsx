'use client';

import { useCallback, useEffect, useState } from 'react';
import { FUNDING_GOAL_EUR, fundingGoalPercent } from '@/lib/funding-goal';
import { fetchAllPledges, formatPledgeEuro, sumPledgesEur } from '@/lib/pledges';
import { SupportUsLink } from '@/components/SupportUsLink';

type FundingGoalProgressProps = {
  /** Smaller copy for the support modal. */
  compact?: boolean;
  /** Inside /funding — no extra section wrapper. */
  embedded?: boolean;
  /** Animate the bar on first paint. */
  animate?: boolean;
};

export function FundingGoalProgress({ compact = false, embedded = false, animate = true }: FundingGoalProgressProps) {
  const [raised, setRaised] = useState(0);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    const pledges = await fetchAllPledges();
    setRaised(sumPledgesEur(pledges));
    setReady(true);
  }, []);

  useEffect(() => {
    void refresh();
    const onSaved = () => void refresh();
    window.addEventListener('perspectra-pledge-saved', onSaved);
    return () => window.removeEventListener('perspectra-pledge-saved', onSaved);
  }, [refresh]);

  const percent = fundingGoalPercent(raised);
  const remaining = Math.max(0, FUNDING_GOAL_EUR - raised);
  const barWidth = animate && ready ? `${percent}%` : '0%';

  if (compact) {
    return (
      <div className="funding-goal funding-goal--compact">
        <div className="funding-goal__row">
          <span className="funding-goal__raised">{formatPledgeEuro(raised)}</span>
          <span className="muted">of {formatPledgeEuro(FUNDING_GOAL_EUR)} goal</span>
        </div>
        <div className="progress-track progress-track--sm">
          <span style={{ width: barWidth }} />
        </div>
      </div>
    );
  }

  const card = (
    <div className="progress-card funding-goal">
      <div className="progress-card__top">
        <strong>{percent}%</strong>
        <span>toward our {formatPledgeEuro(FUNDING_GOAL_EUR)} goal</span>
      </div>
      <div className="progress-track">
        <span style={{ width: barWidth }} />
      </div>
      <div className="funding-goal__stats">
        <p>
          <strong>{formatPledgeEuro(raised)}</strong> raised
        </p>
        <p className="muted">{formatPledgeEuro(remaining)} to go</p>
      </div>
      <div className="funding-goal__cta">
        <SupportUsLink className="button button--dark">Support us</SupportUsLink>
      </div>
    </div>
  );

  if (embedded) return card;

  return (
    <section className="page-section" style={{ paddingTop: 0 }}>
      <div className="shell">{card}</div>
    </section>
  );
}
