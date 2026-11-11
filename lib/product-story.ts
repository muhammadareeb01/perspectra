import { brand } from './brand';

export const valuePillars = [
  {
    id: 'compare',
    step: '01',
    title: 'Every publisher in one cluster',
    body: 'Same event on one page. You see who picked it up before opening a single tab.'
  },
  {
    id: 'bias',
    step: '02',
    title: 'Bias bar, not a hot take',
    body: 'The bar counts left, center, and right rated sources in the room — not whether the story itself is “political”.'
  },
  {
    id: 'blindspot',
    step: '03',
    title: 'What your feed skipped',
    body: 'One side dominates, or a whole lean never shows up? That is the cue to read one outlet you usually ignore.'
  },
  {
    id: 'fact',
    step: '04',
    title: 'Lean and factuality together',
    body: 'Independent ratings sit beside each outlet. Compare framing, check reliability, then read on their site.'
  }
] as const;

export const readClearlySteps = [
  ['01', 'Pick a story cluster', 'Choose an event we grouped across publishers. Chips show who is actually in the room.'],
  ['02', 'Compare left, center and right', 'Read headlines next to each other. The bias bar shows how many sources in each bucket reported it.'],
  ['03', 'Uncover blindspots', 'See which lean is missing or overweighted, then open the originals on their sites.']
] as const;

export const productFaqs = [
  {
    q: 'Do you publish original news?',
    a: `No. ${brand.name} is an aggregator. Snippets and comparisons link out to the publisher who did the reporting.`
  },
  {
    q: 'What does the bias bar measure?',
    a: 'For each story it shows the share of rated sources in the left, center, and right buckets. A bigger left slice means more left rated outlets picked it up. It does not mean the story itself is left wing.'
  },
  {
    q: 'How are outlets rated?',
    a: 'Lean and factuality are publication level labels from independent monitoring style research. They describe editorial tendency, not every journalist or headline.'
  },
  {
    q: 'What is a blindspot?',
    a: 'A story that skews hard to one lean, or where a whole side of the spectrum has few or no sources in the cluster yet.'
  },
  {
    q: 'Does the compass show story bias?',
    a: 'No. The compass mirrors the same source mix as the bias bar. It is a quick read of who showed up on this event.'
  },
  {
    q: 'How do I read the full article?',
    a: 'Tap Read on a channel card or use Read original on a story card. Links open the publisher site in a new tab.'
  }
] as const;
