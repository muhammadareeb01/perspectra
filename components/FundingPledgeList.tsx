'use client';

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

export function FundingPledgeList() {
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
      <div className="funding-list-toolbar">
        <p className="muted">
          {loading ? 'Loading…' : (
            <>
              <strong>{formatPledgeEuro(total)}</strong> from {pledges.length}{' '}
              {pledges.length === 1 ? 'supporter' : 'supporters'}
            </>
          )}
        </p>
        <div className="funding-hero__actions">
          <SupportUsLink className="button button--dark">Support us</SupportUsLink>
          <button type="button" className="button button--surface" onClick={() => downloadPledgesTxt(pledges)} disabled={!pledges.length}>
            Download .txt
          </button>
          <button type="button" className="button button--surface" onClick={() => void refresh()} disabled={loading}>
            Refresh
          </button>
        </div>
      </div>

      <div className="card funding-table-wrap">
        {loading ? (
          <p className="muted funding-empty">Loading pledges…</p>
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
    </div>
  );
}
