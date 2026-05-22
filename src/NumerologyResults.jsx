export default function NumerologyResults({ results }) {
  if (!results) {
    return null;
  }

  const { name, numbers, insight } = results;

  return (
    <section className="results-section">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 5%' }}>
        <div className="results-header">
          <h2 className="gradient-text">Your Numerological Profile</h2>
          <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>
            {name}'s Core Numbers
          </p>
        </div>

        <div className="numbers-grid">
          <div className="number-card">
            <div className="number-value">{numbers.lifePath}</div>
            <div className="number-label">Life Path</div>
            <p className="number-description">Your primary life lesson and journey</p>
          </div>

          <div className="number-card">
            <div className="number-value">{numbers.expression}</div>
            <div className="number-label">Expression</div>
            <p className="number-description">Your natural talents and gifts</p>
          </div>

          <div className="number-card">
            <div className="number-value">{numbers.soulUrge}</div>
            <div className="number-label">Soul Urge</div>
            <p className="number-description">Your inner desires and motivations</p>
          </div>

          <div className="number-card">
            <div className="number-value">{numbers.personality}</div>
            <div className="number-label">Personality</div>
            <p className="number-description">How others perceive you</p>
          </div>
        </div>

        <div className="insight-section">
          <h3 style={{ color: '#d4af37', marginBottom: '1.5rem' }}>AI-Powered Insights</h3>
          <div
            className="insight-content"
            dangerouslySetInnerHTML={{ __html: insight }}
          />
        </div>
      </div>
    </section>
  );
}