export function HomeStepBridge({ step, label }: { step: string; label: string }) {
  return (
    <div className="home-step-bridge shell" aria-hidden="true">
      <span className="home-step-bridge__step">{step}</span>
      <span className="home-step-bridge__rule" />
      <span className="home-step-bridge__label">{label}</span>
    </div>
  );
}
