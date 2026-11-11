import { newsAvoidanceTrend } from '@/lib/hero-stats';
import { AvoidanceViz } from './AvoidanceViz';
import { ContactUsLink } from './ContactUsLink';
import { Reveal } from './Reveal';

export function NewsAvoidanceSection() {
  const { takeaway } = newsAvoidanceTrend;

  return (
    <section className="page-section avoidance-section" aria-labelledby="avoidance-title">
      <div className="shell avoidance-section__shell">
        <div className="avoidance-section__grid">
          <Reveal>
            <article className="avoidance-section__story">
              <span className="eyebrow">By the numbers</span>
              <p className="avoidance-section__context">{newsAvoidanceTrend.eyebrow}</p>
              <h2 id="avoidance-title" className="avoidance-section__title serif">
                {newsAvoidanceTrend.title}
              </h2>
              <p className="avoidance-section__lede">{newsAvoidanceTrend.body}</p>

              <blockquote className="avoidance-section__pull">
                <p>
                  <span className="avoidance-section__big-num">{newsAvoidanceTrend.delta}</span>
                  <span className="avoidance-section__big-unit">pp</span>{' '}
                  {newsAvoidanceTrend.deltaLabel}
                </p>
              </blockquote>

              <p className="avoidance-section__note">
                <strong>{newsAvoidanceTrend.takeawayTitle}.</strong> {takeaway}
              </p>

              <footer className="avoidance-section__meta">
                <a
                  className="avoidance-section__ref"
                  href={newsAvoidanceTrend.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {newsAvoidanceTrend.sourceLabel} report ↗
                </a>
                <p className="avoidance-section__cite">{newsAvoidanceTrend.sourceNote}</p>
                <p className="avoidance-section__cite">
                  Questions about these numbers? <ContactUsLink />
                </p>
              </footer>
            </article>
          </Reveal>

          <Reveal delay={90}>
            <AvoidanceViz />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
