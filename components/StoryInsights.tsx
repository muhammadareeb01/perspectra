import { storyInsights } from '@/lib/story-insights';
import type { Story } from '@/lib/types';

export function StoryInsights({ story, compact = false }: { story: Story; compact?: boolean }) {
  const { lead, leadLabel, mix, highCount, mixedCount, spread, loudest } = storyInsights(story);

  return (
    <ul className={`story-insights ${compact ? 'story-insights--compact' : ''}`}>
      <li className="story-insights__pill story-insights__pill--tilt">
        <span className="story-insights__label">Room tilt</span>
        <strong>
          {leadLabel} {mix[lead]}%
        </strong>
      </li>
      <li className="story-insights__pill">
        <span className="story-insights__label">Spread</span>
        <strong>{spread} pts</strong>
      </li>
      {!compact ? (
        <li className="story-insights__pill story-insights__pill--trust">
          <span className="story-insights__label">Factual</span>
          <strong>
            {highCount} high{mixedCount ? ` · ${mixedCount} mixed` : ''}
          </strong>
        </li>
      ) : null}
      {loudest && !compact ? (
        <li className="story-insights__pill story-insights__pill--loud">
          <span className="story-insights__label">Loudest angle</span>
          <strong>
            {loudest.name} · {loudest.peak.value}% {loudest.peak.lean === 'left' ? 'Left' : loudest.peak.lean === 'right' ? 'Right' : 'Center'}
          </strong>
        </li>
      ) : null}
    </ul>
  );
}
