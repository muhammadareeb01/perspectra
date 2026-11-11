import Image from 'next/image';
import brandLogoImage from '@/public/brand-logo.png';

type TintMarkProps = {
  size?: number;
  className?: string;
  variant?: 'icon' | 'lockup';
  staticColors?: boolean;
};

/** Intrinsic size of `public/brand-logo.png` (trimmed transparent padding). */
const LOGO_WIDTH = 324;
const LOGO_HEIGHT = 229;

export function TintMark({ size = 40, className = '', variant = 'icon' }: TintMarkProps) {
  const bump = variant === 'lockup' ? 1.06 : 1;
  const displayHeight = Math.round(size * bump);
  const displayWidth = Math.round((LOGO_WIDTH / LOGO_HEIGHT) * displayHeight);

  return (
    <Image
      src={brandLogoImage}
      alt=""
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      className={`tint-mark tint-mark--asset ${className}`.trim()}
      style={{ width: displayWidth, height: displayHeight }}
      priority
      sizes={`${displayWidth}px`}
    />
  );
}
