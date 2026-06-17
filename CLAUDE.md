# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FBAR Max Balance Calculator — a Next.js 15 app that integrates with the YNAB (You Need A Budget) API via OAuth to calculate maximum account balances needed for FBAR (Report of Foreign Bank and Financial Accounts) filing. Users authenticate with YNAB, and the app fetches their accounts and transactions to compute yearly max balances.

## Commands

- `npm run dev` — Start dev server with Turbopack (http://localhost:3000)
- `npm run build` — Compile Tailwind CSS then build Next.js for production
- `npm start` — Start production server
- `npm test` — Run unit tests (Vitest, runs in watch mode)
- `npm run test:e2e` — Run end-to-end tests (Playwright, auto-starts dev server)
- `npm run design-system:test` — Run design system visual regression tests (Playwright against Storybook)
- `npm run typecheck` — TypeScript type checking (`tsc --noEmit`)
- `npm run lint` — ESLint
- `npm run storybook` — Start Storybook component explorer (http://localhost:6006)
- `npm run tailwind:watch` — Watch and compile Tailwind CSS (`css/input.css` → `css/output.css`)

CI runs typecheck → lint → test on PRs to main.

## Architecture

### Data Flow

1. User authenticates via YNAB OAuth → token stored in localStorage by `TokenManager`
2. `DefaultBudgetIdFetcher` retrieves the user's budget via `YnabService` → stored in `BudgetProvider` context
3. Components fetch accounts/transactions through `YnabService` (constructed with bearer token)
4. Pure calculation functions in `calculation-functions/` compute max balances and running balances
5. Results rendered through components using the `design-system/` component library

### Key Directories

- **`app/`** — Next.js App Router pages (home, account detail, help, settings, privacy policy)
- **`components/`** — Application-level React components (most are `"use client"`)
- **`contexts/`** — React Context + useReducer for state (`budgetContext`, `accountsContext`)
- **`services/ynab-service/`** — `YnabService` class wrapping the `ynab` SDK
- **`services/tokenManager.ts`** — OAuth token persistence in localStorage
- **`calculation-functions/`** — Pure functions: `getMaxBalances`, `getTransactionsWithBalances`
- **`utility-functions/`** — Data fetching helpers (`getAccounts`, `getTransactionsForAccount`, `getDefaultBudgetId`)
- **`design-system/`** — Reusable UI primitives (Button, Table, Typography, etc.) with Storybook stories and visual tests
- **`formatters/`** — Display formatting (e.g., `formatAmount` for currency)
- **`types/`** — TypeScript type definitions (`Account`, `TransactionWithBalance`, `MaxBalanceTransaction`)
- **`hooks/`** — Custom hooks (`useYnabOauthToken`, `useLocalStorage`)

### State Management

Uses React Context with reducer pattern (not Redux). `BudgetProvider` and `AccountsProvider` wrap the app in `Providers.tsx`. State is persisted to localStorage via the `useLocalStorage` hook.

### Testing

- **Unit tests**: Vitest + React Testing Library, co-located with components (`*.test.tsx`). Mocks in `__mocks__/`.
- **Visual regression tests**: Playwright screenshots against Storybook (`*.visual-tests.spec.ts` in `design-system/`)
- **E2E tests**: Playwright against the running app (`e2e/` directory)

### Environment Setup

Copy `.env.example` to `.env` and set `YNAB_OATH_CLIENT_ID` (obtain from https://app.ynab.com/oauth/applications/). `YNAB_OATH_REDIRECT_URI` defaults to `http://localhost:3000`.

### Tech Stack

Next.js 15 (App Router, Turbopack), React 19, TypeScript (strict), Tailwind CSS 4, `ynab` SDK, Vitest, Playwright, Storybook 8, Geist font.
