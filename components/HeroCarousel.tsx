'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Story } from '@/lib/types';
import type { WireArticle } from '@/lib/rss';
import { StoryCoverage } from './StoryCoverage';
import { NewsImage } from './NewsImage';
import { OutletChip } from './OutletChip';

const AUTO_ADVANCE_MS = 6500;

type HeroSlide = {
  key: string;
  headline: string;
  summary: string;
  article_url: string;
  image_url: string;
  image_credit: string;
  image_keywords: string;
  posted: string;
  story?: Story;
};

function wrapIndex(next: number, total: number) {
  if (total <= 0) return 0;
  return ((next % total) + total) % total;
}

function storyToSlide(story: Story): HeroSlide {
  return {
    key: `story-${story.id}`,
    headline: story.headline,
    summary: story.summary,
    article_url: story.article_url,
    image_url: story.image_url,
    image_credit: story.image_credit,
    image_keywords: story.image_keywords,
    posted: story.posted,
    story
  };
}

function wireToSlide(article: WireArticle, index: number): HeroSlide {
  return {
    key: `wire-${index}-${article.article_url}`,
    headline: article.headline,
    summary: article.summary || 'Read the original report for the full story.',
    article_url: article.article_url,
    image_url: article.image_url || '',
    image_credit: article.source || 'Wire',
    image_keywords: article.headline.split(' ').slice(0, 4).join(' '),
    posted: article.published || 'Just now'
  };
}

function buildSlides(stories: Story[], wire: WireArticle[]): HeroSlide[] {
  const byUrl = new Map<string, HeroSlide>();

  const priority = stories.filter((s) => s.trending).sort((a, b) => b.id - a.id);
  for (const story of priority) {
    byUrl.set(story.article_url, storyToSlide(story));
  }

  for (const [index, article] of wire.entries()) {
    if (byUrl.has(article.article_url)) continue;
    byUrl.set(article.article_url, wireToSlide(article, index));
  }

  const list = [...byUrl.values()];
  const hegseth = list.find((slide) => /hegseth|impeach|trump/i.test(slide.headline));
  if (hegseth) {
    return [hegseth, ...list.filter((slide) => slide.key !== hegseth.key)].slice(0, 5);
  }
  return list.slice(0, 5);
}

export function HeroCarousel({ stories }: { stories: Story[] }) {
  const seedSlides = useMemo(() => buildSlides(stories, []), [stories]);
  const [slides, setSlides] = useState<HeroSlide[]>(seedSlides);
  const slideCount = slides.length;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/news')
      .then((response) => response.json())
      .then((payload: { articles?: WireArticle[] }) => {
        if (cancelled || !payload.articles?.length) return;
        setSlides(buildSlides(stories, payload.articles));
      })
      .catch(() => {
        /* keep editorial seed */
      });
    return () => {
      cancelled = true;
    };
  }, [stories]);

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
    <div className="hero-carousel hero-carousel--single" aria-roledescription="carousel" aria-label="Top story">
      <span className="hero-carousel__label eyebrow">Top story · live wire</span>
      <div className="hero-carousel__feature">
        <div className="hero-carousel__stage" aria-live="polite">
          {slides.map((slide, slideIndex) => {
            const isActive = slideIndex === index;
            return (
              <div
                key={slide.key}
                className={`hero-carousel__slide ${isActive ? 'is-active' : ''}`}
                aria-hidden={!isActive}
              >
                <div className="hero-carousel__frame">
                  <a
                    href={slide.article_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-carousel__hit"
                    tabIndex={isActive ? 0 : -1}
                    aria-label={`Read on publisher site: ${slide.headline}`}
                  >
                    <NewsImage
                      src={slide.image_url}
                      alt=""
                      credit={slide.image_credit}
                      keywords={slide.image_keywords}
                      fallbackLetter={slide.image_credit.slice(0, 1) || 'N'}
                      className="hero-carousel__image"
                    />
                    <span className="hero-carousel__shade" aria-hidden="true" />
                    <span className="hero-carousel__float-meta">
                      <span className="hero-carousel__read-pill">Read on publisher ↗</span>
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hero-carousel__caption-wrap" key={`caption-${active.key}`}>
          <div className="hero-carousel__caption">
            <span className="hero-carousel__time">{active.posted}</span>
            <h3>
              <a href={active.article_url} target="_blank" rel="noopener noreferrer">
                {active.headline}
              </a>
            </h3>
            <p className="hero-carousel__lede">{active.summary}</p>
            {active.story ? (
              <>
                <StoryCoverage story={active.story} compact showCompass />
                <div className="chip-row hero-carousel__chips">
                  {active.story.outlets.slice(0, 3).map((outlet) => (
                    <OutletChip key={outlet.name} name={outlet.name} lean={outlet.lean} />
                  ))}
                </div>
                <Link className="hero-carousel__compare" href={`/story/${active.story.id}`}>
                  Compare coverage on Perspectra →
                </Link>
              </>
            ) : (
              <p className="hero-carousel__source-line">
                Source: <strong>{active.image_credit}</strong>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="hero-carousel__footer">
        <div className="hero-carousel__index" aria-live="polite">
          <strong>{String(index + 1).padStart(2, '0')}</strong>
          <span>/ {String(slideCount).padStart(2, '0')}</span>
        </div>
        <div className="hero-carousel__controls">
          <div className="hero-carousel__dots" role="tablist" aria-label="Choose top story">
            {slides.map((slide, dotIndex) => (
              <button
                key={slide.key}
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
