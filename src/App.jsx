import { Suspense, lazy, useState } from 'react';
import NumerologyCalculator from './NumerologyCalculator';
import NumerologyInfo from './NumerologyInfo';
import { parseSharedInput } from './shareLink';
import './App.css';

// Code-split: markdown + AI-heavy views only load when needed.
const NumerologyResults = lazy(() => import('./NumerologyResults'));
const NumerologyCompatibility = lazy(() => import('./NumerologyCompatibility'));

const currentYear = new Date().getFullYear();

function App() {
  const [results, setResults] = useState(null);
  const [tab, setTab] = useState('reading');
  const [shared] = useState(() => parseSharedInput());

  const hasSharedLink = Boolean(shared.name && shared.dob);

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

      {/* Tabs */}
      <div className="tabs">
        <button
          type="button"
          className={tab === 'reading' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setTab('reading')}
        >
          My Reading
        </button>
        <button
          type="button"
          className={tab === 'compatibility' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setTab('compatibility')}
        >
          Compatibility
        </button>
      </div>

      {tab === 'reading' ? (
        <>
          {/* Calculator */}
          <NumerologyCalculator
            onResults={setResults}
            initialName={shared.name}
            initialDob={shared.dob}
            autoRun={hasSharedLink}
          />

          {/* Results */}
          {results && (
            <Suspense fallback={<div className="results-section"><p style={{ textAlign: 'center' }}>Loading your profile…</p></div>}>
              <NumerologyResults results={results} />
            </Suspense>
          )}
        </>
      ) : (
        <Suspense fallback={<div className="results-section"><p style={{ textAlign: 'center' }}>Loading compatibility check…</p></div>}>
          <NumerologyCompatibility />
        </Suspense>
      )}

      {/* Numerology Info */}
      <NumerologyInfo />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {currentYear} CoreNumero. Blending ancient wisdom with modern AI.</p>
          <p>With ❤️ by <a href="https://github.com/felix-jegere/" target='_blank' rel='noreferrer' style={{color: 'inherit'}}>Jegere Felix</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
