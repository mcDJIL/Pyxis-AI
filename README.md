# Business AI Assistant

A comprehensive AI-powered business analysis platform built with React and Vite. Generate business insights, strategic roadmaps, SWOT analysis, and more using AI.

## Features

- **Business Analysis**: Analyze and evaluate business ideas with detailed insights
- **Strategic Roadmap Generation**: Create comprehensive roadmaps for business growth
- **SWOT Analysis**: Generate Strengths, Weaknesses, Opportunities, and Threats analysis
- **Executive Summary**: Get concise business summaries and key takeaways
- **Prospect Generation**: Identify and analyze business prospects
- **Idea Expansion**: Expand on initial business concepts with AI assistance
- **History Management**: Track and review past analyses
- **Dashboard**: Centralized view of all business metrics and analysis

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: CSS with responsive design
- **Build Tool**: Vite
- **Backend**: Node.js with Express
- **AI Integration**: Integrated AI services for analysis and generation

## Project Structure

```
src/
├── Components/
│   ├── features/          # Feature components (SWOT, Roadmap, etc.)
│   └── layout/            # Layout and page structure
├── Pages/                 # Application pages
├── Services/              # API and AI service integrations
├── Store/                 # State management
├── Constants/             # App constants and data
├── Lib/                   # Utility functions
└── Backend/               # Backend server and services
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd src/Backend
npm install
cd ../..
```

### Running the Application

**Development Mode:**
```bash
npm run dev
```

This starts both the frontend (on localhost:5173) and backend server.

**Build for Production:**
```bash
npm run build
```

## Available Pages

- **Dashboard**: Main interface with analysis overview
- **Home**: Landing page with quick start options
- **History**: View previous analyses and results
- **Settings**: Configure application preferences

## Backend Services

- **analyzeBusiness.js**: Analyze business ideas and concepts
- **generateRoadmap.js**: Create strategic business roadmaps
- **generateSwot.js**: Generate SWOT analysis reports
- **generateSummary.js**: Create executive summaries
- **generateProspect.js**: Identify business prospects
- **expandIdea.js**: Expand and develop business ideas

## License

This project is proprietary and confidential.
