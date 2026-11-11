'use client';

import { useEffect, useMemo, useState } from 'react';
import { stories } from '@/lib/data';
import { pickHomeStories } from '@/lib/trending';
import type { WireArticle } from '@/lib/rss';

type TickerItem = {
  headline: string;
  article_url: string;
};

function seedFromStories(): TickerItem[] {
  return pickHomeStories(stories, 10).map((story) => ({
    headline: story.headline,
    article_url: story.article_url
  }));
}

function normalizeArticles(raw: WireArticle[]): TickerItem[] {
  return raw
    .filter((row) => row.headline && row.article_url)
    .slice(0, 14)
    .map((row) => ({
      headline: row.headline,
      article_url: row.article_url
    }));
}

export function NewsTicker() {
  const [items, setItems] = useState<TickerItem[]>(seedFromStories);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/news')
      .then((response) => response.json())
      .then((payload: { articles?: WireArticle[] }) => {
        if (cancelled || !payload.articles?.length) return;
        setItems(normalizeArticles(payload.articles));
      })
      .catch(() => {
        /* keep editorial seed */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const loop = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="news-ticker" role="region" aria-label="Recent headlines">
      <div className="news-ticker__rail" aria-hidden="true" />
      <div className="news-ticker__badge">
        <span className="news-ticker__live" aria-hidden="true" />
        <span>Recent</span>
      </div>
      <div className="news-ticker__viewport">
        <div className="news-ticker__track">
          {loop.map((item, index) => (
            <span className="news-ticker__item" key={`${item.article_url}-${index}`}>
              <a href={item.article_url} target="_blank" rel="noopener noreferrer" className="news-ticker__link">
                <span className="news-ticker__headline">{item.headline}</span>
              </a>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
