import { falseNewsSpread } from '@/lib/research-stats';
import { EditorialBarViz } from './EditorialBarViz';
import { Reveal } from './Reveal';

export function MisinformationSpreadSection() {
  const { bars, chartMax, chartSteps } = falseNewsSpread;
  const ariaSummary = 'Indexed retweet likelihood: true news 100, false news 170, illustrating about 70 percent higher odds.';

  return (
    <section
      className="page-section research-section research-section--soft"
      aria-labelledby="misinformation-title"
    >
      <div className="shell research-section__shell">
        <div className="research-section__grid research-section__grid--flip">
          <Reveal>
            <EditorialBarViz
              title={falseNewsSpread.chartTitle}
              caption={falseNewsSpread.chartCaption}
              chartMax={chartMax}
              chartSteps={chartSteps}
              bars={bars}
              format="index"
              ariaSummary={ariaSummary}
            />
          </Reveal>

          <Reveal delay={70}>
            <article className="research-section__story">
              <span className="eyebrow">{falseNewsSpread.eyebrow}</span>
              <p className="research-section__context">{falseNewsSpread.context}</p>
              <h2 id="misinformation-title" className="research-section__title serif">
                {falseNewsSpread.title}
              </h2>
              <p className="research-section__lede">{falseNewsSpread.body}</p>

              <blockquote className="research-section__pull">
                <p>
                  <span className="research-section__big-num">{falseNewsSpread.pullStat}</span>
                  {falseNewsSpread.pullLabel}
                </p>
              </blockquote>

              <ul className="research-section__facts">
                {falseNewsSpread.sideStats.map((row) => (
                  <li key={row.label}>
                    <span className="research-section__fact-num">{row.value}</span>
                    <span className="research-section__fact-label">{row.label}</span>
                  </li>
                ))}
              </ul>

              <p className="research-section__note">
                <strong>{falseNewsSpread.takeawayTitle}.</strong> {falseNewsSpread.takeaway}
              </p>

              <footer className="research-section__meta">
                <a
                  className="research-section__ref"
                  href={falseNewsSpread.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {falseNewsSpread.sourceLabel} ↗
                </a>
                <a
                  className="research-section__ref research-section__ref--secondary"
                  href={falseNewsSpread.paperHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Science paper ↗
                </a>
                <p className="research-section__cite">{falseNewsSpread.sourceNote}</p>
              </footer>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
