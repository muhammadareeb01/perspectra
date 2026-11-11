import { team } from '@/lib/data';
import { TeamAvatar } from '@/components/TeamAvatar';
import { TeamFlag } from '@/components/TeamFlag';

export default function WhoWeArePage() {
  return (
    <section className="page-hero team-hero">
      <div className="shell team-hero__grid">
        <div className="team-hero__copy">
          <span className="eyebrow">Team</span>
          <h1>Six people who got tired of one headline pretending to be the whole story.</h1>
          <p>
            We split the work so you see who does what: Eli makes it visible, Hassan holds the idea, Areeb builds the
            site (and the reward tiers), Amir codes with him and watches the numbers, Yash talks you through it, Emre writes the
            copy. Czech Republic, Italy, Turkey. Same goal: compare, then click through to the real article.
          </p>
          <aside className="team-hero__meta">
            <strong>6 people</strong>
            <p>Outlet tags are habits, not report cards. Even BBC has a bad Tuesday sometimes.</p>
          </aside>
        </div>

        <div className="team-hero__crew" aria-label="Team members">
          <div className="team-grid team-grid--hero">
            {team.map((member, index) => (
              <article className="team-card team-card--compact" key={member.name} aria-label={`${member.name}, ${member.country}`}>
                <div className="team-card__photo" style={{ animationDelay: `${index * 0.1}s` }}>
                  <TeamAvatar id={member.avatar} className="team-card__avatar" />
                  <TeamFlag
                    code={member.countryCode}
                    title={member.country}
                    className="team-card__photo-flag"
                  />
                </div>
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
