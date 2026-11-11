'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Story } from '@/lib/types';
import { BiasBar } from './BiasBar';
import { CoverageCompass } from './CoverageCompass';
import { NewsImage } from './NewsImage';
import { OutletChip } from './OutletChip';

const AUTO_ADVANCE_MS = 6000;

function wrapIndex(next: number, total: number) {
  if (total <= 0) return 0;
  return ((next % total) + total) % total;
}

export function HeroCarousel({ stories }: { stories: Story[] }) {
  const slides = useMemo(() => stories.slice(0, 5), [stories]);
  const slideCount = slides.length;
  const [index, setIndex] = useState(0);

  const goTo = (next: number) => {
    setIndex(wrapIndex(next, slideCount));
  };

  useEffect(() => {
    setIndex((current) => wrapIndex(current, slideCount));
  }, [slideCount]);

  useEffect(() => {
    if (slideCount < 2) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => wrapIndex(current + 1, slideCount));
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [slideCount]);

  if (!slideCount) return null;
  const active = slides[index];

  return (
    <div className="hero-carousel hero-carousel--single" aria-roledescription="carousel" aria-label="Featured story">
      <div className="hero-carousel__top">
        <span className="kicker">Today&apos;s desk</span>
        <div className="hero-carousel__index" aria-live="polite">
          <strong>{String(index + 1).padStart(2, '0')}</strong>
          <span>/ {String(slideCount).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="hero-carousel__progress" key={`progress-${index}`}>
        <span style={{ animationDuration: `${AUTO_ADVANCE_MS}ms` }} />
      </div>

      <article className="hero-carousel__feature" key={active.id}>
        <a href={active.article_url} target="_blank" rel="noopener noreferrer" className="hero-carousel__frame">
          <NewsImage
            src={active.image_url}
            alt=""
            credit={active.image_credit}
            keywords={active.image_keywords}
            fallbackLetter={active.outlets[0]?.name.slice(0, 1) ?? 'T'}
          />
          <span className="hero-carousel__shade" aria-hidden="true" />
          <span className="hero-carousel__float-meta">
            <CoverageCompass bias={active.bias} label={`${active.headline} coverage`} />
            <Link
              className="hero-carousel__explore"
              href={`/story/${active.id}`}
              onClick={(event) => event.stopPropagation()}
            >
              Open comparison
            </Link>
          </span>
        </a>

        <div className="hero-carousel__caption">
          <span className="hero-carousel__time">{active.posted}</span>
          <h3>
            <Link href={`/story/${active.id}`}>{active.headline}</Link>
          </h3>
          <BiasBar bias={active.bias} compact />
          <div className="chip-row hero-carousel__chips">
            {active.outlets.slice(0, 3).map((outlet) => (
              <OutletChip key={outlet.name} name={outlet.name} lean={outlet.lean} />
            ))}
          </div>
        </div>
      </article>

      <div className="hero-carousel__footer">
        <div className="hero-carousel__controls">
          <div className="hero-carousel__dots" role="tablist" aria-label="Choose featured story">
            {slides.map((story, dotIndex) => (
              <button
                key={story.id}
                type="button"
                role="tab"
                aria-selected={dotIndex === index}
                aria-label={`Show story ${dotIndex + 1}`}
                className={`hero-carousel__dot ${dotIndex === index ? 'is-active' : ''}`}
                onClick={() => goTo(dotIndex)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
