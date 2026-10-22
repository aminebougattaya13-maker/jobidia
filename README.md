# Jobidia

Jobidia is a modern AI assistant landing page and chat interface inspired by premium AI products.

## Features

- AI landing page hero section
- Chat interface for user conversations
- Optional OpenAI-compatible API integration
- Fallback responses when no API key is configured
- Ready for Next.js deployment

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000

## Environment variables

Create a `.env.local` file with:

```bash
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4o-mini
```

If no API key is set, the app will still run and return built-in demo responses.

## Production build

```bash
npm run build
npm run start
```
