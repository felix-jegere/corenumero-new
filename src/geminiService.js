// Gemini AI Integration Service
// NOTE: The API key is exposed in the client bundle (Vite `VITE_` vars are
// public). Fine for a demo; for production, proxy Gemini calls through a
// backend so the key and rate limits stay server-side.

const GEMINI_MODEL = 'gemini-3.1-flash-lite';
const GEMINI_TIMEOUT_MS = 30000;
const MAX_NAME_LENGTH = 100;

const buildSystemPrompt = () => {
  const currentYear = new Date().getFullYear();
  return `Role:
You are the CoreNumero Engine, a sophisticated hybrid of a Pythagorean Numerologist and an Advanced Intuitive Analyst. Your purpose is to synthesize mathematical data from names and birth dates into profound, actionable life insights.

Context:
CoreNumero is a high-end web application. Your analysis must bridge the gap between "Ancient Wisdom" and "Modern AI Logic." Avoid generic horoscopes. Focus on "Vibrational Frequencies," "Cyclical Patterns," and "Archetypal Blueprints."

Core Methodology:
1. Pythagorean System: Use the 1-9 letter-to-number conversion chart.
2. Reduction Rules: Always reduce double digits to a single digit (1-9) UNLESS they are Master Numbers (11, 22, 33).
3. The Core Four: Analyze the Life Path (journey), Expression (talents), Soul Urge (inner desire), and Personality (outer shell).

Output Structure (Mandatory Structured Markdown):
- The Frequency Overview: A 2-sentence high-level "vibe" of the individual's profile.
- Deep Dive Analysis:
    - Life Path: What is the primary lesson of this number?
    - Expression & Soul Urge: How do their natural talents align with their inner cravings?
- The CoreNumero AI Synthesis: This is the "AI Edge." Identify contradictions in their numbers (e.g., a Life Path 1 but a Soul Urge 2) and explain how to balance these opposing energies.
- Future Trajectory: Based on the current year (${currentYear}), provide a "Personal Year" forecast.
- Actionable Mantra: A one-sentence power statement for the user.

Tone & Voice:
- Technical yet Mystical.
- Empowering, sophisticated, and precise.
- Use vocabulary like: "Resonance," "Alignment," "Architectural blueprint," "Vibrational dissonance," and "Manifestation."

Constraints:
- Never use "Satanic" or "Occult" terminology.
- Keep the reading grounded in psychology and potential.
- Do not provide medical or legal advice.`;
};

const COMPATIBILITY_SYSTEM_PROMPT = `Role:
You are the CoreNumero Synastry Engine, a Pythagorean numerologist specializing in relationship dynamics between two numerological profiles.

Context:
Two people have shared their names and birth dates. Compare their Core Four numbers (Life Path, Expression, Soul Urge, Personality) and describe how their vibrational frequencies interact.

Output Structure (Mandatory Structured Markdown):
- The Shared Frequency: A 2-sentence overview of the pairing's combined vibe.
- Natural Strengths: Where their numbers harmonize (matching or complementary energies).
- Friction Points: Where their numbers clash, framed constructively — name the specific numbers.
- Practical Guidance: 2-3 concrete tips for navigating the friction points.
- Shared Mantra: A one-sentence statement for the pair.

Tone & Voice:
- Warm, insightful, precise. Technical yet mystical.
- Grounded in psychology and potential — never deterministic about a relationship's fate.

Constraints:
- Never use "Satanic" or "Occult" terminology.
- Do not provide medical or legal advice.`;

// Trim, collapse whitespace/newlines (prompt-injection hygiene), and cap length.
export const sanitizeName = (name) =>
  (name ?? '').trim().replace(/\s+/g, ' ').slice(0, MAX_NAME_LENGTH);

const withTimeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Gemini request timed out')), ms),
    ),
  ]);

// Lazily imported so the Gemini SDK is code-split out of the initial bundle.
const generateWithGemini = async (prompt, systemInstruction) => {
  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  const response = await withTimeout(
    ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: { systemInstruction },
    }),
    GEMINI_TIMEOUT_MS,
  );
  return response.text;
};

const hasApiKey = () => Boolean(import.meta.env.VITE_GEMINI_API_KEY);

