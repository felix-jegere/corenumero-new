# CoreNumero

An advanced numerology web application that blends ancient Pythagorean calculations with modern Gemini AI to provide deep insights into your life path, destiny, and personality.

## Features

- **Pythagorean Numerology**: Calculate Life Path, Expression, Soul Urge, and Personality numbers
- **Personal Cycles**: Personal Year, Month, and Day numbers for today
- **Compatibility Check**: Compare two profiles with a pairing score and AI synastry reading
- **Shareable Links**: Every reading gets a copyable URL (`#n=...&d=...`) that reloads the full reading
- **Gemini AI Integration**: Get intelligent, personalized insights powered by Google's Gemini AI
- **Modern UI**: Beautiful, responsive glassmorphism design with gradient accents
- **Master Numbers**: Support for master numbers (11, 22, 33) in Pythagorean system
- **Interactive Calculator**: Real-time numerology calculations

## Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/felix-jegere/CoreNumero.git
cd CoreNumero
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your Gemini API key to `.env`:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from: https://ai.google.dev/

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── App.jsx                    # Main app component (tabs: reading / compatibility)
├── App.css                    # Core styling
├── numerologyCalc.js          # Pythagorean numerology calculations + cycles + compatibility scoring
├── geminiService.js           # Gemini AI integration (lazy-loaded SDK)
├── shareLink.js               # Shareable reading-link encode/decode
├── NumerologyCalculator.jsx   # Form component for input
├── NumerologyResults.jsx      # Results display component (core numbers + cycles)
├── NumerologyCompatibility.jsx# Two-person compatibility check
├── NumerologyInfo.jsx         # Educational info cards
├── index.css                  # Base styles
└── main.jsx                   # Entry point
```

## How It Works

### Numerology Calculations

1. **Life Path Number**: Sum of all digits in your birth date (YYYY-MM-DD), reduced to a single digit or master number
2. **Expression Number**: Sum of all letters in your full name
3. **Soul Urge Number**: Sum of vowels in your name
4. **Personality Number**: Sum of consonants in your name

### AI Insights

The app sends your numerology profile to Google's Gemini API, which provides personalized interpretations based on the system prompt that guides it as a sophisticated numerology interpreter.

## The Nine Core Numbers

| Number | Archetype | Meaning |
|--------|-----------|---------|
| 1 | Leadership | Independent, ambitious, pioneering |
| 2 | Partnership | Diplomatic, cooperative, intuitive |
| 3 | Expression | Creative, communicative, artistic |
| 4 | Foundation | Practical, stable, grounded |
| 5 | Freedom | Dynamic, adventurous, versatile |
| 6 | Harmony | Nurturing, responsible, loving |
| 7 | Wisdom | Introspective, analytical, spiritual |
| 8 | Power | Ambitious, authoritative, material |
| 9 | Completion | Compassionate, humanitarian, wise |

### Master Numbers

- **11**: The Intuitive — heightened intuition and spiritual insight
- **22**: The Master Builder — mastery of practical and spiritual realms
- **33**: The Master Teacher — healing and communication at the highest level

## Technologies Used

- **React 19**: UI framework
- **Vite**: Fast build tool and dev server
- **Google Gemini API**: AI-powered insights
- **CSS3**: Modern styling with glassmorphism effects

## Environment Variables

```env
VITE_GEMINI_API_KEY=your_api_key_here    # Required for AI insights
VITE_APP_ENV=development                  # Optional: development or production
```

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

ISC

## Author

Jegere Felix

## Links

- Website: https://corenumero.vercel.app
- GitHub: https://github.com/felix-jegere/corenumero-new

---

Enjoy exploring your numbers with CoreNumero!
