'use client';

import { useState } from 'react';

export function BiasBar({
  bias,
  compact = false,
  storyCoverage = false,
  headlineFraming = false,
  ariaDescription
}: {
  bias: { left: number; center: number; right: number };
  compact?: boolean;
  /** Story cluster aggregate (average headline framing). */
  storyCoverage?: boolean;
  /** Single outlet headline framing bar. */
  headlineFraming?: boolean;
  ariaDescription?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const defaultLabel = storyCoverage
    ? `Story compass: average headline framing Left ${bias.left}%, Center ${bias.center}%, Right ${bias.right}%`
    : headlineFraming
      ? `This headline frames Left ${bias.left}%, Center ${bias.center}%, Right ${bias.right}%`
      : `Left ${bias.left}%, Center ${bias.center}%, Right ${bias.right}%`;

  return (
    <div
      className={`bias ${compact ? 'bias--compact' : ''} ${storyCoverage ? 'bias--story' : ''} ${headlineFraming ? 'bias--headline' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={ariaDescription ?? defaultLabel}
    >
      <div className={`bias__track ${hovered ? 'is-hovered' : ''}`}>
        <span className="bias__fill bias__fill--left" style={{ width: `${bias.left}%` }} />
        <span className="bias__fill bias__fill--center" style={{ width: `${bias.center}%` }} />
        <span className="bias__fill bias__fill--right" style={{ width: `${bias.right}%` }} />
      </div>
      <div className="bias__labels">
        {storyCoverage && !compact ? <span className="bias__legend">Bias bar</span> : null}
        <span>L {bias.left}%</span>
        <span>C {bias.center}%</span>
        <span>R {bias.right}%</span>
      </div>
    </div>
  );
}
