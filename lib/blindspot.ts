import type { Story } from './types';
import { dominantLean, getStoryCoverage, missingCoverageSides } from './coverage';
import { leanLabel } from './data';

/**
 * Higher score = more lopsided coverage (Ground News–style blindspot signal).
 * Uses missing spectrum sides and spread across L/C/R publisher counts.
 */
export function coverageSkewScore(story: Story): number {
  const mix = getStoryCoverage(story);
  const missing = missingCoverageSides(story.outlets).length;
  const spread = Math.max(mix.left, mix.center, mix.right) - Math.min(mix.left, mix.center, mix.right);
  return missing * 18 + spread;
}

export function pickBlindspotStories(stories: Story[], limit = 3): Story[] {
  return [...stories]
    .map((story) => ({ story, score: coverageSkewScore(story) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.story);
}

export function blindspotEyebrow(story: Story): string {
  const missing = missingCoverageSides(story.outlets);
  if (missing.length) {
    return `Missing ${missing.map((lean) => leanLabel(lean).toLowerCase()).join(' & ')} sources`;
  }
  const lead = dominantLean(getStoryCoverage(story));
  return `Mostly ${leanLabel(lead).toLowerCase()}-rated sources reporting`;
}
