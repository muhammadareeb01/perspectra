export const FUNDING_GOAL_EUR = 12_000;

export function fundingGoalPercent(raisedEur: number): number {
  if (FUNDING_GOAL_EUR <= 0) return 0;
  return Math.min(100, Math.round((raisedEur / FUNDING_GOAL_EUR) * 100));
}
