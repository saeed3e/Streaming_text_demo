# React Streaming Text Demo

A React application that demonstrates text streaming functionality by fetching posts from JSONPlaceholder API and displaying them character by character with a typewriter-like effect.

## Features

- Character-by-character text streaming
- Auto-scrolling message container
- Chunked data loading
- Light/dark mode support
- Responsive design
- Error handling
- Loading states

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the provided local server URL

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Locally preview the production build
- `npm run lint` - Run ESLint to check for code issues
- `npm run lint:fix` - Fix automatically fixable ESLint issues

## Project Structure

```
src/
├── components/         # React components
│   ├── Button.jsx
│   └── MessageContainer.jsx
├── hooks/             # Custom React hooks
│   ├── useAutoScroll.js
│   └── useStreamedText.js
├── services/          # API services
│   └── api.js
├── App.jsx           # Main application component
├── main.jsx         # Application entry point
└── style.css        # Global styles
```

## How It Works

1. Click the "Load data" button to start streaming posts
2. The application fetches posts from JSONPlaceholder API
3. Text is displayed character by character with a small delay
4. Content is loaded in chunks for better performance
5. Auto-scrolling keeps the latest content in view

## Technologies Used

- React
- Vite
- ESLint
- CSS3 with animations
- Fetch API
