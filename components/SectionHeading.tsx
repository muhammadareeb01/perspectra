import type { ReactNode } from 'react';

export function SectionHeading({ eyebrow, title, intro, action }: { eyebrow?: string; title: string; intro?: string; action?: ReactNode }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{intro && <p>{intro}</p>}</div>{action && <div className="section-heading__action">{action}</div>}</div>;
}
