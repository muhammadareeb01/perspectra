'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { SupportUsLink } from '@/components/SupportUsLink';
import {
  downloadPledgesTxt,
  fetchAllPledges,
  formatPledgeEuro,
  formatPledgeWhen,
  sumPledgesEur,
  type SupportPledge
} from '@/lib/pledges';

export function FundingClient() {
  const [pledges, setPledges] = useState<SupportPledge[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const rows = await fetchAllPledges();
    setPledges(rows);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
    const onSaved = () => void refresh();
    window.addEventListener('perspectra-pledge-saved', onSaved);
    return () => window.removeEventListener('perspectra-pledge-saved', onSaved);
  }, [refresh]);

  const total = sumPledgesEur(pledges);

  return (
    <div className="funding-page">
      <div className="funding-hero card">
        <div className="funding-hero__stat">
          <span className="eyebrow">Total pledged</span>
          <strong className="funding-hero__total">{formatPledgeEuro(total)}</strong>
          <p className="muted">{pledges.length} {pledges.length === 1 ? 'entry' : 'entries'} on this list</p>
        </div>
        <div className="funding-hero__actions">
          <SupportUsLink className="button button--dark">Support us</SupportUsLink>
          <button type="button" className="button button--surface" onClick={() => downloadPledgesTxt(pledges)} disabled={!pledges.length}>
            Download .txt
          </button>
          <button type="button" className="button button--surface" onClick={() => void refresh()} disabled={loading}>
            Refresh list
          </button>
        </div>
      </div>

      <p className="funding-note muted">
        Same list for every visitor on this page. On your computer, pledges also land in <code>data/pledges.txt</code> (Notepad-style)
        when you run <code>npm run dev</code>. Push <code>public/data/pledges.json</code> to GitHub to update the live site list.
      </p>

      <div className="card funding-table-wrap">
        {loading ? (
          <p className="muted funding-empty">Loading…</p>
        ) : pledges.length === 0 ? (
          <p className="muted funding-empty">
            No pledges yet. <SupportUsLink>Be the first</SupportUsLink>
          </p>
        ) : (
          <table className="reward-table funding-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              {pledges.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{formatPledgeEuro(row.amountEur)}</td>
                  <td className="muted">{formatPledgeWhen(row.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="funding-back">
        <Link className="text-link" href="/">
          Back to home <span aria-hidden="true">→</span>
        </Link>
      </p>
    </div>
  );
}
