/** Verified public research figures — always ship with source + year in UI. */

export type ResearchBar = {
  id: string;
  label: string;
  value: number;
  tone?: 'muted' | 'accent';
};

export const newsAccessRoutes = {
  eyebrow: 'Where people get news',
  context: 'News routes · Reuters Institute · 2024',
  title: 'Most people start online news away from publisher homepages',
  body:
    'Across 47 markets, the Reuters Institute tracks where respondents say they usually begin online news. Search and aggregators lead, social media is close behind, and direct visits to news sites or apps trail both.',
  sourceLabel: 'Digital News Report 2024',
  sourceHref: 'https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/dnr-executive-summary',
  sourceNote:
    'Source: Reuters Institute Digital News Report 2024 executive summary (YouGov, 47 markets). Respondents pick one main gateway; weekly habits can overlap.',
  chartTitle: 'Main gateway to online news',
  chartMax: 40,
  chartSteps: [40, 30, 20, 10, 0] as const,
  bars: [
    { id: 'search', label: 'Search & aggregators', value: 33, tone: 'accent' },
    { id: 'social', label: 'Social media', value: 29, tone: 'muted' },
    { id: 'direct', label: 'News sites & apps', value: 22, tone: 'muted' }
  ] satisfies ResearchBar[],
  footnote:
    'Video tells a similar story: 72% of weekly news video viewing happens on third-party platforms versus 22% on publisher sites and apps (same report).',
  takeawayTitle: 'Why we link out',
  takeaway:
    'If the feed is already where people land, comparison has to travel with them. Perspectra clusters an event and sends you to the publisher, not a copy on our servers.'
};

export const falseNewsSpread = {
  eyebrow: 'How fast falsehoods move',
  context: 'Misinformation research · MIT · 2018',
  title: 'On Twitter, false stories spread faster than the truth',
  body:
    'Soroush Vosoughi, Deb Roy, and Sinan Aral studied about 126,000 true and false news cascades on Twitter from 2006 to 2017, checked against independent fact checkers. Humans, not bots, drove most of the gap.',
  sourceLabel: 'MIT News on the Science study',
  sourceHref: 'https://news.mit.edu/2018/study-twitter-false-news-travels-faster-true-stories-0308',
  paperHref: 'https://www.science.org/doi/10.1126/science.aap9559',
  sourceNote:
    'Source: Vosoughi, Roy & Aral (2018), Science; summary at MIT News. Historical Twitter data; not every platform today.',
  pullStat: '+70%',
  pullLabel: 'Falsehoods were more likely to be retweeted than the truth in that dataset.',
  sideStats: [
    { value: '~126k', label: 'true and false cascades studied' },
    { value: '~3m', label: 'people in the diffusion maps' }
  ] as const,
  chartTitle: 'Relative retweet likelihood (index)',
  chartCaption:
    'Illustration only: true stories indexed at 100, false at 170 to mirror the reported ~70% uplift. Not raw retweet rates from the paper.',
  chartMax: 200,
  chartSteps: [200, 150, 100, 50, 0] as const,
  valueSuffix: '',
  bars: [
    { id: 'true', label: 'True news', value: 100, tone: 'muted' },
    { id: 'false', label: 'False news', value: 170, tone: 'accent' }
  ] satisfies ResearchBar[],
  takeawayTitle: 'Why compare before you share',
  takeaway:
    'Reach is not proof. Perspectra lines up who reported what, adds lean and factuality labels, and keeps fact-check culture one click away so you can read originals before amplifying a take.'
};
