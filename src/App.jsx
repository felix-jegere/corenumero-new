import { useState } from 'react';
import NumerologyCalculator from './NumerologyCalculator';
import NumerologyResults from './NumerologyResults';
import NumerologyInfo from './NumerologyInfo';
import './App.css';

function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo"><img src="/favicon.ico" alt="Logo" /> CoreNumero</div>
        <div className="nav-tagline">Pythagorean Numerology × Gemini AI</div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Unlock Your Numerological Destiny</h1>
          <p className="hero-description">
            Discover the hidden meanings in your name and birth date through ancient Pythagorean wisdom combined with modern AI insights.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <NumerologyCalculator onResults={setResults} />

      {/* Results */}
      {results && <NumerologyResults results={results} />}

      {/* Numerology Info */}
      <NumerologyInfo />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 CoreNumero. Blending ancient wisdom with modern AI.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;