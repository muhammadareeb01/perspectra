'use client';

import { useEffect, useState } from 'react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import type { WireArticle } from '@/lib/rss';

type LivePayload = {
  source: string;
  articles: WireArticle[];
  fetched_at?: string;
  warning?: string;
};

export function LiveWireSection() {
  const [payload, setPayload] = useState<LivePayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/news')
      .then((response) => response.json())
      .then((data: LivePayload) => {
        if (!cancelled) setPayload(data);
      })
      .catch(() => {
        if (!cancelled) setPayload({ source: 'error', articles: [] });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const articles = payload?.articles?.slice(0, 6) ?? [];
  const isLive = payload && !['local', 'local-fallback', 'error'].includes(payload.source) && articles.length > 0;
  const isWire = payload?.source === 'rss-wire';

  return (
    <section className="page-section live-wire">
      <div className="shell">
        <SectionHeading
          eyebrow="00 / From the wire"
          title="Headlines pulled from real publishers."
          intro="These links go straight to original reporting. Tint does not republish articles—compare our spectrum view, then read the source."
          action={
            <span className={`live-pill ${isLive || isWire ? 'live-pill--on' : ''}`}>
              <span className="live-pill__dot" aria-hidden="true" />
              {loading ? 'Syncing…' : isLive || isWire ? `Live · ${payload?.source}` : 'Editorial fixtures'}
            </span>
          }
        />

        {loading ? (
          <div className="live-wire__skeleton" aria-busy="true">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="live-wire__skeleton-card" />
            ))}
          </div>
        ) : articles.length ? (
          <div className="live-wire__grid">
            {articles.map((article, index) => (
              <Reveal key={`${article.article_url}-${index}`} delay={index * 50}>
                <article className="live-wire-card">
                  <div className="live-wire-card__meta">
                    <span>{article.source}</span>
                    {article.published ? <span>{formatDate(article.published)}</span> : null}
                  </div>
                  <h3>
                    <a href={article.article_url} target="_blank" rel="noopener noreferrer">
                      {article.headline}
                    </a>
                  </h3>
                  <p>{article.summary}</p>
                  <a className="text-link" href={article.article_url} target="_blank" rel="noopener noreferrer">
                    Read on {article.source} <span aria-hidden="true">↗</span>
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="muted">Live wire is momentarily unavailable. The comparison grid below still uses our editorial fixtures.</p>
        )}

        {payload?.warning ? <p className="live-wire__note muted">{payload.warning}</p> : null}
      </div>
    </section>
  );
}

function formatDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
