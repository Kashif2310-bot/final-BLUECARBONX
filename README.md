# BlueCarbon-X 🌊

A demo prototype for Smart India Hackathon showcasing carbon footprint tokenization using Web3 technologies.

## Overview

BlueCarbon-X is a React-based prototype demonstrating the complete flow of carbon footprint tokenization:
1. **Submit Project** - Upload and submit carbon footprint documentation
2. **AI Analysis** - Analyze data using AI models
3. **Tokenization** - Generate IPFS CID, mint NFT, and issue CFT tokens
4. **Community Wallet** - View token balance and transaction history
5. **Dashboard** - Complete overview of all projects and analytics

## Features

- ✨ Beautiful Web3-style UI with modern design
- 🎯 Complete flow simulation (no real blockchain/IPFS calls)
- 💾 React Context + LocalStorage for state management
- 🧭 React Router for multi-page navigation
- 📱 Fully responsive design
- ⚡ Fast and smooth animations
- 🎨 Professional UI/UX
- 📊 Built-in charts and analytics

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **React Context** - State management
- **LocalStorage** - Data persistence
- **CSS3** - Modern styling

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Project Structure

```
bluecarbon-x/
├── index.html
├── vite.config.js
├── src/
│   ├── main.jsx          # Entry point
│   ├── App.jsx           # Main app with routing
│   ├── App.css
│   ├── index.css
│   ├── context/
│   │   └── AppContext.jsx    # Global state management
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── UploadForm.jsx
│   │   ├── AnalysisReport.jsx
│   │   ├── WalletSummary.jsx
│   │   └── Charts.jsx
│   └── pages/
│       ├── Home.jsx              # Dashboard
│       ├── SubmitProject.jsx
│       ├── AIAnalysis.jsx
│       ├── CommunityWallet.jsx
│       └── ProjectDetails.jsx
├── package.json
└── README.md
```

## Pages

- **Home/Dashboard** (`/`) - Overview of all projects, stats, and analytics
- **Submit Project** (`/submit`) - Upload and submit new projects
- **AI Analysis** (`/analysis`) - View AI analysis results
- **Community Wallet** (`/wallet`) - View wallet balance and transactions
- **Project Details** (`/project/:id`) - Detailed view of a specific project

## Components

- **Navbar** - Navigation bar with active route highlighting
- **ProjectCard** - Card component for displaying project summaries
- **UploadForm** - Drag & drop file upload component
- **AnalysisReport** - Display AI analysis results
- **WalletSummary** - Wallet balance and recent transactions
- **Charts** - Bar charts and donut charts for analytics

## State Management

The app uses React Context API (`AppContext`) for global state management:
- Projects list and management
- Wallet data and transactions
- All data persists to localStorage automatically

## Usage

1. Start the application with `npm run dev`
2. Navigate to "Submit Project" to upload a file
3. Complete the project form and submit
4. View AI Analysis results
5. Check your wallet balance and transactions
6. View project details from the dashboard

## Notes

- This is a **demo-only prototype** - no real blockchain, IPFS, or AI integrations
- All data is stored locally in browser localStorage
- All transactions, CIDs, and hashes are simulated
- Perfect for hackathon demonstrations
- Clean, maintainable code structure ready for backend integration

## License

Created for Smart India Hackathon 2024

