import { useState } from 'react';
import { calculateNumerologyProfile } from './numerologyCalc';
import { getGeminiInsights } from './geminiService';

export default function NumerologyCalculator({ onResults }) {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.dateOfBirth) {
      setError('Please enter both your name and date of birth');
      return;
    }

    setLoading(true);

    try {
      const numbers = calculateNumerologyProfile(
        formData.fullName,
        formData.dateOfBirth
      );

      const aiInsight = await getGeminiInsights(formData.fullName, numbers);

      onResults({
        name: formData.fullName,
        numbers,
        insight: aiInsight.insight || aiInsight,
      });

      setTimeout(() => {
        document.querySelector('.results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="calculator-section">
      <div className="glass-card">
        <h2 className="gradient-text">Numerology Calculator</h2>
        <p style={{ marginTop: '1rem', opacity: 0.8 }}>
          Discover your life path through Pythagorean numerology
        </p>

        <form onSubmit={handleSubmit} className="num-form">
          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Calculating...' : 'Reveal My Numbers'}
          </button>
        </form>
      </div>
    </section>
  );
}
