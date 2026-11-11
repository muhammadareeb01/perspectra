import { createAvatar } from '@dicebear/core';
import { adventurer, lorelei, micah } from '@dicebear/collection';
import type { TeamAvatarId } from '@/lib/types';

const FAIR_ADVENTURER_SKIN = ['fff0e6', 'f8e4d8', 'f2d3b1'];
const FAIR_LORELEI_SKIN = ['fff8f2', 'ffefe6', 'ffe8dc'];

const BOY_HAIR_COLOR = ['2c1810', '3d2b1f', '1a1410'];

type TeamDicebearEntry = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Record<string, any>;
};

/** Bump when art changes so dev cache refreshes. */
const AVATAR_VERSION = 'v6';

const TEAM_DICEBEAR: Record<TeamAvatarId, TeamDicebearEntry> = {
  eli: {
    style: lorelei,
    options: {
      seed: 'Tint-Eli-Cute-Fair',
      backgroundColor: ['eef2f8', 'e8f0ff'],
      skinColor: FAIR_LORELEI_SKIN,
      hairColor: ['6b4423', '5c4033', '4a3228'],
      hair: ['variant30', 'variant31', 'variant32'],
      mouth: ['happy04', 'happy05', 'happy06'],
      eyes: ['variant06', 'variant07', 'variant08'],
      beardProbability: 0,
      frecklesProbability: 20,
      hairAccessories: ['flowers'],
      hairAccessoriesProbability: 40
    }
  },
  hassan: {
    style: adventurer,
    options: {
      seed: 'Tint-Amir-Fair',
      backgroundColor: ['f2f4f8', 'e6eaf0'],
      skinColor: FAIR_ADVENTURER_SKIN,
      hairColor: BOY_HAIR_COLOR,
      hair: ['short06', 'short07', 'short08'],
      eyes: ['variant06', 'variant07'],
      eyebrows: ['variant05', 'variant06'],
      mouth: ['variant26', 'variant27'],
      earringsProbability: 0,
      featuresProbability: 0,
      glassesProbability: 0
    }
  },
  areeb: {
    style: micah,
    options: {
      seed: 'Tint-Areeb-Developer',
      backgroundColor: ['eef2f8', 'd6e4ff'],
      baseColor: ['f9c9b6', 'ffeba4'],
      hair: ['fonze', 'full'],
      hairProbability: 100,
      glasses: ['square'],
      glassesProbability: 100,
      eyes: ['round', 'eyes'],
      eyebrows: ['up'],
      mouth: ['smile', 'smirk'],
      shirt: ['collared'],
      earringsProbability: 0,
      facialHairProbability: 0
    }
  },
  yash: {
    style: adventurer,
    options: {
      seed: 'Tint-Yash-Pitch-v6',
      backgroundColor: ['f0f7f2', 'e2efe6'],
      skinColor: FAIR_ADVENTURER_SKIN,
      hairColor: BOY_HAIR_COLOR,
      hair: ['short03', 'short04', 'short05'],
      eyes: ['variant05', 'variant06'],
      eyebrows: ['variant04', 'variant05'],
      mouth: ['variant25', 'variant26'],
      earringsProbability: 0,
      beardProbability: 0,
      glassesProbability: 0,
      featuresProbability: 0
    }
  },
  amir: {
    style: adventurer,
    options: {
      seed: 'Tint-Amir-Simple-v6',
      backgroundColor: ['f4f6fa', 'e8ecf4'],
      skinColor: FAIR_ADVENTURER_SKIN,
      hairColor: BOY_HAIR_COLOR,
      hair: ['short06', 'short07', 'short08'],
      eyes: ['variant06', 'variant07'],
      eyebrows: ['variant05', 'variant06'],
      mouth: ['variant26', 'variant27'],
      earringsProbability: 0,
      featuresProbability: 0,
      glassesProbability: 0,
      beardProbability: 0
    }
  },
  emre: {
    style: adventurer,
    options: {
      seed: 'Tint-Emre-as-Yash-v6',
      backgroundColor: ['f0f7f2', 'e2efe6'],
      skinColor: FAIR_ADVENTURER_SKIN,
      hairColor: BOY_HAIR_COLOR,
      hair: ['short08', 'short09', 'short10'],
      eyes: ['variant07', 'variant08'],
      eyebrows: ['variant05', 'variant06'],
      mouth: ['variant27', 'variant28'],
      earringsProbability: 0,
      beardProbability: 0,
      glassesProbability: 0,
      featuresProbability: 0
    }
  }
};

const svgCache = new Map<string, string>();

export function getTeamAvatarSvg(id: TeamAvatarId): string {
  const cacheKey = `${AVATAR_VERSION}:${id}`;
  const cached = svgCache.get(cacheKey);
  if (cached) return cached;

  const entry = TEAM_DICEBEAR[id];
  const svg = createAvatar(entry.style, {
    radius: 8,
    size: 128,
    ...entry.options
  }).toString();

  svgCache.set(cacheKey, svg);
  return svg;
}
