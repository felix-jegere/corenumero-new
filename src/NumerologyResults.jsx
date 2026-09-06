import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CYCLE_MEANINGS } from "./numerologyCalc";
import { buildShareHash } from "./shareLink";

export default function NumerologyResults({ results }) {
  const [copied, setCopied] = useState(false);

  if (!results) {
    return null;
  }

  const { name, dob, numbers, cycles, insight } = results;

  // Calculations can be null (e.g. a name with no vowels has no Soul Urge).
  const fmt = (n) => n ?? '—';

  const handleCopyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}${buildShareHash(name, dob)}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard API unavailable (permissions/insecure context) — fall back.
      window.prompt('Copy your reading link:', url);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <section className="results-section">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 5%" }}>
        <div className="results-header">
          <h2 className="gradient-text">Your Numerological Profile</h2>
          <p style={{ fontSize: "1.1rem", marginTop: "1rem" }}>
            {name}'s Core Numbers
          </p>
          {dob && (
            <button
              type="button"
              className="btn-secondary"
              onClick={handleCopyLink}
              style={{ marginTop: "1rem" }}
            >
              {copied ? "Link Copied!" : "Copy Share Link"}
            </button>
          )}
        </div>

        <div className="numbers-grid">
          <div className="number-card">
            <div className="number-value">{fmt(numbers.lifePath)}</div>
            <div className="number-label">Life Path</div>
            <p className="number-description">
              Your primary life lesson and journey
            </p>
          </div>

          <div className="number-card">
            <div className="number-value">{fmt(numbers.expression)}</div>
            <div className="number-label">Expression</div>
            <p className="number-description">Your natural talents and gifts</p>
          </div>

          <div className="number-card">
            <div className="number-value">{fmt(numbers.soulUrge)}</div>
            <div className="number-label">Soul Urge</div>
            <p className="number-description">
              Your inner desires and motivations
            </p>
          </div>

          <div className="number-card">
            <div className="number-value">{fmt(numbers.personality)}</div>
            <div className="number-label">Personality</div>
            <p className="number-description">How others perceive you</p>
          </div>
        </div>

        <div className="insight-section">
          <h3 style={{ color: "#d4af37", marginBottom: "1.5rem" }}>
            AI-Powered Insights
          </h3>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{insight}</ReactMarkdown>
        </div>

        {cycles && (
          <>
            <div className="results-header" style={{ marginTop: "3rem" }}>
              <h2 className="gradient-text" style={{ fontSize: "1.8rem" }}>Your Current Cycles</h2>
              <p style={{ fontSize: "1rem", marginTop: "0.75rem", opacity: 0.8 }}>
                Personal Year, Month &amp; Day for today
              </p>
            </div>

            <div className="numbers-grid">
              <div className="number-card">
                <div className="number-value">{fmt(cycles.personalYear)}</div>
                <div className="number-label">Personal Year</div>
                <p className="number-description">
                  {CYCLE_MEANINGS[cycles.personalYear] ?? ""}
                </p>
              </div>

              <div className="number-card">
                <div className="number-value">{fmt(cycles.personalMonth)}</div>
                <div className="number-label">Personal Month</div>
                <p className="number-description">
                  {CYCLE_MEANINGS[cycles.personalMonth] ?? ""}
                </p>
              </div>

              <div className="number-card">
                <div className="number-value">{fmt(cycles.personalDay)}</div>
                <div className="number-label">Personal Day</div>
                <p className="number-description">
                  {CYCLE_MEANINGS[cycles.personalDay] ?? ""}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
