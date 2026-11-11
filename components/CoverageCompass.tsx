'use client';

import type { CSSProperties } from 'react';

const CIRCUMFERENCE = 113.1;

export function CoverageCompass({ bias, label = 'Source distribution on this story' }: { bias: { left: number; center: number; right: number }; label?: string }) {
  const leftLength = (bias.left / 100) * CIRCUMFERENCE;
  const centerLength = (bias.center / 100) * CIRCUMFERENCE;
  const rightLength = (bias.right / 100) * CIRCUMFERENCE;
  const leftOffset = 0;
  const centerOffset = -leftLength;
  const rightOffset = -(leftLength + centerLength);
  const needleAngle = (bias.right - bias.left) * 0.55;
  const needleStyle = { transform: `rotate(${needleAngle}deg)` } as CSSProperties;

  return <div className="coverage-compass" title={`${label}: Left ${bias.left}%, Center ${bias.center}%, Right ${bias.right}%`} aria-label={`${label}: Left ${bias.left} percent, Center ${bias.center} percent, Right ${bias.right} percent`} role="img">
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="18" className="compass__base" />
      <circle cx="24" cy="24" r="18" className="compass__arc compass__arc--left" strokeDasharray={`${leftLength} ${CIRCUMFERENCE - leftLength}`} strokeDashoffset={leftOffset} />
      <circle cx="24" cy="24" r="18" className="compass__arc compass__arc--center" strokeDasharray={`${centerLength} ${CIRCUMFERENCE - centerLength}`} strokeDashoffset={centerOffset} />
      <circle cx="24" cy="24" r="18" className="compass__arc compass__arc--right" strokeDasharray={`${rightLength} ${CIRCUMFERENCE - rightLength}`} strokeDashoffset={rightOffset} />
      <g className="compass__needle" style={needleStyle}>
        <path d="M24 8 27.2 24 24 22 20.8 24 24 8Z" className="compass__needle--blue" />
        <path d="M24 40 20.8 24 24 26 27.2 24 24 40Z" className="compass__needle--red" />
      </g>
      <circle cx="24" cy="24" r="3.2" className="compass__hub" />
    </svg>
    <span className="sr-only">{label}: L {bias.left}%, C {bias.center}%, R {bias.right}%</span>
  </div>;
}
