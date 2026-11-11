import type { Story } from './types';

const RECENCY_RANK: Record<string, number> = {
  'just now': 0,
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
