import type { Lean } from '@/lib/types';

export function OutletChip({ name, lean }: { name: string; lean: Lean }) {
  return <span className="outlet-chip"><span className={`lean-dot lean-dot--${lean}`} aria-hidden="true" />{name}</span>;
}
