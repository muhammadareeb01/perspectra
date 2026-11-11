import { readClearlySteps } from '@/lib/product-story';
import { Reveal } from './Reveal';

export function ReadClearlySteps() {
  return (
    <section className="page-section read-clearly">
      <div className="shell">
        <span className="eyebrow">How you read clearly</span>
        <h2 className="read-clearly__title">Three moves. Fuller picture.</h2>
        <div className="read-clearly__grid">
          {readClearlySteps.map(([number, title, text], index) => (
            <Reveal key={number} delay={index * 60}>
              <article className="read-clearly__step">
                <span className="read-clearly__number">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
