'use client';

import Link from 'next/link';
import { stories } from '@/lib/data';
import { dominantLean, getStoryCoverage } from '@/lib/coverage';
import { blindspotEyebrow, pickBlindspotStories } from '@/lib/blindspot';
import { StoryCoverage } from './StoryCoverage';
import { NewsImage } from './NewsImage';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { HeroFactStrip } from './HeroFactStrip';
import { StoryCard } from './StoryCard';
import { HeroCarousel } from './HeroCarousel';
import { ProductFaq } from './ProductFaq';
import { HomeStepBridge } from './HomeStepBridge';
import { HomeMoreLinks } from './HomeMoreLinks';

const HOME_CLUSTER_LIMIT = 6;

export function HomeClient() {
  const featured = stories[0];
  const homeClusters = stories.slice(0, HOME_CLUSTER_LIMIT);
  const blindspotStories = pickBlindspotStories(stories, 3);
  const left = featured.outlets.find((outlet) => outlet.lean === 'left') || featured.outlets[0];
  const center = featured.outlets.find((outlet) => outlet.lean === 'center') || featured.outlets[1];
  const right = featured.outlets.find((outlet) => outlet.lean === 'right') || featured.outlets[2];

  return (
    <>
    <section className="hero hero--mesh">
      <div className="shell hero__grid hero__grid--desk">
        <div className="hero__copy">
          <span className="eyebrow">Compare coverage</span>
          <h1>
            See the full picture.
            <br />
            <em>Not just one side.</em>
          </h1>
          <p className="hero__keyline">Same event. Many publishers. One place to compare who reported it and how.</p>
          <p className="hero__sub">
            Bias bar, blindspots, and headlines lined up next to each other. When you are ready, read the original on their site.
          </p>
          <HeroFactStrip />
        </div>
        <HeroCarousel stories={stories} />
      </div>
    </section>

    <HomeStepBridge step="01" label="Compare clusters" />

    <section className="page-section home-stream__step" id="clusters">
      <div className="shell">
        <SectionHeading
          eyebrow="01 / Clusters"
          title="Top stories, compared across the spectrum."
          intro="Six clusters on the home page. The bar counts left, center, and right rated publishers on each event."
          action={
            stories.length > HOME_CLUSTER_LIMIT ? (
              <Link className="text-link" href="/clusters">
                All {stories.length} clusters <span aria-hidden="true">→</span>
              </Link>
            ) : null
          }
        />
        <div className="story-grid">
          {homeClusters.map((story, index) => (
            <Reveal key={story.id} delay={index * 60}>
              <StoryCard story={story} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <HomeStepBridge step="02" label="Three readings" />

    <section className="page-section page-section--soft home-stream__step">
      <div className="shell">
        <SectionHeading
          eyebrow="02 / One story"
          title="Same story. Different headline."
          intro="The facts may overlap. The emphasis rarely does."
          action={
            <Link className="text-link" href={`/story/${featured.id}`}>
              Full comparison <span aria-hidden="true">→</span>
            </Link>
          }
        />
        <Reveal>
          <div className="comparison">
            {[
              ['left', left],
              ['center', center],
              ['right', right]
            ].map(([lean, outlet]) => {
              const mention = outlet as typeof left;
              return (
                <div key={lean as string} className={`comparison__column comparison__column--${lean}`}>
                  <div className="comparison__lean">
                    <span className={`lean-dot lean-dot--${lean}`} />
                    {lean as string}
                  </div>
                  <div className="comparison__outlet">{mention.name}</div>
                  <div className="comparison__headline">{mention.headline}</div>
                  <NewsImage
                    src={featured.image_url}
                    alt={`${featured.headline} comparison image`}
                    credit={featured.image_credit}
                    keywords={featured.image_keywords}
                    className="comparison__image"
                  />
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>

    <HomeStepBridge step="03" label="Blindspots" />

    <section className="page-section home-stream__step">
      <div className="shell">
        <SectionHeading
          eyebrow="03 / Blindspot"
          title="What gets left out?"
          intro="When the bar leans hard one way, or a whole lean never shows up, read wider."
        />
        <div className="blindspot-grid">
          {blindspotStories.map((story) => {
            const lead = dominantLean(getStoryCoverage(story));
            return (
              <Reveal key={story.id} delay={60}>
                <article className={`blindspot-card blindspot-card--${lead}`}>
                  <NewsImage
                    src={story.image_url}
                    alt={`${story.headline}, blindspot story image`}
                    credit={story.image_credit}
                    keywords={story.image_keywords}
                  />
                  <div className="blindspot-card__body">
                    <div className="blindspot-card__signal">
                      <span className="eyebrow">{blindspotEyebrow(story)}</span>
                    </div>
                    <h3>{story.headline}</h3>
                    <p>{story.summary}</p>
                    <StoryCoverage story={story} compact showCaption={false} />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    <HomeMoreLinks />

    <ProductFaq />
  </>
  );
}
