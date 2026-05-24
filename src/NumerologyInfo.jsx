export default function NumerologyInfo() {
  const numberMeanings = [
    {
      number: 1,
      title: 'Leadership',
      description: 'Independent, ambitious, pioneering. The initiator of new cycles.',
    },
    {
      number: 2,
      title: 'Partnership',
      description: 'Diplomatic, cooperative, intuitive. The bridge builder.',
    },
    {
      number: 3,
      title: 'Expression',
      description: 'Creative, communicative, artistic. The voice of inspiration.',
    },
    {
      number: 4,
      title: 'Foundation',
      description: 'Practical, stable, grounded. The builder of solid structures.',
    },
    {
      number: 5,
      title: 'Freedom',
      description: 'Dynamic, adventurous, versatile. The catalyst for change.',
    },
    {
      number: 6,
      title: 'Harmony',
      description: 'Nurturing, responsible, loving. The caretaker and healer.',
    },
    {
      number: 7,
      title: 'Wisdom',
      description: 'Introspective, analytical, spiritual. The seeker of truth.',
    },
    {
      number: 8,
      title: 'Power',
      description: 'Ambitious, authoritative, material. The manifestor of abundance.',
    },
    {
      number: 9,
      title: 'Completion',
      description: 'Compassionate, humanitarian, wise. The universal soul.',
    },
  ];

  return (
    <section className="info-section" style={{ padding: '100px 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="gradient-text" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          The Nine Archetypes
        </h2>

        <div className="info-grid">
          {numberMeanings.map((item) => (
            <div key={item.number} className="info-card">
              <div className="info-number">{item.number}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '4rem', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
          <h3 style={{ color: '#d4af37', marginBottom: '1rem' }}>Master Numbers</h3>
          <p style={{ lineHeight: '1.8' }}>
            <strong>11:</strong> The Intuitive — heightened intuition and spiritual insight.<br />
            <strong>22:</strong> The Master Builder — mastery of practical and spiritual realms.<br />
            <strong>33:</strong> The Master Teacher — healing and communication at the highest level.
          </p>
        </div>
      </div>
    </section>
  );
}
