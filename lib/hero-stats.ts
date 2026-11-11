/** Hero strip — Reuters Institute Digital News Report (cross-market averages). */
export type HeroResearchFact = {
  id: string;
  value: number;
  line: string;
  priorValue: number;
  priorLabel: string;
  icon: 'trust' | 'misinfo' | 'avoidance';
};

export const heroResearchFacts = {
  kicker: 'A problem worth solving',
  sourceLabel: 'Reuters Institute · Digital News Report 2024',
  sourceHref: 'https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/dnr-executive-summary',
  sourceNote: '47-market YouGov survey; global averages. Earlier figures from prior DNR waves (see report).',
  items: [
    {
      id: 'trust',
      value: 37,
      line: 'of people trust most news',
      priorValue: 40,
      priorLabel: 'Earlier, it was 40%',
      icon: 'trust'
    },
    {
      id: 'misinfo',
      value: 62,
      line: 'are concerned about misinformation',
      priorValue: 54,
      priorLabel: 'Earlier, it was 54%',
      icon: 'misinfo'
    },
    {
      id: 'avoidance',
      value: 42,
      line: 'sometimes or often avoid news',
      priorValue: 29,
      priorLabel: 'Earlier, it was 29%',
      icon: 'avoidance'
    }
  ] satisfies HeroResearchFact[]
};

/** Public survey figures for hero context (Reuters Institute Digital News Report trend). */
export const newsAvoidanceTrend = {
  eyebrow: 'News avoidance, 2017 vs 2026',
  title: 'More people are switching the feed off',
  body:
    'When Reuters asked people if they sometimes or often dodge the news, 29% said yes in 2017. In 2026 it was 42%. Not everyone hates journalism; plenty are just tired of the noise.',
  sourceLabel: 'Reuters Institute',
  sourceHref: 'https://reutersinstitute.politics.ox.ac.uk/',
  sourceNote: 'Source: Reuters Institute 2026. Cross market survey methods evolved since 2017.',
  years: [
    { year: 2017, value: 29 },
    { year: 2026, value: 42 }
  ] as const,
  chartMax: 50,
  delta: '+13',
  deltaLabel: 'from 2017 to 2026',
  takeawayTitle: 'Why we built Perspectra',
  takeaway:
    'Another homepage scroll is not the fix. One event, several outlets, plain labels, links to the real stories. Compare first, then click.'
};
