import Link from 'next/link';
import { stories } from '@/lib/data';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { StoryCard } from '@/components/StoryCard';

export default function ClustersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero__grid">
          <div>
            <span className="eyebrow">All clusters</span>
            <h1>Every story we are comparing right now.</h1>
            <p>Each card is one event. Open a cluster to line up headlines, the bias bar, and blindspots.</p>
          </div>
          <div className="page-hero__aside">
            <Link className="text-link" href="/">
              Back to home <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="shell">
          <SectionHeading
            eyebrow={`${stories.length} clusters`}
            title="Pick an event. Compare the room."
            intro="Labels describe the publisher, not the headline. Bars count who reported this cluster."
          />
          <div className="story-grid">
            {stories.map((story, index) => (
              <Reveal key={story.id} delay={index * 40}>
                <StoryCard story={story} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
