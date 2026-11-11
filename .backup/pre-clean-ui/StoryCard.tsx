import Link from 'next/link';
import { BiasBar } from './BiasBar';
import { NewsImage } from './NewsImage';
import { OutletChip } from './OutletChip';
import type { Story } from '@/lib/types';

export function StoryCard({ story, featured = false }: { story: Story; featured?: boolean }) {
  return (
    <article className={`story-card ${featured ? 'story-card--featured' : ''}`}>
      <a href={story.article_url} target="_blank" rel="noopener noreferrer" className="story-card__image-link" aria-label={`Read original article: ${story.headline}`}>
        <NewsImage src={story.image_url} alt={`${story.headline} — news image`} credit={story.image_credit} keywords={story.image_keywords} fallbackLetter={story.outlets[0]?.name.slice(0, 1)} />
      </a>
      <div className="story-card__body">
        <div className="story-card__meta"><span>{story.posted}</span><span className="meta-rule" aria-hidden="true" /><span>{story.outlets.length} outlets</span></div>
        <h3><Link href={`/story/${story.id}`}>{story.headline}</Link></h3>
        <p>{story.summary}</p>
        <div className="story-card__signal"><BiasBar bias={story.bias} compact /></div>
        <div className="story-card__footer">
          <div className="chip-row">{story.outlets.slice(0, 3).map((outlet) => <OutletChip key={outlet.name} name={outlet.name} lean={outlet.lean} />)}</div>
          <Link className="text-link" href={`/story/${story.id}`}>Compare coverage</Link>
        </div>
      </div>
    </article>
  );
}
