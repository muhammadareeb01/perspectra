import storiesJson from '@/data/stories.json';
import outletsJson from '@/data/outlets.json';
import teamJson from '@/data/team.json';
import spicyJson from '@/data/spicy.json';
import type { Outlet, SpicyTake, Story, TeamMember } from './types';

export const stories = storiesJson as unknown as Story[];
export const outlets = outletsJson as Outlet[];
export const team = teamJson as TeamMember[];
export const spicy = spicyJson as SpicyTake[];

export function getStory(id: string | number) {
  return stories.find((story) => story.id === Number(id));
}

export function leanLabel(lean: string) {
  return lean === 'left' ? 'Left' : lean === 'right' ? 'Right' : 'Center';
}
