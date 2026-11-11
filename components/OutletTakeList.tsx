import { leanLabel } from '@/lib/data';
import { getOutletFraming } from '@/lib/coverage';
import { getOutletArticleUrl } from '@/lib/outlet-links';
import { peakFraming } from '@/lib/story-insights';
import type { OutletMention } from '@/lib/types';
import { BiasBar } from './BiasBar';

export function OutletTakeList({
  outlets,
  limit = 4,
  variant = 'stack',
  reliability,
  tile = false
}: {
  outlets: OutletMention[];
  limit?: number;
  variant?: 'stack' | 'grid';
  reliability?: Record<string, string>;
  tile?: boolean;
}) {
  const shown = outlets.slice(0, limit);

  return (
    <ul className={`outlet-takes outlet-takes--${variant}${tile ? ' outlet-takes--tile' : ''}`}>
      {shown.map((outlet, index) => {
        const framing = getOutletFraming(outlet, index);
        const peak = peakFraming(framing);
        const factual = reliability?.[outlet.name];
        const factualClass =
          factual?.toLowerCase() === 'high' ? 'high' : factual?.toLowerCase() === 'low' ? 'low' : factual ? 'mixed' : 'unknown';
        const articleUrl = getOutletArticleUrl(outlet);

        const body = (
          <>
            <div className="outlet-take__crest" aria-hidden="true" />
            <div className="outlet-take__top">
              <span className="outlet-take__mark" aria-hidden="true">
                {outlet.name.slice(0, 1)}
              </span>
              <div className="outlet-take__identity">
                <span className="outlet-take__name">{outlet.name}</span>
                <span className="outlet-take__lean">Desk · {leanLabel(outlet.lean)}</span>
              </div>
              <span className={`outlet-take__peak outlet-take__peak--${peak.lean}`}>
                Peak {peak.value}%
              </span>
            </div>
            <p className="outlet-take__headline">{outlet.headline}</p>
            <div className="outlet-take__framing">
              <span className="outlet-take__framing-label">Headline framing</span>
              <BiasBar
                bias={framing}
                compact
                headlineFraming
                ariaDescription={`${outlet.name} headline framing: Left ${framing.left}%, Center ${framing.center}%, Right ${framing.right}%`}
              />
            </div>
            <div className="outlet-take__footer">
              <span className={`outlet-take__factual fact-pill fact-pill--${factualClass}`}>
                {factual || 'Unrated'} factual
              </span>
              <span className={`outlet-take__lean-tag outlet-take__lean-tag--${peak.lean}`} title={`Strongest ${peak.lean} framing`}>
                <span className={`lean-dot lean-dot--${peak.lean}`} aria-hidden="true" />
                {leanLabel(peak.lean)} lean
              </span>
            </div>
            {articleUrl ? (
              <span className="outlet-take__open">
                Read on {outlet.name} <span aria-hidden="true">↗</span>
              </span>
            ) : null}
          </>
        );

        return (
          <li key={outlet.name} className="outlet-take-item">
            {articleUrl ? (
              <a
                href={articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`outlet-take outlet-take--${outlet.lean} outlet-take--link ${tile ? 'outlet-take--tile' : ''}`}
                aria-label={`Read on ${outlet.name}: ${outlet.headline}`}
              >
                {body}
              </a>
            ) : (
              <div className={`outlet-take outlet-take--${outlet.lean} ${tile ? 'outlet-take--tile' : ''}`}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
