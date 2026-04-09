# 3D Text Prompt Builder

A production-ready premium SaaS-style web application for generating professional AI prompts for 3D text generation.

## Features

- **Text Input** - Max 20 characters with live counter
- **Font Styles** - 8 unique options (Cinematic, Chrome, Pixel, Game, Minecraft, Neon, Gothic, Sci-Fi)
- **Elemental Styles** - 12 element options with dynamic environment mapping
- **Lighting Modes** - 6 cinematic lighting options
- **Camera Angles** - 6 professional camera perspectives
- **Aspect Ratios** - 4 formats (1:1, 4:5, 16:9, 9:16)
- **Quality Boosters** - 10 multi-select enhancement options (8K, Photorealistic, DOF, etc.)

## Tech Stack

- Frontend: HTML5, TailwindCSS, Vanilla JavaScript
- Backend: Node.js (Vercel Serverless Functions)
- No frameworks, no database

## Project Structure

```
prompt-builder/
├── index.html          # Main UI (2-column glassmorphism layout)
├── styles.css          # Premium dark theme with glassmorphism
├── app.js              # All-in-one JavaScript logic
├── api/
│   └── generate.js     # Serverless API endpoint
├── data/
│   └── options.js       # Configuration data
├── utils/
│   ├── helpers.js       # Utility functions
│   └── clipboard.js     # Clipboard functionality
├── components/
│   ├── state.js         # State management
│   ├── ui.js           # UI components
│   ├── events.js       # Event handlers
│   └── renderer.js     # UI renderer
├── package.json
├── vercel.json
└── README.md
```

## Quick Start

### Run Locally

```bash
cd prompt-builder
npx serve .
```

Then open http://localhost:3000

### Deploy to Vercel

```bash
npm install -g vercel
vercel deploy
```

Or push to GitHub and connect to Vercel.

## API Usage

**Endpoint:** `/api/generate`

**Method:** POST

**Request Body:**
```json
{
  "text": "HELLO",
  "font": "cinematic-bold",
  "element": "fire",
  "environment": "Volcanic Field",
  "lighting": "golden-hour",
  "camera": "front-on",
  "aspectRatio": "1:1",
  "boosters": ["8k-render", "photorealistic"]
}
```

**Response:**
```json
{
  "success": true,
  "prompt": "A stunning 3D rendered text..."
}
```

## UI Features

- **Premium Dark Theme** - Deep navy background with purple/blue gradients
- **Glassmorphism Cards** - Frosted glass effect with blur
- **Smooth Animations** - Hover effects, transitions, fade-ins
- **2-Column Grid Layout** - Controls on left, output on right
- **Active Selection Glow** - Purple glow on selected options
- **Loading Animation** - Spinner during generation
- **Copy to Clipboard** - Toast notification on copy
- **Platform Buttons** - Quick links to ChatGPT, Gemini, Midjourney, Ideogram
- **Fully Responsive** - Works on all screen sizes

## License

MIT