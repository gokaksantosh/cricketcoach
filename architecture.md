# Architecture overview for CricketCoach

## Purpose

CricketCoach is a cricket coaching and learning platform designed to answer cricket questions with a coach-like experience. The project currently demonstrates a working frontend and a grounded answer flow based on a local knowledge base.

The long-term goal is to evolve this into a retrieval-augmented cricket assistant that pulls from open-source cricket documents, official laws, and curated video references before answering questions.

## Core goals

- Build a clean, responsive cricket learning app
- Ground answers in cricket knowledge instead of unsupported guesses
- Support multilingual responses across English and major Indian languages plus German
- Show users relevant source links and YouTube references
- Keep the stack open-source friendly, scalable, and simple to extend

## Current system architecture

### 1. Frontend layer

The frontend is built using:

- Next.js App Router
- TypeScript
- React
- Tailwind CSS

It is structured as a single-page application experience with:

- landing section
- feature highlights
- coach question panel
- conversation area
- knowledge/resource cards

The UI is intentionally mobile-first and emphasizes readability, quick learning, and confidence-building for cricket enthusiasts.

### 2. Knowledge layer

The knowledge layer is defined in [src/lib/cricketKnowledge.ts](src/lib/cricketKnowledge.ts).

It contains:

- supported languages
- cricket topics and categories
- sample questions and keywords
- multilingual answer definitions
- source links
- YouTube video references

This layer is deliberately simple and easy to expand. It provides the basis for a future document-backed retrieval system.

### 3. API layer

The API route is implemented in [src/app/api/coach/route.ts](src/app/api/coach/route.ts).

It receives a question and language from the frontend and responds with:

- answer text
- matched topic category
- source references
- YouTube video links
- matched entry metadata

The current lookup logic is based on a keyword-matching strategy. It is accurate for an MVP but is intentionally designed to be replaced with a retrieval-based system later.

### 4. User flow

The user flow looks like this:

1. User selects language and optional topic
2. User asks a cricket question manually or via sample prompts
3. Frontend sends request to /api/coach
4. Coach route identifies relevant cricket knowledge entry
5. Response is shown in the chat panel with sources and video links
6. The user learns from the answer and can continue asking follow-up questions

## Data model

The main knowledge object is a structured cricket entry. It includes:

- id
- category
- question
- keywords
- answer per language
- sources
- video links

This model is easy to extend for more topics, more languages, and more source citations.

## Design principles

### Mobile-first

The app is designed for a phone-first user experience because most cricket fans will consume content on mobile screens.

### Explainability

Every answer is tied to a source or a video reference so the user can trust the learning path.

### Extensibility

The architecture is intentionally modular so it can evolve from a static content layer into a document retrieval and AI chat system.

### Open-source friendliness

The project is designed to avoid paid infrastructure in the initial stages. It can work with local open-source tooling and eventually move to public hosting.

## Future architecture plan

### Phase A: Local retrieval layer

Add a vector store such as Qdrant or pgvector and index:

- MCC law summaries
- cricket coaching notes
- batting and bowling technique references
- fielding and match situational content

### Phase B: LLM integration

Use an open-source model through Ollama or a similar tool to:

- retrieve relevant cricket passages
- ground the answer in document evidence
- produce a concise and explainable response

### Phase C: Multilingual improvements

Add translation-aware flows for:

- English
- Hindi
- Bengali
- Tamil
- Telugu
- German

### Phase D: Video retrieval and citation layer

Integrate a system that:

- retrieves relevant YouTube videos by topic
- links them to the answer response
- lets users click into visual explanations

### Phase E: Production operations

When the project is mature, add:

- analytics
- rate limiting
- logging and monitoring
- answer quality review
- CI/CD pipeline for deployment

## Known constraints in the current version

- Answers are knowledge-mapped rather than fully AI-retrieved
- Source retrieval is local and structured rather than semantic
- Multilingual content is static and not generated dynamically yet
- The app is a strong MVP, not yet a full production-grade cricket intelligence system

## Why this is a good foundation

The project already has the correct shape for a scalable product:

- small, modular, maintainable frontend
- API-first design
- structured data model
- source-linked answers
- mobile-ready design
- easy path to open-source AI integration

This makes it simple to evolve from an experiment into a more advanced cricket knowledge assistant in a disciplined way.
