import { heroResearchFacts, type HeroResearchFact } from '@/lib/hero-stats';

function FactIcon({ kind }: { kind: HeroResearchFact['icon'] }) {
  if (kind === 'trust') {
    return (
      <svg className="hero-facts__icon" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3.5 19 6.5v5.4c0 4.2-2.9 7.4-7 9.1-4.1-1.7-7-4.9-7-9.1V6.5L12 3.5Z" />
        <path d="m9.2 12.1 2.1 2.1 4.3-4.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === 'misinfo') {
    return (
      <svg className="hero-facts__icon" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3.4 20.8 19H3.2L12 3.4Z" strokeLinejoin="round" />
        <path d="M12 9v5" strokeLinecap="round" />
        <circle cx="12" cy="16.8" r=".9" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg className="hero-facts__icon" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 6.5h14v11H5z" strokeLinejoin="round" />
      <path d="M8 6.5V5h8v1.5M8 10h8M8 13.5h5" strokeLinecap="round" />
      <path d="M7 3.5h10" strokeLinecap="round" />
    </svg>
  );
}

export function HeroFactStrip() {
  const { kicker, items, sourceHref, sourceLabel, sourceNote } = heroResearchFacts;

  return (
    <div className="hero-facts" aria-labelledby="hero-facts-kicker">
      <p id="hero-facts-kicker" className="hero-facts__kicker">
        {kicker}
      </p>
      <ul className="hero-facts__panel">
        {items.map((fact) => (
          <li key={fact.id} className="hero-facts__item">
            <FactIcon kind={fact.icon} />
            <div className="hero-facts__copy">
              <p className="hero-facts__stat">
                <span className="hero-facts__value">{fact.value}%</span> {fact.line}.
              </p>
              <p className="hero-facts__prior">{fact.priorLabel}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="hero-facts__cite">
        <a href={sourceHref} target="_blank" rel="noopener noreferrer">
          {sourceLabel} ↗
        </a>
        <span className="hero-facts__cite-note">{sourceNote}</span>
      </p>
    </div>
  );
}
