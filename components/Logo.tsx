import Link from 'next/link';
import { brand } from '@/lib/brand';
import { TintMark } from './TintMark';

type LogoProps = {
  /** Mark height in px; header default stays compact. */
  size?: number;
  className?: string;
  /** Hide wordmark on tight layouts (e.g. footer mark only). */
  markOnly?: boolean;
};

export function Logo({ size = 50, className = '', markOnly = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`logo ${markOnly ? 'logo--mark-only' : 'logo--named'} ${className}`.trim()}
      aria-label={`${brand.name} home`}
    >
      <TintMark size={size} variant="icon" className="logo__mark" />
      {!markOnly ? <span className="logo__name">{brand.name}</span> : null}
    </Link>
  );
}
