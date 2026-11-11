import type { Story } from './types';

const RECENCY_RANK: Record<string, number> = {
  'just now': 0,
  '30 minutes ago': 0.5,
  '1 hour ago': 1,
  '3 hours ago': 3.5,
  '2 hours ago': 2,
  '4 hours ago': 3,
  '6 hours ago': 4,
  yesterday: 5,
  '2 days ago': 6,
  '3 days ago': 7,
  '4 days ago': 8
};

export function getTrendingStories(stories: Story[], limit = 4): Story[] {
  const flagged = stories.filter((story) => story.trending);
  const pool = flagged.length ? flagged : [...stories];
  return pool
    .sort((a, b) => (RECENCY_RANK[a.posted] ?? 99) - (RECENCY_RANK[b.posted] ?? 99))
    .slice(0, limit);
}

/** Home clusters: trending first (newest), then fill from the rest. */
export function pickHomeStories(stories: Story[], limit: number): Story[] {
  const trending = getTrendingStories(stories, limit);
  if (trending.length >= limit) return trending;
  const seen = new Set(trending.map((story) => story.id));
  const fill = stories.filter((story) => !seen.has(story.id));
  return [...trending, ...fill].slice(0, limit);
}
