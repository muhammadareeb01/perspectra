import Link from 'next/link';
import type { Story } from '@/lib/types';
import { getTrendingStories } from '@/lib/trending';
import { stories as allStories } from '@/lib/data';
import { NewsImage } from './NewsImage';
import { OutletTakeList } from './OutletTakeList';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { StoryCoverage } from './StoryCoverage';
import { StoryInsights } from './StoryInsights';

export function TrendingClusters({ stories = allStories }: { stories?: Story[] }) {
  const trending = getTrendingStories(stories, 4);

  return (
    <section className="page-section page-section--soft trending-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Trending now"
          title="One topic."
          intro="One story. Check room tilt, factual mix, and how each desk frames it before you click."
        />
        <div className="trending-clusters">
          {trending.map((story, index) => (
            <Reveal key={story.id} delay={index * 50}>
              <article className="trending-cluster trending-cluster--rich">
                <span className="trending-cluster__rank" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="trending-cluster__inner">
                  <div className="trending-cluster__media">
                    <a
                      href={story.article_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="trending-cluster__image"
                      aria-label={`Read primary report: ${story.headline}`}
                    >
                      <NewsImage
                        src={story.image_url}
                        alt=""
                        credit={story.image_credit}
                        keywords={story.image_keywords}
                        fallbackLetter={story.outlets[0]?.name.slice(0, 1)}
                      />
                    </a>
                    <div className="trending-cluster__meta">
                      {story.topic ? <span className="trending-cluster__topic">{story.topic}</span> : null}
                      <span>{story.posted}</span>
                      <span className="meta-rule" aria-hidden="true" />
                      <span>{story.outlets.length} sources reporting</span>
                    </div>
                    <h2 className="trending-cluster__title">
                      <Link href={`/story/${story.id}`}>{story.headline}</Link>
                    </h2>
                    <p className="trending-cluster__summary">{story.summary}</p>
                    <StoryInsights story={story} />
                    <div className="trending-cluster__compass-panel">
                      <StoryCoverage story={story} compact showCaption={false} />
                    </div>
                    <Link className="button button--dark trending-cluster__compare" href={`/story/${story.id}`}>
                      Compare all coverage <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                  <div className="trending-cluster__takes">
                    <div className="trending-cluster__takes-head">
                      <span className="kicker">What each channel said</span>
                      <span className="trending-cluster__hint muted">Tap a desk to open their report ↗</span>
                    </div>
                    <OutletTakeList
                      outlets={story.outlets}
                      reliability={story.reliability}
                      limit={story.outlets.length}
                      variant="grid"
                      tile
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
