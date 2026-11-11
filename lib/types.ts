export type Lean = 'left' | 'center' | 'right';
export type FactCheck = 'true' | 'misleading' | 'false';

export type FramingMix = { left: number; center: number; right: number };

export type OutletMention = {
  name: string;
  lean: Lean;
  headline: string;
  /** Publisher URL for this desk’s coverage (opens on outlet site). */
  article_url?: string;
  /** Optional hero or OG image from that publisher article. */
  image_url?: string;
  /** How this specific headline frames the story (per-article signal). */
  framing?: FramingMix;
  /** When false, excluded from story aggregates. */
  rated?: boolean;
};

export type Story = {
  id: number;
  /** Display label for the event cluster (e.g. "Trump · Trade policy"). */
  topic?: string;
  /** Surfaces in the Trending section when true. */
  trending?: boolean;
  headline: string;
  summary: string;
  image_url: string;
  image_credit: string;
  image_keywords: string;
  article_url: string;
  outlets: OutletMention[];
  /** Legacy fixture field; UI derives coverage from `outlets` via `getStoryCoverage`. */
  bias: { left: number; center: number; right: number };
  posted: string;
  reliability?: Record<string, string>;
};

export type Outlet = {
  name: string;
  lean: Lean;
  factual: 'High' | 'Mixed' | 'Low';
  country: string;
  note: string;
};

export type TeamAvatarId = 'eli' | 'hassan' | 'areeb' | 'yash' | 'amir' | 'emre';

export type TeamCountryCode = 'CZ' | 'IT' | 'TR';

export type TeamMember = {
  name: string;
  role: string;
  country: string;
  countryCode: TeamCountryCode;
  avatar: TeamAvatarId;
};
export type SpicyTake = {
  id: number;
  framed_headline: string;
  what_happened: string;
  fact_check: FactCheck;
  image_url: string;
  source: string;
};
