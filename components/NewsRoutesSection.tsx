import { newsAccessRoutes } from '@/lib/research-stats';
import { EditorialBarViz } from './EditorialBarViz';
import { Reveal } from './Reveal';

export function NewsRoutesSection() {
  const { bars, chartMax, chartSteps } = newsAccessRoutes;
  const ariaSummary = bars.map((bar) => `${bar.label} ${bar.value}%`).join('. ');

  return (
    <section className="page-section research-section" aria-labelledby="news-routes-title">
      <div className="shell research-section__shell">
        <div className="research-section__grid">
          <Reveal>
            <article className="research-section__story">
              <span className="eyebrow">{newsAccessRoutes.eyebrow}</span>
              <p className="research-section__context">{newsAccessRoutes.context}</p>
              <h2 id="news-routes-title" className="research-section__title serif">
                {newsAccessRoutes.title}
              </h2>
              <p className="research-section__lede">{newsAccessRoutes.body}</p>

              <p className="research-section__note">
                <strong>{newsAccessRoutes.takeawayTitle}.</strong> {newsAccessRoutes.takeaway}
              </p>

              <footer className="research-section__meta">
                <a
                  className="research-section__ref"
                  href={newsAccessRoutes.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {newsAccessRoutes.sourceLabel} ↗
                </a>
                <p className="research-section__cite">{newsAccessRoutes.sourceNote}</p>
              </footer>
            </article>
          </Reveal>

          <Reveal delay={90}>
            <EditorialBarViz
              title={newsAccessRoutes.chartTitle}
              footnote={newsAccessRoutes.footnote}
              chartMax={chartMax}
              chartSteps={chartSteps}
              bars={bars}
              format="percent"
              ariaSummary={ariaSummary}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
