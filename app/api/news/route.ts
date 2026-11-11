import { NextResponse } from 'next/server';
import { stories } from '@/lib/data';
import { WIRE_FEEDS, parseRssItems, type WireArticle } from '@/lib/rss';

type ProviderArticle = { title?: string; description?: string; image_url?: string; image?: string; url?: string; source?: { name?: string } };

async function fetchWireHeadlines(): Promise<{ articles: WireArticle[]; feed: string } | null> {
  for (const feed of WIRE_FEEDS) {
    try {
      const response = await fetch(feed.url, {
        next: { revalidate: 300 },
        headers: { Accept: 'application/rss+xml, application/xml, text/xml' }
      });
      if (!response.ok) continue;
      const xml = await response.text();
      const articles = parseRssItems(xml, 12);
      if (articles.length) return { articles, feed: feed.label };
    } catch {
      continue;
    }
  }
  return null;
}

function mapLocalAsWire(): WireArticle[] {
  return stories.slice(0, 8).map((story) => ({
    headline: story.headline,
    summary: story.summary,
    article_url: story.article_url,
    source: story.outlets[0]?.name || 'Perspectra fixture',
    image_url: story.image_url,
    published: story.posted
  }));
}

export async function GET() {
  const key = process.env.NEWS_API_KEY;
  const provider = process.env.NEWS_PROVIDER || 'gnews';

  if (key) {
    try {
      const url = provider === 'newsdata'
        ? `https://newsdata.io/api/1/news?apikey=${encodeURIComponent(key)}&language=en&size=12`
        : `https://gnews.io/api/v4/top-headlines?apikey=${encodeURIComponent(key)}&lang=en&max=12`;
      const response = await fetch(url, { next: { revalidate: 300 } });
      if (!response.ok) throw new Error(`Provider returned ${response.status}`);
      const payload = await response.json();
      const rawArticles: ProviderArticle[] = Array.isArray(payload.articles) ? payload.articles : Array.isArray(payload.results) ? payload.results : [];
      const articles: WireArticle[] = rawArticles
        .map((article) => ({
          headline: article.title?.trim() || '',
          summary: article.description?.trim() || 'Read the original report for the full story.',
          image_url: article.image_url || article.image || '',
          article_url: article.url || '',
          source: article.source?.name || 'Unknown source'
        }))
        .filter((article) => {
          try {
            const target = new URL(article.article_url);
            return Boolean(article.headline) && ['http:', 'https:'].includes(target.protocol);
          } catch {
            return false;
          }
        });
      if (articles.length) {
        return NextResponse.json({
          source: provider,
          articles,
          fetched_at: new Date().toISOString()
        });
      }
    } catch {
      // fall through to RSS and fixtures
    }
  }

  const wire = await fetchWireHeadlines();
  if (wire) {
    return NextResponse.json({
      source: 'rss-wire',
      wire_feed: wire.feed,
      articles: wire.articles,
      fetched_at: new Date().toISOString()
    });
  }

  return NextResponse.json({
    source: 'local-fallback',
    articles: mapLocalAsWire(),
    warning: 'Live wire unreachable; showing editorial fixtures with real publisher links.',
    fetched_at: new Date().toISOString()
  });
}
