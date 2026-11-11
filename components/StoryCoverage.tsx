import type { Story } from '@/lib/types';
import { countRatedSources, dominantLean, getStoryCoverage, missingCoverageSides } from '@/lib/coverage';
import { leanLabel } from '@/lib/data';
import { BiasBar } from './BiasBar';
import { CoverageCompass } from './CoverageCompass';

type StoryCoverageProps = {
  story: Story;
  compact?: boolean;
  showCompass?: boolean;
  showCaption?: boolean;
};

const STORY_COMPASS_HINT =
  'Story compass = average of each headline’s framing on this topic. Channel cards below show their own L/C/R bars.';

export function StoryCoverage({ story, compact = false, showCompass = true, showCaption = true }: StoryCoverageProps) {
  const mix = getStoryCoverage(story);
  const sourceCount = countRatedSources(story.outlets);
  const missing = missingCoverageSides(story.outlets);
  const lead = dominantLean(mix);

  const caption = showCaption
    ? compact
      ? `${sourceCount} sources reporting`
      : `${sourceCount} sources reporting · mostly ${leanLabel(lead).toLowerCase()} (${mix[lead]}%)`
    : undefined;

  const aria = `Story compass from ${sourceCount} headlines. Left ${mix.left}%, Center ${mix.center}%, Right ${mix.right}%. ${STORY_COMPASS_HINT}`;
  const gapNote =
    missing.length > 0
      ? ` No ${missing.map((lean) => leanLabel(lean).toLowerCase())} rated source in this cluster yet.`
      : '';

  return (
    <div className={`story-coverage news-compass ${compact ? 'story-coverage--compact' : ''}`}>
      {caption ? <span className="story-coverage__caption">{caption}</span> : null}
      <span className="news-compass__label">News compass</span>
      <div className={`story-coverage__row ${showCompass ? 'story-coverage__row--compass' : ''}`}>
        {showCompass ? <CoverageCompass bias={mix} label="News compass for this story" /> : null}
        <BiasBar bias={mix} compact={compact} storyCoverage ariaDescription={`${aria}${gapNote}`} />
      </div>
      {!compact && showCaption ? <span className="story-coverage__hint muted">{STORY_COMPASS_HINT}</span> : null}
    </div>
  );
}
