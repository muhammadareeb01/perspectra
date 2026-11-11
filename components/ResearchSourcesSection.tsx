import { pageResearchSources } from '@/lib/research-sources';
import { ContactUsLink } from './ContactUsLink';
import { Reveal } from './Reveal';

export function ResearchSourcesSection() {
  return (
    <section className="page-section research-sources" aria-labelledby="research-sources-title">
      <div className="shell">
        <Reveal>
          <header className="research-sources__head">
            <span className="eyebrow">{pageResearchSources.eyebrow}</span>
            <h2 id="research-sources-title" className="research-sources__title serif">
              {pageResearchSources.title}
            </h2>
            <p className="research-sources__intro">{pageResearchSources.intro}</p>
          </header>
        </Reveal>

        <Reveal delay={60}>
          <div className="research-sources__table-wrap">
            <table className="research-sources__table">
              <thead>
                <tr>
                  <th scope="col">Study</th>
                  <th scope="col">Year</th>
                  <th scope="col">What it measures</th>
                  <th scope="col">Original source</th>
                </tr>
              </thead>
              <tbody>
                {pageResearchSources.rows.map((row) => (
                  <tr key={row.id}>
                    <td data-label="Study">{row.study}</td>
                    <td data-label="Year">{row.year}</td>
                    <td data-label="Measures">{row.measures}</td>
                    <td data-label="Source">
                      <a href={row.href} target="_blank" rel="noopener noreferrer">
                        {row.publisher} <span aria-hidden="true">↗</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <footer className="research-sources__foot">
            <p className="research-sources__disclaimer">{pageResearchSources.disclaimer}</p>
            <p className="research-sources__contact">
              Wrong citation or missing study?{' '}
              <ContactUsLink />
            </p>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
