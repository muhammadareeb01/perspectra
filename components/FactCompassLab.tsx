'use client';

import { useMemo, useState } from 'react';
import { spicy, stories } from '@/lib/data';
import { getStoryCoverage } from '@/lib/coverage';
import type { FactCheck } from '@/lib/types';
import { CoverageCompass } from './CoverageCompass';
import { Reveal } from './Reveal';

const lessons = [
  {
    id: 'needle',
    title: 'Read the needle, not the noise',
    body: 'The needle tilts toward whichever lean most publishers on this story belong to. A sharp tilt means one side of the press room showed up.'
  },
  {
    id: 'arc',
    title: 'Check the ring segments',
    body: 'Blue, grey, and red arcs count publishers on this event across left, center, and right desks. Not one outlet’s permanent label.'
  },
  {
    id: 'facts',
    title: 'Separate framing from fact',
    body: 'Headlines can be true, misleading, or overdone. We line up the loud framing with a plain what happened note.'
  }
];

function factCheckLabel(check: FactCheck) {
  return check === 'true' ? 'Verified context' : check === 'misleading' ? 'Needs context' : 'Overstated';
}

export function FactCompassLab() {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [takeIndex, setTakeIndex] = useState(0);

  const take = spicy[takeIndex % spicy.length];
  const sourceStory = useMemo(() => stories.find((story) => story.id === take.id) || stories[0], [take.id]);
  const coverageMix = useMemo(() => getStoryCoverage(sourceStory), [sourceStory]);
  const lesson = lessons[lessonIndex % lessons.length];

  return (
    <section className="page-section page-section--rule">
      <div className="shell">
        <div className="fact-lab">
          <div className="fact-lab__intro">
            <span className="eyebrow">08 / Compass fact lab</span>
            <h2>Learn the compass. Check the claim.</h2>
            <p className="muted">Short lessons on the compass, then a real headline next to what reporting actually supports. No gimmicks, just practice.</p>
            <div className="fact-lab__lesson-tabs" role="tablist" aria-label="Compass lessons">
              {lessons.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={lessonIndex === index}
                  className={`fact-lab__tab ${lessonIndex === index ? 'is-active' : ''}`}
                  onClick={() => setLessonIndex(index)}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            <Reveal key={lesson.id}>
              <article className="fact-lab__lesson-card">
                <strong>{lesson.title}</strong>
                <p>{lesson.body}</p>
              </article>
            </Reveal>
          </div>

          <div aria-label="Interactive fact check training" className="fact-lab__trainer">
            <div className="fact-lab__trainer-top">
              <CoverageCompass bias={coverageMix} label="Publishers on this story" />
              <div>
                <span className="kicker">Live exercise</span>
                <p className="fact-lab__bias-hint">
                  {sourceStory.outlets.length} sources reporting · bias bar L {coverageMix.left}% · C {coverageMix.center}% · R {coverageMix.right}%
                </p>
              </div>
            </div>

            <blockquote className="fact-lab__framed">“{take.framed_headline.replace(/^‘|’$/g, '')}”</blockquote>

            <div className="fact-lab__verified">
              <div className={`fact-label fact-label--${take.fact_check}`}>
                <span className="fact-label__dot" />
                {factCheckLabel(take.fact_check)}
              </div>
              <p>{take.what_happened}</p>
              <small className="muted">Source lane: {take.source}</small>
            </div>

            <div className="fact-lab__actions">
              <button type="button" className="button button--surface" onClick={() => setTakeIndex(takeIndex + 1)}>
                Next real-world example
              </button>
              <a className="text-link" href={sourceStory.article_url} target="_blank" rel="noopener noreferrer">
                Open original publisher <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
