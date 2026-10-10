# CricketCoach

CricketCoach is a mobile-first cricket learning website built with Next.js, TypeScript, and Tailwind CSS. It is designed to help cricket enthusiasts ask questions about rules, technique, match situations, and fielding decisions using a coach-like experience.

The first version focuses on a polished frontend experience and a knowledge-driven answer model that can later evolve into a full retrieval-augmented generation (RAG) assistant powered by free and open-source tools.

## Why this project exists

- Learn cricket through guided explanations
- Use official cricket knowledge such as MCC laws and open-source reference material
- Support multilingual coaching in English and major Indian languages plus German
- Link answers to relevant YouTube learning resources for visual explanations
- Keep the stack free, open, and scalable

## What is included right now

- Responsive landing page for cricket learners
- Coach-style question panel
- Language selector
- Topic filters for laws, batting, bowling, and fielding
- Sample cricket questions and associated explanations
- Source references and YouTube-style links to learning material

## Tech stack

- Next.js 16
- TypeScript
- React 19
- Tailwind CSS
- App Router architecture

## Planned production architecture

### Phase 1: Knowledge and retrieval

- Store cricket rules, notes, and explanations in a structured database or content layer
- Chunk text into small retrieval units
- Tag each chunk with categories, languages, and source URLs

### Phase 2: Open-source AI layer

- Run a local LLM with Ollama or a similar free tool
- Use open-source embeddings for semantic retrieval
- Retrieve the best cricket passages before generating an answer

### Phase 3: Multilingual experience

- Translate answers into English, Hindi, Bengali, Tamil, Telugu, and German
- Keep answer generation explainable and source-grounded
- Show source references alongside responses

### Phase 4: Video grounding

- Search relevant YouTube videos by cricket topic
- Embed direct links or searchable video references into the answer UI

### Phase 5: Public launch

- Deploy on Vercel or similar managed cloud platform
- Add monitoring, analytics, and quality checks
- Optimize for mobile performance and accessibility

## Prerequisites

You will need:

- Node.js 22 or later
- npm 10 or later
- a terminal with access to your project folder
- a browser to view the app locally

## Quick start

From the project folder, run:

```bash
cd /Users/sgokak/My-experiments/cricketcoach
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use 22
npm install
npm run dev -- --hostname 0.0.0.0
```

Then open this URL in your browser:

```text
http://localhost:3000
```

## Production build

To verify the app builds correctly:

```bash
cd /Users/sgokak/My-experiments/cricketcoach
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use 22
npm run build
```

To run the production build locally:

```bash
npm run start -- --hostname 0.0.0.0
```

## Share it with others

### 1) Share on the same local network

If the app is running on your Mac, others on the same Wi‑Fi can open the machine IP on port 3000.

To find your local IP:

```bash
ipconfig getifaddr en0
```

Then share something like:

```text
http://192.168.1.25:3000
```

### 2) Share publicly on the internet

The easiest public deployment route for this project is Vercel.

Recommended flow:

1. Push your project to a GitHub repository
2. Go to https://vercel.com
3. Import the GitHub repository
4. Add environment variables if needed
5. Deploy the app
6. Share the public URL that Vercel generates

### 3) Temporary web sharing

If you want a quick demo link without full deployment, use a tunnel tool such as ngrok:

```bash
ngrok http 3000
```

This creates a public URL that forwards to your local app for quick demos.

## Environment settings

Create a local environment file if you want to add future API or deployment settings:

```bash
cp .env.example .env.local
```

Example contents are shown in [.env.example](.env.example).

## Project structure

```text
cricketcoach/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       └── cricketKnowledge.ts
├── public/
├── .env.example
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
└── eslint.config.mjs
```

## Accessibility and usability notes

This project is intentionally designed with a mobile-first approach and a clear, readable layout.

For future improvement, focus on:

- larger tap targets on mobile
- readable color contrast for text
- keyboard support for all controls
- clear source citations in every answer
- language switching that is obvious and consistent

## Recommended next milestones

1. Add a real backend chat endpoint
2. Connect the app to a RAG knowledge base with cricket documents
3. Add Indian language answer translations and local testing
4. Add YouTube search and citation integration
5. Deploy to Vercel and share a public demo

## Best practices for this project

- Keep the frontend UI simple and fast
- Use open-source models where possible
- Ground every answer in documentation or references
- Make the user experience mobile-first and accessible
- Make source links visible to build trust
- Keep the architecture modular so features can evolve without breaking the app

## Notes for local development

One common issue is missing Node/NPM activation in the shell. If the command says `npm` or `npx` is not found, load nvm first:

```bash
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use 22
```

This project is intended to stay lightweight, explainable, and easy to expand as the cricket coaching product grows.
