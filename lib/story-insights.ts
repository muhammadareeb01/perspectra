import { dominantLean, getOutletFraming, getStoryCoverage } from './coverage';
import { leanLabel } from './data';
import type { Lean, Story } from './types';
import type { CoverageMix } from './coverage';

export type LoudestOutlet = { name: string; peak: ReturnType<typeof peakFraming> };

export type StoryInsightsResult = {
  mix: CoverageMix;
  lead: Lean;
  leadLabel: string;
  highCount: number;
  mixedCount: number;
  spread: number;
  loudest: LoudestOutlet | null;
};

export function peakFraming(framing: { left: number; center: number; right: number }): { lean: Lean; value: number } {
  const ranked: [Lean, number][] = [
    ['left', framing.left],
    ['center', framing.center],
    ['right', framing.right]
  ];
  ranked.sort((a, b) => b[1] - a[1]);
  return { lean: ranked[0][0], value: ranked[0][1] };
}

export function storyInsights(story: Story): StoryInsightsResult {
  const mix = getStoryCoverage(story);
  const lead = dominantLean(mix);
  const entries = story.reliability ? Object.entries(story.reliability) : [];
  const highCount = entries.filter(([, rating]) => rating.toLowerCase() === 'high').length;
  const mixedCount = entries.filter(([, rating]) => rating.toLowerCase() === 'mixed').length;
  const spread = Math.max(mix.left, mix.center, mix.right) - Math.min(mix.left, mix.center, mix.right);

  let loudest: LoudestOutlet | null = null;
  story.outlets.forEach((outlet, index) => {
    const peak = peakFraming(getOutletFraming(outlet, index));
    if (!loudest || peak.value > loudest.peak.value) {
      loudest = { name: outlet.name, peak };
    }
  });

  return {
    mix,
    lead,
    leadLabel: leanLabel(lead),
    highCount,
    mixedCount,
    spread,
    loudest
  };
}
