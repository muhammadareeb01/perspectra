/** Studies cited on the home page — each row links to the original publisher. */

export type ResearchSourceRow = {
  id: string;
  study: string;
  year: number;
  measures: string;
  publisher: string;
  href: string;
};

export const pageResearchSources = {
  eyebrow: 'Explore the research',
  title: 'Every number has a source',
  intro:
    'The charts above come from independent surveys and peer-reviewed work. This table is how we keep them honest: study, year, what was measured, and where to read the original.',
  disclaimer:
    'Each graph should be read with its survey question, geography, sample, and year. These studies use different populations and methods. Do not merge them into one score.',
  rows: [
    {
      id: 'dnr-avoidance',
      study: 'Digital News Report',
      year: 2024,
      measures: 'Selective news avoidance (sometimes or often avoids news)',
      publisher: 'Reuters Institute',
      href: 'https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/dnr-executive-summary'
    },
    {
      id: 'dnr-gateway',
      study: 'Digital News Report',
      year: 2024,
      measures: 'Main gateway to online news (search, social, direct)',
      publisher: 'Reuters Institute',
      href: 'https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/dnr-executive-summary'
    },
    {
      id: 'dnr-video',
      study: 'Digital News Report',
      year: 2024,
      measures: 'Weekly news video on platforms vs publisher sites',
      publisher: 'Reuters Institute',
      href: 'https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/dnr-executive-summary'
    },
    {
      id: 'pew-political',
      study: 'How Americans Navigate Politics and Political News',
      year: 2024,
      measures: 'Partisan differences in news sources and habits',
      publisher: 'Pew Research Center',
      href: 'https://www.pewresearch.org/journalism/2024/02/29/how-americans-navigate-politics-and-political-news-in-2024/'
    },
    {
      id: 'mit-false-news',
      study: 'The Spread of True and False News Online',
      year: 2018,
      measures: 'Speed and reach of false vs true stories on Twitter',
      publisher: 'Science / MIT',
      href: 'https://www.science.org/doi/10.1126/science.aap9559'
    },
    {
      id: 'pew-polarization',
      study: 'U.S. Media Polarization and the 2020 Election',
      year: 2020,
      measures: 'Conservative vs liberal trust in and use of news outlets',
      publisher: 'Pew Research Center',
      href: 'https://www.pewresearch.org/journalism/2020/01/24/u-s-media-polarization-and-the-2020-election-a-nation-divided/'
    }
  ] satisfies ResearchSourceRow[]
};
