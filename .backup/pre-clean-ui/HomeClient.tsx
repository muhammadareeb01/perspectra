'use client';

import Link from 'next/link';
import { stories, outlets, spicy, gossip } from '@/lib/data';
import { BiasBar } from './BiasBar';
import { CoverageCompass } from './CoverageCompass';
import { NewsImage } from './NewsImage';
import { OutletChip } from './OutletChip';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { Stat } from './Stat';
import { StoryCard } from './StoryCard';
import { LiveWireSection } from './LiveWireSection';
import { FactCompassLab } from './FactCompassLab';
import { HeroCarousel } from './HeroCarousel';

const steps = [
  ['01', 'Collect news from many outlets', 'We gather concise story signals from a broad range of publishers.'],
  ['02', 'Categorize sources', 'Each source is labelled Left, Center, or Right using transparent methodology.'],
  ['03', 'Analyze coverage and gaps', 'We show what gets attention—and which angles are missing.'],
  ['04', 'Compare perspectives', 'Read the headlines side by side before choosing the original.'],
  ['05', 'Rate reliability', 'Factual ratings come from independent fact-checking organizations.'],
  ['06', 'Send you to the source', 'Every story link takes you to the original publisher’s site.']
];

export function HomeClient() {
  const featured = stories[0];
  const left = featured.outlets.find((outlet) => outlet.lean === 'left') || featured.outlets[0];
  const center = featured.outlets.find((outlet) => outlet.lean === 'center') || featured.outlets[1];
  const right = featured.outlets.find((outlet) => outlet.lean === 'right') || featured.outlets[2];

  return <>
    <section className="hero hero--mesh">
      <div className="shell hero__grid hero__grid--desk">
        <div className="hero__copy">
          <span className="eyebrow">Same story. Different tint.</span>
          <h1>
            Don&apos;t miss
            <br />
            <em>the other side.</em>
          </h1>
          <p className="hero__keyline">Most people stop at one headline. You don&apos;t have to.</p>
          <p className="hero__sub">Compare the headlines, see what each side emphasizes, and read the original story for yourself.</p>
          <div className="stats-row">
            <Stat value={`${outlets.length}`} label="outlets tracked" />
            <Stat value={`${stories.length}`} label="stories compared" />
            <Stat value="0" label="articles republished" />
          </div>
        </div>
        <HeroCarousel stories={stories} />
      </div>
    </section>

    <LiveWireSection />

    <section className="page-section"><div className="shell"><SectionHeading eyebrow="01 / The daily read" title="Top stories, without the tunnel vision." intro="A quick scan of what is moving across the news cycle. The bar shows the mix of coverage; the chips show who is in the room." /><div className="story-grid">{stories.map((story, index) => <Reveal key={story.id} delay={index * 60}><StoryCard story={story} /></Reveal>)}</div></div></section>

    <section className="page-section page-section--soft"><div className="shell"><SectionHeading eyebrow="02 / One story, three readings" title="Same story. Different headline." intro="The facts may overlap. The emphasis rarely does." action={<Link className="text-link" href={`/story/${featured.id}`}>See full comparison <span aria-hidden="true">→</span></Link>} /><Reveal><div className="comparison">{[['left', left], ['center', center], ['right', right]].map(([lean, outlet]) => { const mention = outlet as typeof left; return <div key={lean as string} className={`comparison__column comparison__column--${lean}`}><div className="comparison__lean"><span className={`lean-dot lean-dot--${lean}`} />{lean as string}</div><div className="comparison__outlet">{mention.name}</div><div className="comparison__headline">{mention.headline}</div><NewsImage src={featured.image_url} alt={`${featured.headline} comparison image`} credit={featured.image_credit} keywords={featured.image_keywords} className="comparison__image" /></div>; })}</div></Reveal></div></section>

    <section className="page-section"><div className="shell"><SectionHeading eyebrow="03 / The blindspot" title="What gets left out?" intro="These stories are being covered, but mostly from one side of the spectrum. That is a signal to read wider." /><div className="blindspot-grid">{[stories[4], stories[7], stories[3]].map((story, index) => { const side = index === 1 ? 'right' : index === 2 ? 'left' : 'center'; return <Reveal key={story.id} delay={index * 60}><article className={`blindspot-card blindspot-card--${side}`}><NewsImage src={story.image_url} alt={`${story.headline} — blindspot story image`} credit={story.image_credit} keywords={story.image_keywords} /><div className="blindspot-card__body"><div className="blindspot-card__signal"><span className="eyebrow">Mostly covered by {side === 'center' ? 'Center' : side === 'left' ? 'Left' : 'Right'}</span><CoverageCompass bias={story.bias} /></div><h3>{story.headline}</h3><p>{story.summary}</p><BiasBar bias={story.bias} compact /></div></article></Reveal>; })}</div></div></section>

    <section className="page-section page-section--soft"><div className="shell"><SectionHeading eyebrow="04 / Spicy takes" title="The headline did a little too much." intro="Framing is not the same as fact. We keep the spin visible, then put the verifiable version beside it." action={<span className="kicker">Sharp, not sneering</span>} /><div className="spicy-grid">{spicy.slice(0, 3).map((take, index) => { const sourceStory = stories.find((story) => story.id === take.id) || featured; return <Reveal key={take.id} delay={index * 60}><article className="spicy-card"><NewsImage src={take.image_url} alt={`News image for ${take.what_happened}`} credit="Spicy Takes" keywords={sourceStory.image_keywords} /><div className="spicy-card__body"><div className="spicy-card__signal"><span className="eyebrow">How it was framed</span><CoverageCompass bias={sourceStory.bias} /></div><h3>{take.framed_headline}</h3><div className="spicy-card__fact"><div className={`fact-label fact-label--${take.fact_check}`}><span className="fact-label__dot" />{take.fact_check}</div>{take.what_happened}</div></div></article></Reveal>; })}</div></div></section>

    <section className="page-section"><div className="shell"><SectionHeading eyebrow="05 / Source reliability" title="A source is more than a colour dot." intro="Lean labels help you compare framing. Factual ratings come from independent fact-checking organizations and should be read as a starting point, not a verdict." action={<Link className="text-link" href="/sources">View all sources <span aria-hidden="true">→</span></Link>} /><div className="source-table-wrap"><table className="reliability-table"><thead><tr><th>Outlet</th><th>Lean</th><th>Factual rating</th><th>Country</th><th>Why it matters</th></tr></thead><tbody>{outlets.slice(0, 6).map((outlet) => <tr key={outlet.name}><td>{outlet.name}</td><td><OutletChip name={outlet.lean === 'left' ? 'Left' : outlet.lean === 'right' ? 'Right' : 'Center'} lean={outlet.lean} /></td><td className={`rating rating--${outlet.factual.toLowerCase()}`}>{outlet.factual}</td><td>{outlet.country}</td><td className="source-note">{outlet.note}</td></tr>)}</tbody></table></div></div></section>

    <section className="page-section page-section--soft"><div className="shell"><SectionHeading eyebrow="06 / The method" title="How Tint works." intro="A six-step route from a crowded news cycle to a clearer reading choice." action={<Link className="text-link" href="/how-it-works">Read the full method <span aria-hidden="true">→</span></Link>} /><div className="steps">{steps.map(([number, title, text], index) => <Reveal key={number} delay={index * 60}><div className="step"><span className="step__number">{number}</span><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div></div></section>

    <FactCompassLab />

    <section className="page-section"><div className="shell gossip-teaser"><div className="gossip-teaser__copy"><span className="eyebrow">07 / Dome Gossip</span><h2>Not every headline deserves a trust fall.</h2><p>Our harmless rumour wall is satire about habits, snacks, and office quirks. Compare it with the real thing.</p><Link className="button button--dark" href="/dome-gossip">Enter the dome <span aria-hidden="true">↗</span></Link></div><div className="gossip-mini-grid">{gossip.slice(0, 3).map((item) => <article className="gossip-mini" key={item.name}><span className="gossip-mini__tag">BREAKING:</span><p>{item.rumour}</p><small>Reliability: 0/5 · Satire</small></article>)}</div></div></section>

    <section className="shell"><div className="support-band"><div><h2>Help us show every side.</h2><p>Your support is one more outlet we can add.</p></div><Link className="button button--dark" href="/support">Support Tint <span aria-hidden="true">↗</span></Link></div></section>
  </>;
}
