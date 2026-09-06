import { useEffect, useRef, useState } from 'react';
import * as Sentry from '@sentry/react';

import { calculateCycleProfile, calculateNumerologyProfile } from './numerologyCalc';
import { getGeminiInsights } from './geminiService';
import { buildShareHash } from './shareLink';

const MAX_NAME_LENGTH = 100;

export default function NumerologyCalculator({
  onResults,
  initialName = '',
  initialDob = '',
  autoRun = false,
}) {
  const [formData, setFormData] = useState({
    fullName: initialName,
    dateOfBirth: initialDob,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const autoRan = useRef(false);

  // `type="date"` value is YYYY-MM-DD, so a plain string comparison works.
  const today = new Date().toISOString().slice(0, 10);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const runCalculation = async (rawName, dateOfBirth) => {
    const fullName = rawName.trim().replace(/\s+/g, ' ');

    if (!fullName || !dateOfBirth) {
      setError('Please enter both your name and date of birth');
      Sentry.logger.info('Validation error: Missing name or date of birth');
      return;
    }

    if (fullName.length > MAX_NAME_LENGTH) {
      setError(`Please keep your name under ${MAX_NAME_LENGTH} characters`);
      return;
    }

    if (dateOfBirth > today) {
      setError('Date of birth cannot be in the future');
      return;
    }

    setLoading(true);

    try {
      const numbers = calculateNumerologyProfile(fullName, dateOfBirth);

      if (Object.values(numbers).every((n) => n === null)) {
        setError('Could not calculate numbers from that input. Please check your name and date.');
        return;
      }

      const cycles = calculateCycleProfile(dateOfBirth);
      const aiInsight = await getGeminiInsights(fullName, numbers);

      // Persist a shareable link for this reading (no page jump).
      window.history.replaceState(null, '', buildShareHash(fullName, dateOfBirth));

      onResults({
        name: fullName,
        dob: dateOfBirth,
        numbers,
        cycles,
        insight: aiInsight.insight,
        aiSuccess: aiInsight.success,
      });

      setTimeout(() => {
        document.querySelector('.results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError('An error occurred. Please try again.');
      Sentry.captureException(err);
      Sentry.logger.error('Error during numerology calculation or AI insight retrieval', err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runCalculation(formData.fullName, formData.dateOfBirth);
  };

  // Auto-run once when opened via a shared link.
  useEffect(() => {
    if (autoRun && !autoRan.current && initialName && initialDob) {
      autoRan.current = true;
      runCalculation(initialName, initialDob);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              maxLength={MAX_NAME_LENGTH}
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
              max={today}
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
