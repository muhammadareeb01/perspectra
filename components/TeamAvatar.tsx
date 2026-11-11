import type { TeamAvatarId } from '@/lib/types';
import { getTeamAvatarSvg } from '@/lib/team-dicebear';

type TeamAvatarProps = {
  id: TeamAvatarId;
  className?: string;
};

export function TeamAvatar({ id, className = '' }: TeamAvatarProps) {
  const svg = getTeamAvatarSvg(id);

  return (
    <span
      className={`team-dicebear-avatar ${className}`.trim()}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
