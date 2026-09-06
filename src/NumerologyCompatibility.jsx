import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { calculateNumerologyProfile, scoreCompatibility } from './numerologyCalc';
import { getCompatibilityInsights } from './geminiService';

const MAX_NAME_LENGTH = 100;

const cleanName = (s) => s.trim().replace(/\s+/g, ' ');

export default function NumerologyCompatibility() {
  const [personA, setPersonA] = useState({ name: '', dob: '' });
  const [personB, setPersonB] = useState({ name: '', dob: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const today = new Date().toISOString().slice(0, 10);

  const bind = (person, setPerson) => (e) => {
    const { name, value } = e.target;
    setPerson((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameA = cleanName(personA.name);
    const nameB = cleanName(personB.name);

    if (!nameA || !personA.dob || !nameB || !personB.dob) {
      setError('Please enter both names and both birth dates');
      return;
    }

    if (nameA.length > MAX_NAME_LENGTH || nameB.length > MAX_NAME_LENGTH) {
      setError(`Please keep names under ${MAX_NAME_LENGTH} characters`);
      return;
    }

    if (personA.dob > today || personB.dob > today) {
      setError('Dates of birth cannot be in the future');
      return;
    }

    setLoading(true);

    try {
      const numbersA = calculateNumerologyProfile(nameA, personA.dob);
      const numbersB = calculateNumerologyProfile(nameB, personB.dob);
      const compat = scoreCompatibility(numbersA.lifePath, numbersB.lifePath);
      const aiInsight = await getCompatibilityInsights(nameA, numbersA, nameB, numbersB);

      setResult({
        nameA,
        nameB,
        numbersA,
        numbersB,
        compat,
        insight: aiInsight.insight,
      });

      setTimeout(() => {
        document.querySelector('.compat-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fmt = (n) => n ?? '—';

  const renderProfile = (name, numbers) => (
    <div className="number-card">
      <div className="number-label" style={{ fontSize: '1.2rem' }}>{name}</div>
      <p className="number-description">Life Path {fmt(numbers.lifePath)}</p>
      <p className="number-description">Expression {fmt(numbers.expression)}</p>
      <p className="number-description">Soul Urge {fmt(numbers.soulUrge)}</p>
      <p className="number-description">Personality {fmt(numbers.personality)}</p>
    </div>
  );

  return (
    <section className="calculator-section" style={{ flexDirection: 'column', alignItems: 'center' }}>
      <div className="glass-card" style={{ maxWidth: '800px' }}>
        <h2 className="gradient-text">Compatibility Check</h2>
        <p style={{ marginTop: '1rem', opacity: 0.8 }}>
          Compare two numerological profiles and discover your shared frequency
        </p>

        <form onSubmit={handleSubmit} className="num-form">
          <div className="compat-grid">
            <div>
              <h3 style={{ color: '#4facfe', marginBottom: '1rem' }}>Person 1</h3>
              <div className="input-group" style={{ marginBottom: '1rem' }}>
                <label htmlFor="nameA">Name</label>
                <input
                  type="text"
                  id="nameA"
                  name="name"
                  value={personA.name}
                  onChange={bind(personA, setPersonA)}
                  placeholder="First person's name"
                  maxLength={MAX_NAME_LENGTH}
                  disabled={loading}
                />
              </div>
              <div className="input-group">
                <label htmlFor="dobA">Date of Birth</label>
                <input
                  type="date"
                  id="dobA"
                  name="dob"
                  value={personA.dob}
                  onChange={bind(personA, setPersonA)}
                  max={today}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <h3 style={{ color: '#d4af37', marginBottom: '1rem' }}>Person 2</h3>
              <div className="input-group" style={{ marginBottom: '1rem' }}>
                <label htmlFor="nameB">Name</label>
                <input
                  type="text"
                  id="nameB"
                  name="name"
                  value={personB.name}
                  onChange={bind(personB, setPersonB)}
                  placeholder="Second person's name"
                  maxLength={MAX_NAME_LENGTH}
                  disabled={loading}
                />
              </div>
              <div className="input-group">
                <label htmlFor="dobB">Date of Birth</label>
                <input
                  type="date"
                  id="dobB"
                  name="dob"
                  value={personB.dob}
                  onChange={bind(personB, setPersonB)}
                  max={today}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Analyzing…' : 'Check Compatibility'}
          </button>
        </form>
      </div>

      {result && (
        <div className="compat-results" style={{ width: '100%', maxWidth: '1200px', marginTop: '3rem' }}>
          {result.compat && (
            <div className="score-banner">
              <div className="score-value">{result.compat.score}</div>
              <div className="score-label">{result.compat.label}</div>
              <p className="score-summary">{result.compat.summary}</p>
            </div>
          )}

          <div className="numbers-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {renderProfile(result.nameA, result.numbersA)}
            {renderProfile(result.nameB, result.numbersB)}
          </div>

          <div className="insight-section">
            <h3 style={{ color: '#d4af37', marginBottom: '1.5rem' }}>
              AI Synastry Reading
            </h3>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.insight}</ReactMarkdown>
          </div>
        </div>
      )}
    </section>
  );
}
