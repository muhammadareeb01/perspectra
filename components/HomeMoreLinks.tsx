import Link from 'next/link';

const links = [
  {
    href: '/clusters',
    title: 'All clusters',
    body: 'Every story on the comparison grid, not just the home preview.'
  },
  {
    href: '/research',
    title: 'Research & charts',
    body: 'Reuters and MIT figures behind the stats on this site.'
  },
  {
    href: '/who-we-are',
    title: 'Who we are',
    body: 'The team behind Perspectra and why we built it.'
  },
  {
    href: '/support',
    title: 'Support us',
    body: 'Help us grow outlets and keep comparisons independent.'
  }
] as const;

export function HomeMoreLinks() {
  return (
    <section className="page-section page-section--soft home-more" aria-labelledby="home-more-title">
      <div className="shell">
        <span className="eyebrow">Keep going</span>
        <h2 id="home-more-title" className="home-more__title">
          The home page is the preview — not the whole product.
        </h2>
        <ul className="home-more__list">
          {links.map((item) => (
            <li key={item.href}>
              <Link className="home-more__card" href={item.href}>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
                <span className="home-more__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
