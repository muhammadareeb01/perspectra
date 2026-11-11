'use client';

import { useCallback, useState, type MouseEvent } from 'react';
import { SupportFundModal } from './SupportFundModal';

type SupportUsButtonProps = {
  className?: string;
  variant?: 'header' | 'nav';
  onOpen?: () => void;
};

export function SupportUsButton({ className = '', variant = 'header', onOpen }: SupportUsButtonProps) {
  const [open, setOpen] = useState(false);

  const show = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      onOpen?.();
      setOpen(true);
    },
    [onOpen]
  );

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

  return (
    <>
      {trigger}
      <SupportFundModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
