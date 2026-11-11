'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Legacy URL — funding list lives on /support for now. */
export default function FundingRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/support');
  }, [router]);

  return (
    <section className="page-section">
      <div className="shell">
        <p className="muted">Taking you to Support…</p>
      </div>
    </section>
  );
}
