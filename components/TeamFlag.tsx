import type { TeamCountryCode } from '@/lib/types';

type TeamFlagProps = {
  code: TeamCountryCode;
  title: string;
  className?: string;
};

/** Simple SVG flags for team cards (readable at small size). */
export function TeamFlag({ code, title, className = '' }: TeamFlagProps) {
  return (
    <svg
      className={`team-flag ${className}`.trim()}
      viewBox="0 0 48 32"
      role="img"
      aria-label={title}
    >
      {code === 'CZ' && (
        <>
          <rect width="48" height="16" fill="#ffffff" />
          <rect y="16" width="48" height="16" fill="#d7141a" />
          <path d="M0 0 L0 32 L24 16 Z" fill="#11457e" />
        </>
      )}
      {code === 'IT' && (
        <>
          <rect width="16" height="32" fill="#009246" />
          <rect x="16" width="16" height="32" fill="#ffffff" />
          <rect x="32" width="16" height="32" fill="#ce2b37" />
        </>
      )}
      {code === 'TR' && (
        <>
          <rect width="48" height="32" fill="#e30a17" />
          <circle cx="19" cy="16" r="7" fill="#ffffff" />
          <circle cx="21" cy="16" r="5.5" fill="#e30a17" />
          <path fill="#ffffff" d="M27 16 L33 13.2 V18.8 Z M33 16 L39 13.2 V18.8 Z" />
        </>
      )}
    </svg>
  );
}
