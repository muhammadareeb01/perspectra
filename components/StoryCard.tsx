import Link from 'next/link';
import { StoryCoverage } from './StoryCoverage';
import { StoryInsights } from './StoryInsights';
import { NewsImage } from './NewsImage';
import { OutletTakeList } from './OutletTakeList';
import type { Story } from '@/lib/types';

export function StoryCard({ story, featured = false }: { story: Story; featured?: boolean }) {
  const more = Math.max(0, story.outlets.length - 3);

  return (
    <article className={`story-card story-card--rich ${featured ? 'story-card--featured' : ''}`}>
      <div className="story-card__spectrum" aria-hidden="true" />
      <a
        href={story.article_url}
        target="_blank"
        rel="noopener noreferrer"
        className="story-card__image-link"
        aria-label={`Read original article: ${story.headline}`}
      >
        <NewsImage
          src={story.image_url}
          alt={`${story.headline}, news image`}
          credit={story.image_credit}
          keywords={story.image_keywords}
          fallbackLetter={story.outlets[0]?.name.slice(0, 1)}
        />
        {story.trending ? <span className="story-card__badge">Trending</span> : null}
      </a>
      <div className="story-card__body">
        <div className="story-card__meta">
          {story.topic ? <span className="story-card__topic">{story.topic}</span> : null}
          <span>{story.posted}</span>
          <span className="meta-rule" aria-hidden="true" />
          <span>{story.outlets.length} sources</span>
        </div>
        <h3>
          <Link href={`/story/${story.id}`}>{story.headline}</Link>
        </h3>
        <p className="story-card__summary">{story.summary}</p>
        <StoryInsights story={story} compact />
        <div className="story-card__signal story-card__signal--panel">
          <StoryCoverage story={story} compact showCaption={false} />
        </div>
        <div className="story-card__takes">
          <div className="story-card__takes-head">
            <span className="story-card__takes-label">Channel takes</span>
            {more > 0 ? <span className="story-card__more">+{more} more</span> : null}
          </div>
          <OutletTakeList outlets={story.outlets} reliability={story.reliability} limit={3} variant="stack" tile />
        </div>
        <Link className="button button--surface story-card__cta" href={`/story/${story.id}`}>
          Open full comparison
        </Link>
      </div>
    </article>
  );
}
