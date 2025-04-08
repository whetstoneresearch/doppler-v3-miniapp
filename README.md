# Doppler V3 MiniApp

A React-based mini application built with Vite, TypeScript, and Tailwind CSS. This project provides an easy to get started with UI for interacting with the [Doppler liquidity bootstrapping protocol](https://docs.doppler.lol/).

## Tech Stack

- React 
- TypeScript
- Vite
- Tailwind CSS
- GraphQL
- Radix UI Components
- Wagmi
- Viem

## Prerequisites

- Node.js (LTS version recommended)
- Bun (for package management)
- Git

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/whetstoneresearch/doppler-v3-miniapp.git
cd doppler-v3-miniapp
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the required environment variables:
     - `VITE_INDEXER_GRAPHQL`: Your GraphQL endpoint URL

4. Start the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts
- `bun run dev` - Start the development server
- `bun run build` - Build the application for production
- `bun run preview` - Preview the production build locally
- `bun run lint` - Run the linter
- `bun run codegen` - Generate GraphQL types

## Project Structure

- `src/` - Source code directory
  - `components/` - Reusable UI components
  - `pages/` - Page components
  - `hooks/` - Custom React hooks
  - `utils/` - Utility functions
  - `types/` - TypeScript type definitions
  - `graphql/` - GraphQL queries and mutations

## License

[MIT](/LICENSE)