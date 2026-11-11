'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';

type SupportUsButtonProps = {
  className?: string;
  variant?: 'header' | 'nav';
  onOpen?: () => void;
};

function FundDanceBear({ furId }: { furId: string }) {
  return (
    <svg className="support-pop__bear-svg" viewBox="0 0 220 210" focusable="false" aria-hidden>
      <defs>
        <linearGradient id={furId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e8c79a" />
          <stop offset="100%" stopColor="#c89a62" />
        </linearGradient>
      </defs>
      <ellipse cx="110" cy="196" rx="58" ry="10" fill="#000" opacity=".1" />
      <g className="support-pop__bear-body">
        <ellipse cx="110" cy="128" rx="58" ry="54" fill={`url(#${furId})`} />
        <circle cx="110" cy="74" r="40" fill={`url(#${furId})`} />
        <circle cx="82" cy="50" r="13" fill="#d4ab76" />
        <circle cx="138" cy="50" r="13" fill="#d4ab76" />
        <circle cx="96" cy="72" r="10" fill="#fff" />
        <circle cx="124" cy="72" r="10" fill="#fff" />
        <circle cx="98" cy="74" r="5" fill="#171717" />
        <circle cx="122" cy="74" r="5" fill="#171717" />
        <ellipse cx="110" cy="86" rx="10" ry="7" fill="#38261a" />
        <path d="M104 90c5 3 13 3 18 0" fill="none" stroke="#5f3f2d" strokeWidth="2" strokeLinecap="round" />
        <g className="support-pop__bear-arm support-pop__bear-arm--left">
          <ellipse cx="50" cy="112" rx="16" ry="11" fill="#d4ab76" transform="rotate(-28 50 112)" />
        </g>
        <g className="support-pop__bear-arm support-pop__bear-arm--right">
          <ellipse cx="170" cy="112" rx="16" ry="11" fill="#d4ab76" transform="rotate(28 170 112)" />
          <g className="support-pop__coin-jar">
            <rect x="158" y="118" width="26" height="30" rx="6" fill="#f4f4f5" stroke="#b0b0b8" strokeWidth="1.2" />
            <text x="171" y="138" textAnchor="middle" fontSize="14" fontWeight="800" fill="#111">
              $
            </text>
          </g>
        </g>
      </g>
      <text className="support-pop__bear-spark" x="176" y="42" fontSize="15">
        💸
      </text>
    </svg>
  );
}

export function SupportUsButton({ className = '', variant = 'header', onOpen }: SupportUsButtonProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const furId = useId().replace(/:/g, '');

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const show = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      onOpen?.();
      setOpen(true);
    },
    [onOpen]
  );

  const close = useCallback(() => setOpen(false), []);

  const trigger =
    variant === 'nav' ? (
      <button type="button" className={`support-us-btn support-us-btn--nav ${className}`.trim()} onClick={show}>
        Fund us 💸
      </button>
    ) : (
      <button
        type="button"
        className={`button button--dark site-header__support support-us-btn ${className}`.trim()}
        onClick={show}
      >
        <span className="support-us-btn__spark" aria-hidden="true" />
        Fund us <span className="support-us-btn__heart" aria-hidden="true">💸</span>
      </button>
    );

  const dialog =
    open && mounted
      ? createPortal(
          <div className="support-pop" onClick={close} role="presentation">
            <div
              className="support-pop__card"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="support-pop__close" onClick={close} aria-label="Close">
                ×
              </button>

              <div className="support-pop__slide">
                <h2 id={titleId} className="support-pop__fund-title">
                  Fund us
                </h2>

                <div className="support-pop__bear-stage" aria-hidden="true">
                  <FundDanceBear furId={`fur-${furId}`} />
                </div>

                <p className="support-pop__lede">We need funding to grow outlets, ship comparisons, and stay independent.</p>
              </div>

              <LinkedActions onNavigate={close} />
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {trigger}
      {dialog}
    </>
  );
}

function LinkedActions({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="support-pop__actions">
      <Link className="button button--dark support-pop__cta" href="/support" onClick={onNavigate}>
        Support now <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
