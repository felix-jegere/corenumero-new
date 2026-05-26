// Gemini AI Integration Service
let currentYear = new Date().getFullYear();
const SYSTEM_PROMPT = `Role: 
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

import {GoogleGenAI } from '@google/genai'


export const getGeminiInsights = async (userName, numbers) => {
  

  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn('Gemini API key not configured. Returning placeholder insights.');
      return getPlaceholderInsight(userName, numbers);
    }

    const ai = new GoogleGenAI({ apiKey: apiKey})

    const prompt = `My name is ${userName} and my numerology numbers are ${JSON.stringify(numbers)}. Please provide a detailed numerology insight based on this information.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    })

    const data = response.text;
    
    const insight = data || '';

    return {
      success: true,
      insight: insight || getPlaceholderInsight(userName, numbers),
    };
  } catch (error) {
    console.error('Error generating insights:', error);
    return {
      success: false,
      insight: getPlaceholderInsight(userName, numbers),
    };
  }
};

const getPlaceholderInsight = (userName, numbers) => {
  return `
<div style="font-size: 16px; line-height: 1.8; color: #e0e0e0;">
  <h3 style="color: #d4af37; margin-bottom: 1rem;">Your Numerological Profile - ${userName}</h3>
  
  <p><strong>Frequency Overview:</strong> Your numerological signature carries a unique vibrational frequency. The convergence of your Life Path (${numbers.lifePath}), Expression (${numbers.expression}), Soul Urge (${numbers.soulUrge}), and Personality (${numbers.personality}) creates a distinctive archetypal blueprint.</p>
  
  <p><strong>Life Path ${numbers.lifePath} Essence:</strong> This path represents your primary life lesson and journey. Number ${numbers.lifePath} carries specific resonance and archetypal meaning in the Pythagorean system.</p>
  
  <p><strong>Your Expression Number ${numbers.expression}:</strong> This represents your natural talents and how you express yourself to the world. Combined with your Soul Urge (${numbers.soulUrge}), it reveals the alignment between your authentic inner desires and external manifestation.</p>
  
  <p><strong>Integration & Synthesis:</strong> The interplay between these core four numbers suggests how different aspects of your personality can work in harmony or require conscious balancing for optimal personal development.</p>
  
  <p><strong>Personal Growth Mantra:</strong> Embrace the vibrational alignment of your numbers and trust the cyclical patterns of numerological destiny.</p>
  
  <p style="margin-top: 2rem; opacity: 0.7;"><em>Note: To receive full Gemini AI-enhanced insights, configure your API key in the environment settings.</em></p>
</div>
  `;
};
