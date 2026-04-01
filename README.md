# TalentScore

AI-powered resume analyzer to help you land more interviews.

## Features

- **Resume Analysis** — Upload PDF/DOCX/TXT and get instant match scores
- **AI Assistant** — Get tailored suggestions, bullet rewrites, and cover letters  
- **Job Tracker** — Save applications and track your job search progress
- **Firebase Auth** — Sign in with email or Google to sync your data

## Tech Stack

React + TypeScript + Vite + Tailwind CSS + Firebase

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Environment Variables

Create a `.env` file with your Firebase config:

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Deployment

```bash
npm run build
```

Deploy `dist/` folder to Vercel, Netlify, or any static host.

---

Built with ❤️ by [Abdeljalil](https://www.3bdeljalil.com/)
