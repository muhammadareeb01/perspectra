import { valuePillars } from '@/lib/product-story';
import { Reveal } from './Reveal';

export function ValuePillars() {
  return (
    <section className="page-section value-pillars-section" aria-labelledby="value-pillars-title">
      <div className="shell value-pillars__shell">
        <div className="value-pillars__head">
          <Reveal>
            <div className="value-pillars__intro-block">
              <span className="eyebrow">Why compare</span>
              <h2 id="value-pillars-title" className="value-pillars__title">
                The headline is rarely the whole event.
              </h2>
              <p className="value-pillars__intro">
                Same facts, different emphasis. We group publishers on one story so you can read wider, spot who is missing,
                and still land on the original report.
              </p>
            </div>
          </Reveal>
          <p className="value-pillars__aside">
            <span className="value-pillars__aside-label">In practice</span>
            Four habits we baked into every cluster — no paywall on the comparison, links out when you are ready to read.
          </p>
        </div>

        <div className="value-pillars" role="list">
          {valuePillars.map((item, index) => (
            <Reveal key={item.id} delay={index * 55} className="value-pillars__cell">
              <article className={`value-pillar value-pillar--${item.id}`} role="listitem">
                <span className="value-pillar__step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
