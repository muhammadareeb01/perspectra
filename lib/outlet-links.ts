import type { OutletMention } from './types';

/** Desk home pages when a story fixture has no per-outlet article URL yet. */
const OUTLET_HOME: Record<string, string> = {
  AP: 'https://apnews.com/',
  BBC: 'https://www.bbc.com/news',
  CNN: 'https://www.cnn.com/',
  'Fox News': 'https://www.foxnews.com/',
  Reuters: 'https://www.reuters.com/',
  'The Guardian': 'https://www.theguardian.com/international',
  'NY Post': 'https://nypost.com/',
  'Wall Street Journal': 'https://www.wsj.com/',
  'Al Jazeera': 'https://www.aljazeera.com/',
  RT: 'https://www.rt.com/'
};

export function getOutletArticleUrl(outlet: OutletMention): string | null {
  const candidate = outlet.article_url?.trim();
  if (candidate) {
    try {
      const target = new URL(candidate);
      if (['http:', 'https:'].includes(target.protocol)) return candidate;
    } catch {
      /* fall through */
    }
  }
  return OUTLET_HOME[outlet.name] ?? null;
}
