import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StoryCoverage } from '@/components/StoryCoverage';
import { NewsImage } from '@/components/NewsImage';
import { OutletTakeList } from '@/components/OutletTakeList';
import { SectionHeading } from '@/components/SectionHeading';
import { getStory } from '@/lib/data';
import { getOutletArticleUrl } from '@/lib/outlet-links';
import type { Lean } from '@/lib/types';

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const story = getStory(id);
  if (!story) notFound();
  const groups: Lean[] = ['left', 'center', 'right'];
  const labels: Record<Lean, string> = { left: 'Left', center: 'Center', right: 'Right' };
  const covered = new Set(story.outlets.map((outlet) => outlet.lean));

  return (
    <>
      <section className="story-hero">
        <div className="shell">
          <div className="story-hero__meta">
            {story.topic ? <span className="story-card__topic">{story.topic}</span> : null}
            <span>{story.posted}</span>
            <span>·</span>
            <span>{story.outlets.length} sources in this cluster</span>
          </div>
          <h1>{story.headline}</h1>
          <div className="story-hero__summary">{story.summary}</div>
          <div style={{ maxWidth: 620, marginTop: 26 }}>
            <StoryCoverage story={story} showCompass />
          </div>
          <div className="story-hero__image">
            <NewsImage
              src={story.image_url}
              alt={`${story.headline}, hero news image`}
              credit={story.image_credit}
              keywords={story.image_keywords}
            />
          </div>
        </div>
      </section>

      <section className="page-section page-section--soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Channel cards"
            title="What each outlet said on this topic."
            intro="Each card has its own framing bar and factual tag. Scan who sounds alarmist, neutral, or upbeat before you open the link."
          />
          <OutletTakeList outlets={story.outlets} reliability={story.reliability} limit={story.outlets.length} variant="grid" />
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <SectionHeading
            eyebrow="By lean"
            title="Left, center, and right columns."
            intro="Grouped for quick scanning. Open the publisher’s site for the full article."
          />
          <div className="coverage-layout">
            {groups.map((lean) => (
              <div className={`coverage-column coverage-column--${lean}`} key={lean}>
                <h2>{labels[lean]}</h2>
                {story.outlets
                  .filter((outlet) => outlet.lean === lean)
                  .map((outlet) => {
                    const outletUrl = getOutletArticleUrl(outlet);
                    return (
                    <article className="coverage-item" key={outlet.name}>
                      <div className="coverage-item__outlet">
                        <span className={`lean-dot lean-dot--${lean}`} />
                        {outlet.name}
                      </div>
                      <h3>{outlet.headline}</h3>
                      {outletUrl ? (
                        <Link
                          className="text-link"
                          href={outletUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read on {outlet.name} <span aria-hidden="true">↗</span>
                        </Link>
                      ) : null}
                      <div className="coverage-item__reliability">
                        Factual rating: <strong>{story.reliability?.[outlet.name] || 'See source profile'}</strong>
                      </div>
                    </article>
                  );
                  })}
              </div>
            ))}
          </div>
          <div className="coverage-gap">
            <h2>Coverage gap</h2>
            <p>
              {covered.size < 3
                ? `This story is currently missing a ${groups
                    .filter((lean) => !covered.has(lean))
                    .map((lean) => labels[lean])
                    .join(' and ')} perspective in the fixture. That absence is part of the signal: a quiet side can still shape what readers think the story is about.`
                : 'All three sides are represented in the fixture. The next useful step is to compare what each outlet leaves out, not just what it says.'}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
