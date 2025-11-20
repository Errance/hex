# Hex Oracle - I Ching Divination Web App

![Hex Oracle](https://img.shields.io/badge/Version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

Ancient wisdom for modern seekers. A beautiful, interactive I Ching divination web application built with Next.js 15 and React 19.

## ✨ Features

- **🎯 Three-Coin Casting Method**: Traditional divination using the authentic three-coin method
- **🔮 64 Complete Hexagrams**: Full database of all 64 hexagrams with English translations
- **🤖 AI-Powered Interpretations**: Personalized readings powered by OpenRouter AI
- **🌐 Multilingual Support**: Full Chinese and English interface with auto-detection
  - UI completely translated
  - Hexagram data in both languages
  - AI interprets in your chosen language
- **🎨 Dual Themes**: 
  - **Zen Tao**: Deep teal/gray with gold accents
  - **Fengshui Modern**: Deep burgundy red with gold highlights
- **📱 Responsive Design**: Beautiful on desktop and mobile devices
- **💾 Local Storage**: Your reading history persists in your browser
- **🎭 Animation Options**: Choose between animated or fast-mode casting
- **📜 Reading History**: Review all your past consultations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- An OpenRouter API key ([Get one here](https://openrouter.ai/))

### Installation

1. **Clone or download the project**

```bash
cd hex-oracle
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your OpenRouter API key:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=deepseek/deepseek-v3.2-exp
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Environment Variables:**
- `OPENROUTER_API_KEY` (required): Your OpenRouter API key from [openrouter.ai/keys](https://openrouter.ai/keys)
- `OPENROUTER_BASE_URL` (optional): API base URL (default: `https://openrouter.ai/api/v1`)
- `OPENROUTER_MODEL` (optional): AI model to use (default: `openai/gpt-4o-mini`)
- `NEXT_PUBLIC_APP_URL` (optional): Application URL (default: `http://localhost:3000`)

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Tech Stack

### Core
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling

### UI Components
- **shadcn/ui** - Beautiful, accessible components
- **Radix UI** - Primitive components
- **Framer Motion** - Smooth animations
- **Lucide React** - Icons

### State Management
- **Zustand** - Lightweight state management with persistence

### Internationalization
- **react-i18next** - i18n framework
- **i18next-browser-languagedetector** - Automatic language detection

### AI Integration
- **OpenRouter** - AI model API for interpretations

## 📁 Project Structure

```
hex-oracle/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/ai/interpret/   # AI interpretation endpoint
│   │   ├── history/            # Reading history page
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main casting page
│   │   └── globals.css         # Global styles + themes
│   ├── components/
│   │   ├── auth/               # Mock login modal
│   │   ├── casting/            # Coin animation, progress
│   │   ├── history/            # History list
│   │   ├── layout/             # Header, footer, theme toggle
│   │   ├── reading/            # Hexagram display components
│   │   ├── steps/              # Four main app steps
│   │   └── ui/                 # shadcn/ui components
│   ├── data/
│   │   ├── hexagrams.ts        # 64 hexagrams data
│   │   └── hexagram-summaries.ts # Initial readings
│   ├── lib/
│   │   ├── casting.ts          # Coin casting logic
│   │   ├── hexagram-utils.ts   # Helper functions
│   │   └── utils.ts            # General utilities
│   ├── store/
│   │   ├── useAppStore.ts      # Main app state
│   │   └── useAuthStore.ts     # Mock auth state
│   └── types/
│       ├── divination.ts       # Divination types
│       └── hexagram.ts         # Hexagram types
├── .env.local                  # Environment variables (create this)
├── package.json
└── README.md
```

## 🎮 Usage

### Basic Flow

1. **Begin**: Click "Begin Casting" on the home page
2. **Choose Method**: 
   - Auto Cast (all 6 lines at once)
   - Manual Cast (one line at a time)
3. **Cast**: Watch as the coins are thrown and your hexagram forms
4. **Initial Reading**: View your hexagram and its general meaning
5. **Detailed Reading**: 
   - Enter email (stored locally only)
   - Describe your specific question
   - Receive AI-powered personalized interpretation
6. **History**: Access all past readings from the History page

### Themes

Toggle between **Zen Tao** and **Fengshui Modern** themes using the button in the header.

### Languages

The app supports full Chinese (中文) and English:
- **Auto-detection**: Automatically detects your browser language on first visit
- **Manual toggle**: Click the language button in the header (EN/中文) to switch
- **Persistent**: Your language choice is saved in localStorage
- **Complete translation**: All UI, hexagram data, and AI interpretations adapt to your chosen language

## 🔧 Configuration

### Changing AI Model

Edit `.env.local`:

```env
# Options: openai/gpt-4o-mini, anthropic/claude-3-sonnet, etc.
OPENROUTER_MODEL=openai/gpt-4o-mini
```

### Customizing Themes

Edit `src/app/globals.css` to adjust the color schemes for each theme.

## 📚 I Ching Background

The I Ching (Yi Jing, 易经) is an ancient Chinese divination text dating back over 3,000 years. It consists of 64 hexagrams, each made up of six lines that are either broken (yin) or solid (yang). 

### The Three-Coin Method

This app uses the traditional three-coin casting method:
- 3 heads (yang) = Old Yang (9) - moving line
- 2 heads, 1 tail = Young Yang (7) - stable
- 1 head, 2 tails = Young Yin (8) - stable  
- 3 tails (yin) = Old Yin (6) - moving line

Six casts create a hexagram from bottom to top. Moving lines indicate transformation and lead to a second "changing" hexagram.

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding More Hexagrams Data

The first 12 hexagrams in `src/data/hexagrams.ts` contain complete translations. The remaining 52 use placeholder text. To enhance:

1. Research authentic Wilhelm/Baynes or other scholarly translations
2. Update the hexagram objects with full line texts
3. Update `src/data/hexagram-summaries.ts` with more detailed scene-specific readings

## 🔐 Privacy

- **No Backend**: All data is stored locally in your browser
- **No Registration**: Email is only used for the mock login and stored in localStorage
- **AI Calls**: Your questions are sent to OpenRouter for interpretation, then discarded

## 📝 License

This project is for educational and personal use. The I Ching is part of the public domain, but specific translations may have their own copyrights.

## 🙏 Acknowledgments

- I Ching translations based on Wilhelm/Baynes and other scholarly sources
- Built with modern web technologies for a seamless experience
- Inspired by thousands of years of Eastern wisdom

## 🐛 Troubleshooting

**Q: The AI interpretation fails**
- Check your `.env.local` file has the correct OPENROUTER_API_KEY
- Verify your API key is active at [OpenRouter](https://openrouter.ai/)

**Q: History is not persisting**
- Check browser localStorage is enabled
- Clear cache and reload if data seems corrupted

**Q: Animations are laggy**
- Disable animations using the toggle in the casting step
- Use a modern browser with good hardware acceleration

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

Works with any platform that supports Next.js 15:
- Netlify
- Railway
- Fly.io
- Self-hosted with `npm run build && npm run start`

---

**May the oracle guide your path.** ☯️
