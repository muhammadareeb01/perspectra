'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { newsAvoidanceTrend } from '@/lib/hero-stats';

const GRID_STEPS = [50, 37.5, 25, 12.5, 0] as const;

type YearPoint = (typeof newsAvoidanceTrend.years)[number];

export function AvoidanceViz() {
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
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { years, chartMax, delta } = newsAvoidanceTrend;
  const [start, end] = years;
  const yPos = (value: number) => 100 - (value / chartMax) * 100;

  return (
    <div
      ref={rootRef}
      className={`avoidance-viz ${live ? 'avoidance-viz--live' : ''}`}
      aria-hidden="false"
    >
      <p className="avoidance-viz__kicker">Cross-market survey</p>
      <h3 className="avoidance-viz__chart-title">Sometimes or often avoids news</h3>

      <figure
        className="avoidance-viz__figure"
        role="img"
        aria-label={`Survey respondents avoiding news: ${start.value}% in ${start.year}, ${end.value}% in ${end.year}.`}
      >
        <div className="avoidance-viz__chart">
          <ul className="avoidance-viz__axis" aria-hidden="true">
            {GRID_STEPS.map((step) => (
              <li key={step}>{step}%</li>
            ))}
          </ul>

          <div className="avoidance-viz__plot">
            {GRID_STEPS.map((step) => (
              <span
                key={step}
                className="avoidance-viz__hline"
                style={{ bottom: `${(step / chartMax) * 100}%` }}
              />
            ))}

            <svg
              className="avoidance-viz__slope"
              viewBox="0 0 200 120"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className="avoidance-viz__slope-line"
                d={`M 42 ${yPos(start.value)} L 158 ${yPos(end.value)}`}
                pathLength={1}
              />
            </svg>

            <div className="avoidance-viz__bars">
              {years.map((point: YearPoint, index) => {
                const height = (point.value / chartMax) * 100;
                const tone = index === 0 ? 'past' : 'now';
                return (
                  <div className="avoidance-viz__col" key={point.year}>
                    <span className="avoidance-viz__val">{point.value}%</span>
                    <MotionBar height={height} tone={tone} />
                    <span className="avoidance-viz__year">{point.year}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <figcaption className="avoidance-viz__caption">
          Up {delta.replace('+', '')} points since {start.year}. Same question, heavier headline diet nine years later.
        </figcaption>
      </figure>
    </div>
  );
}

function MotionBar({ height, tone }: { height: number; tone: 'past' | 'now' }) {
  return (
    <div className="avoidance-viz__bar-wrap">
      <span
        className={`avoidance-viz__bar avoidance-viz__bar--${tone}`}
        style={{ '--bar-h': `${height}%` } as CSSProperties}
      />
    </div>
  );
}
