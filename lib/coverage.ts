import type { Lean, OutletMention, Story } from './types';

export type CoverageMix = { left: number; center: number; right: number };

/** Per-headline framing for one outlet card (Option B: each article has its own L/C/R bar). */
export function getOutletFraming(outlet: OutletMention, index = 0): CoverageMix {
  if (outlet.framing) {
    return roundMix(outlet.framing);
  }

  const presets: Record<Lean, CoverageMix[]> = {
    left: [
      { left: 76, center: 18, right: 6 },
      { left: 68, center: 24, right: 8 },
      { left: 62, center: 28, right: 10 }
    ],
    center: [
      { left: 24, center: 58, right: 18 },
      { left: 20, center: 62, right: 18 },
      { left: 28, center: 54, right: 18 }
    ],
    right: [
      { left: 8, center: 20, right: 72 },
      { left: 12, center: 18, right: 70 },
      { left: 10, center: 22, right: 68 }
    ]
  };

  const pool = presets[outlet.lean];
  return roundMix(pool[index % pool.length]);
}

/**
 * Story-level compass = **average of each headline’s framing** on this topic.
 * Different from counting publishers; reflects how the room is writing, not only who appeared.
 */
export function getStoryCoverage(story: Pick<Story, 'outlets'>): CoverageMix {
  const rated = story.outlets.filter((outlet) => outlet.rated !== false);
  if (!rated.length) {
    return { left: 0, center: 0, right: 0 };
  }

  const totals = { left: 0, center: 0, right: 0 };
  rated.forEach((outlet, index) => {
    const mix = getOutletFraming(outlet, index);
    totals.left += mix.left;
    totals.center += mix.center;
    totals.right += mix.right;
  });

  return roundMix({
    left: totals.left / rated.length,
    center: totals.center / rated.length,
    right: totals.right / rated.length
  });
}

/** Legacy: who showed up by catalog lean (source count). */
export function getPublisherPresenceMix(story: Pick<Story, 'outlets'>): CoverageMix {
  const rated = story.outlets.filter((outlet) => outlet.rated !== false);
  if (!rated.length) {
    return { left: 0, center: 0, right: 0 };
  }

  let left = 0;
  let center = 0;
  let right = 0;
  for (const outlet of rated) {
    if (outlet.lean === 'left') left += 1;
    else if (outlet.lean === 'right') right += 1;
    else center += 1;
  }

  return roundMix({
    left: (left / rated.length) * 100,
    center: (center / rated.length) * 100,
    right: (right / rated.length) * 100
  });
}

export function countRatedSources(outlets: Pick<OutletMention, 'rated'>[]): number {
  return outlets.filter((outlet) => outlet.rated !== false).length;
}


export function dominantLean(mix: CoverageMix): Lean {
  const ranked: [Lean, number][] = [
    ['left', mix.left],
    ['center', mix.center],
    ['right', mix.right]
  ];
  ranked.sort((a, b) => b[1] - a[1]);
  return ranked[0][0];
}

export function missingCoverageSides(outlets: Pick<OutletMention, 'lean'>[]): Lean[] {
  const present = new Set(outlets.map((o) => o.lean));
  return (['left', 'center', 'right'] as Lean[]).filter((lean) => !present.has(lean));
}

function roundMix(mix: CoverageMix): CoverageMix {
  const keys: Lean[] = ['left', 'center', 'right'];
  const rounded = keys.map((key) => ({ key, value: Math.round(mix[key]) }));
  let delta = 100 - rounded.reduce((sum, entry) => sum + entry.value, 0);
  const order = [...rounded].sort((a, b) => b.value - a.value);
  let i = 0;
  while (delta !== 0 && order.length) {
    const target = order[i % order.length];
    const entry = rounded.find((item) => item.key === target.key);
    if (!entry) break;
    if (delta > 0) {
      entry.value += 1;
      delta -= 1;
    } else if (entry.value > 0) {
      entry.value -= 1;
      delta += 1;
    }
    i += 1;
  }

  return {
    left: rounded.find((e) => e.key === 'left')!.value,
    center: rounded.find((e) => e.key === 'center')!.value,
    right: rounded.find((e) => e.key === 'right')!.value
  };
}
