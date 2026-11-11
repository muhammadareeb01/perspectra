'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { ResearchBar } from '@/lib/research-stats';

type EditorialBarVizProps = {
  title: string;
  caption?: string;
  footnote?: string;
  chartMax: number;
  chartSteps: readonly number[];
  bars: ResearchBar[];
  format?: 'percent' | 'index';
  ariaSummary: string;
};

export function EditorialBarViz({
  title,
  caption,
  footnote,
  chartMax,
  chartSteps,
  bars,
  format = 'percent',
  ariaSummary
}: EditorialBarVizProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      setLive(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const formatVal = (value: number) => (format === 'percent' ? `${value}%` : `${value}`);

  return (
    <div ref={rootRef} className={`editorial-bars ${live ? 'editorial-bars--live' : ''}`}>
      <h3 className="editorial-bars__title">{title}</h3>

      <figure className="editorial-bars__figure" role="img" aria-label={ariaSummary}>
        <div className="editorial-bars__chart">
          <ul className="editorial-bars__axis" aria-hidden="true">
            {chartSteps.map((step) => (
              <li key={step}>
                {format === 'percent' ? `${step}%` : step}
              </li>
            ))}
          </ul>

          <div className="editorial-bars__plot">
            {chartSteps.map((step) => (
              <span
                key={step}
                className="editorial-bars__hline"
                style={{ bottom: `${(step / chartMax) * 100}%` }}
              />
            ))}

            <div className="editorial-bars__cols">
              {bars.map((bar, index) => {
                const height = (bar.value / chartMax) * 100;
                const tone = bar.tone === 'accent' ? 'accent' : 'base';
                return (
                  <div className="editorial-bars__col" key={bar.id}>
                    <span
                      className="editorial-bars__val"
                      style={{ transitionDelay: `${0.45 + index * 0.12}s` }}
                    >
                      {formatVal(bar.value)}
                    </span>
                    <div className="editorial-bars__bar-wrap">
                      <span
                        className={`editorial-bars__bar editorial-bars__bar--${tone}`}
                        style={
                          {
                            '--bar-h': `${height}%`,
                            transitionDelay: `${0.12 + index * 0.14}s`
                          } as CSSProperties
                        }
                      />
                    </div>
                    <span className="editorial-bars__label">{bar.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {caption ? <figcaption className="editorial-bars__caption">{caption}</figcaption> : null}
        {footnote ? <p className="editorial-bars__footnote">{footnote}</p> : null}
      </figure>
    </div>
  );
}
