'use client';

import { useState, type ReactNode } from 'react';
import { SupportFundModal } from './SupportFundModal';

type SupportUsLinkProps = {
  className?: string;
  children?: ReactNode;
};

/** Opens the euro support modal — use in footer or inline copy. */
export function SupportUsLink({ className = '', children = 'Support us' }: SupportUsLinkProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={`support-us-link ${className}`.trim()} onClick={() => setOpen(true)}>
        {children}
      </button>
      <SupportFundModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
