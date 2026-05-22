# CoreNumero - Setup & Getting Started

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies
```bash
cd corenumero-new
npm install
```

### 2. Get Gemini API Key
1. Visit: https://ai.google.dev/
2. Create or sign in to your Google account
3. Create an API key
4. Copy the key

### 3. Configure Environment
```bash
# Create .env file
cp .env.example .env

# Edit .env and add your API key:
# VITE_GEMINI_API_KEY=your_key_here
```

### 4. Run Development Server
```bash
npm run dev
```

The app will start at: http://localhost:5173

## 📚 Features

### Numerology Calculator
- Enter your full name and date of birth
- System calculates:
  - **Life Path**: Your primary life lesson
  - **Expression**: Your natural talents
  - **Soul Urge**: Your inner desires
  - **Personality**: How others see you

### AI-Powered Insights
- Gemini AI provides personalized numerology interpretations
- If API key not configured, shows template insights
- Sophisticated system prompt for accurate readings

### Educational Info
- Learn about the 9 core archetypal numbers
- Master numbers (11, 22, 33) explanation
- Pythagorean numerology system overview

## 🛠️ Development Commands

```bash
# Start dev server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📁 Project Structure

```
src/
├── App.jsx                  - Main app component
├── App.css                  - Core styling
├── NumerologyCalculator.jsx - Input form
├── NumerologyResults.jsx    - Results display
├── NumerologyInfo.jsx       - Educational cards
├── numerologyCalc.js        - Pythagorean calculations
├── geminiService.js         - Gemini AI integration
└── main.jsx                 - App entry point
```

## ⚙️ Environment Variables

```env
# Required for AI insights
VITE_GEMINI_API_KEY=your_api_key_here

# Optional
VITE_APP_ENV=development
```

## 🔐 Security Notes

- `.env` file is in `.gitignore` - never commit API keys
- Use `.env.example` as a template for new setups
- API keys should be kept private

## 🎨 Customization

### Colors (in src/App.css)
```css
:root {
  --bg-dark: #0a0a0c;
  --accent-gold: #d4af37;
  --accent-blue: #4facfe;
  --text-main: #e0e0e0;
}
```

### System Prompt (in src/geminiService.js)
Edit the `SYSTEM_PROMPT` variable to customize AI behavior

## 🐛 Troubleshooting

### App doesn't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### API key not working
- Verify VITE_GEMINI_API_KEY is correct in .env
- Ensure API is enabled at: https://ai.google.dev/
- Restart dev server after changing .env

### Build fails
```bash
npm run lint
# Fix any ESLint errors
npm run build
```

## 📦 Dependencies

- **react**: UI framework
- **react-dom**: React DOM rendering
- **@google/genai**: Gemini AI SDK
- **lucide-react**: Icon library
- **vite**: Build tool
- **eslint**: Code quality

## 🚢 Deployment

### Vercel
```bash
# Push to GitHub repo
git push origin main

# Connect to Vercel at: https://vercel.com
# Add environment variables in Vercel dashboard
# - VITE_GEMINI_API_KEY
```

### Other Platforms
1. Run `npm run build`
2. Deploy the `dist/` folder
3. Add environment variables to your hosting provider

## 📖 Documentation

- [React Docs](https://react.dev)
- [Vite Docs](https://vite.dev)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Numerology System](README.md)

## 💡 Tips

1. The app works without API key - shows template insights
2. Master numbers (11, 22, 33) are not reduced
3. Soul Urge uses vowels: A, E, I, O, U
4. Personality uses consonants (all other letters)
5. Life Path uses complete birth date in YYYY-MM-DD format

## 🤝 Contributing

Feel free to submit issues or pull requests on GitHub.

## 📄 License

ISC License - See LICENSE file

---

**Ready to explore numerology?** Start with `npm run dev`! 🔢✨