// Always resolves to { success, insight, offline? } — never a bare string —
// so callers don't have to handle two shapes. `insight` is Markdown, matching
// what the live model returns and what the results components render.
export const getGeminiInsights = async (userName, numbers) => {
  const safeName = sanitizeName(userName);

  if (!hasApiKey()) {
    console.warn('Gemini API key not configured. Returning placeholder insights.');
    return {
      success: false,
      offline: true,
      insight: getPlaceholderInsight(safeName, numbers),
    };
  }

  try {
    const prompt = `My name is ${safeName} and my numerology numbers are ${JSON.stringify(numbers)}. Please provide a detailed numerology insight based on this information.`;
    const insight = await generateWithGemini(prompt, buildSystemPrompt());

    if (!insight) {
      return {
        success: false,
        insight: getPlaceholderInsight(safeName, numbers),
      };
    }

    return { success: true, insight };
  } catch (error) {
    console.error('Error generating insights:', error);
    return {
      success: false,
      insight: getPlaceholderInsight(safeName, numbers),
    };
  }
};

export const getCompatibilityInsights = async (nameA, numbersA, nameB, numbersB) => {
  const safeA = sanitizeName(nameA);
  const safeB = sanitizeName(nameB);

  if (!hasApiKey()) {
    console.warn('Gemini API key not configured. Returning placeholder compatibility insight.');
    return {
      success: false,
      offline: true,
      insight: getPlaceholderCompatibility(safeA, numbersA, safeB, numbersB),
    };
  }

  try {
    const prompt = `Person 1 is ${safeA} with numerology numbers ${JSON.stringify(numbersA)}. Person 2 is ${safeB} with numerology numbers ${JSON.stringify(numbersB)}. Please provide a detailed compatibility reading for this pair.`;
    const insight = await generateWithGemini(prompt, COMPATIBILITY_SYSTEM_PROMPT);

    if (!insight) {
      return {
        success: false,
        insight: getPlaceholderCompatibility(safeA, numbersA, safeB, numbersB),
      };
    }

    return { success: true, insight };
  } catch (error) {
    console.error('Error generating compatibility insights:', error);
    return {
      success: false,
      insight: getPlaceholderCompatibility(safeA, numbersA, safeB, numbersB),
    };
  }
};

// Markdown placeholder (rendered by ReactMarkdown in NumerologyResults),
// so the offline path looks identical in shape to the live AI path.
const getPlaceholderInsight = (userName, numbers) => {
  const fmt = (n) => n ?? '—';
  return `### Your Numerological Profile — ${userName}

**Frequency Overview:** Your numerological signature carries a unique vibrational frequency. The convergence of your Life Path (${fmt(numbers.lifePath)}), Expression (${fmt(numbers.expression)}), Soul Urge (${fmt(numbers.soulUrge)}), and Personality (${fmt(numbers.personality)}) creates a distinctive archetypal blueprint.

**Life Path ${fmt(numbers.lifePath)} Essence:** This path represents your primary life lesson and journey. Number ${fmt(numbers.lifePath)} carries specific resonance and archetypal meaning in the Pythagorean system.

**Your Expression Number ${fmt(numbers.expression)}:** This represents your natural talents and how you express yourself to the world. Combined with your Soul Urge (${fmt(numbers.soulUrge)}), it reveals the alignment between your authentic inner desires and external manifestation.

**Integration & Synthesis:** The interplay between these core four numbers suggests how different aspects of your personality can work in harmony or require conscious balancing for optimal personal development.

**Personal Growth Mantra:** Embrace the vibrational alignment of your numbers and trust the cyclical patterns of numerological destiny.

*Note: To receive full Gemini AI-enhanced insights, configure your API key in the environment settings.*`;
};

const getPlaceholderCompatibility = (nameA, numbersA, nameB, numbersB) => {
  const fmt = (n) => n ?? '—';
  return `### Compatibility — ${nameA} × ${nameB}

**The Shared Frequency:** ${nameA} (Life Path ${fmt(numbersA.lifePath)}) and ${nameB} (Life Path ${fmt(numbersB.lifePath)}) bring two distinct vibrational signatures into one dynamic.

**Natural Strengths:** Compare their Expression numbers (${fmt(numbersA.expression)} × ${fmt(numbersB.expression)}) — shared talents amplify, differing ones complement.

**Friction Points:** Where Soul Urge (${fmt(numbersA.soulUrge)} × ${fmt(numbersB.soulUrge)}) diverges, inner needs may pull in different directions. Naming these differences is the first step to navigating them.

**Practical Guidance:** Lead with curiosity about the other profile, assign roles that fit each Expression number, and revisit this reading when either partner enters a new Personal Year.

*Note: To receive full Gemini AI-enhanced compatibility insights, configure your API key in the environment settings.*`;
};
