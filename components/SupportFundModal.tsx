'use client';

import Link from 'next/link';
import { FundingGoalProgress } from '@/components/FundingGoalProgress';
import { recordSupportPledge } from '@/lib/support-pledge';
import { useCallback, useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';

type SupportFundModalProps = {
  open: boolean;
  onClose: () => void;
};

function formatEuro(amount: number) {
  return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);
}

export function SupportFundModal({ open, onClose }: SupportFundModalProps) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<'form' | 'thanks'>('form');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedAmount, setSubmittedAmount] = useState<number | null>(null);
  const [submittedName, setSubmittedName] = useState('');
  const titleId = useId();
  const nameId = useId();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return undefined;
    setStep('form');
    setName('');
    setAmount('');
    setSubmitting(false);
    setSubmittedAmount(null);
    setSubmittedName('');
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const submit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const trimmedName = name.trim();
      const value = Number.parseFloat(amount.replace(',', '.'));
      if (!trimmedName || !Number.isFinite(value) || value <= 0) return;

      setSubmitting(true);
      await recordSupportPledge({ name: trimmedName, amountEur: value });
      setSubmittedName(trimmedName);
      setSubmittedAmount(value);
      setSubmitting(false);
      window.dispatchEvent(new Event('perspectra-pledge-saved'));
      setStep('thanks');
    },
    [amount, name]
  );

  if (!open || !mounted) return null;

  const parsed = Number.parseFloat(amount.replace(',', '.'));
  const canSubmit = name.trim().length > 0 && Number.isFinite(parsed) && parsed > 0 && !submitting;

  return createPortal(
    <div className="support-pop" onClick={onClose} role="presentation">
      <div
        className="support-pop__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="support-pop__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {step === 'form' ? (
          <>
            <div className="support-pop__slide">
              <h2 id={titleId} className="support-pop__fund-title">
                Support us
              </h2>
              <p className="support-pop__lede">
                Pick an amount in euros. We use it to add outlets, ship comparisons, and stay independent of ads.
              </p>
              <FundingGoalProgress compact animate={open} />
            </div>

            <form className="support-pop__form" onSubmit={submit}>
              <label className="support-pop__amount-label" htmlFor={nameId}>
                Your name
              </label>
              <input
                id={nameId}
                className="support-pop__text-input"
                type="text"
                name="supporter-name"
                autoComplete="name"
                placeholder="Type your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={submitting}
              />

              <label className="support-pop__amount-label" htmlFor="support-amount">
                Amount
              </label>
              <div className="support-pop__amount-row">
                <span className="support-pop__currency" aria-hidden="true">
                  €
                </span>
                <input
                  id="support-amount"
                  className="support-pop__amount-input"
                  type="number"
                  inputMode="decimal"
                  min="1"
                  step="1"
                  placeholder="25"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  disabled={submitting}
                />
              </div>
              <p className="support-pop__hint muted">
                No card charged yet — you will show on the{' '}
                <Link href="/funding" className="text-link">
                  funding list
                </Link>{' '}
                toward our €12,000 goal.
              </p>
              <button type="submit" className="button button--dark support-pop__cta" disabled={!canSubmit}>
                {submitting ? 'Saving…' : 'Submit'}
              </button>
            </form>
          </>
        ) : (
          <div className="support-pop__thanks">
            <p className="support-pop__thanks-eyebrow">You showed up</p>
            <h2 id={titleId} className="support-pop__fund-title">
              Thanks for funding us
            </h2>
            <p className="support-pop__thanks-body">
              {submittedName ? (
                <>
                  {submittedName}, thank you —
                </>
              ) : null}{' '}
              {submittedAmount != null ? (
                <>
                  <strong>{formatEuro(submittedAmount)}</strong> is exactly the kind of help that keeps Perspectra comparing
                  coverage without selling your attention.
                </>
              ) : (
                <>Your support keeps us comparing coverage without selling your attention.</>
              )}
            </p>
            <p className="support-pop__thanks-note muted">
              We will wire real payments soon. For now, tell a friend to open a cluster they would usually skip.
            </p>
            <Link className="button button--dark support-pop__cta" href="/funding" onClick={onClose}>
              See who pledged
            </Link>
            <button type="button" className="button button--surface support-pop__cta" style={{ marginTop: 10 }} onClick={onClose}>
              Back to the news
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
