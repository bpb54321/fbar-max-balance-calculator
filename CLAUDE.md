# CLAUDE.md

## Coding Standards

Always use TDD (test-driven development) when developing.

DO NOT mock child components or component internals in unit and integration tests.

## Project Overview

FBAR Max Balance Calculator — a Next.js 15 app that integrates with the YNAB (You Need A Budget) API via OAuth to calculate maximum account balances needed for FBAR (Report of Foreign Bank and Financial Accounts) filing. Users authenticate with YNAB, and the app fetches their accounts and transactions to compute yearly max balances.

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
- **`design-system/`** — Reusable UI primitives (Button, Table, Typography, etc.)
- **`formatters/`** — Display formatting (e.g., `formatAmount` for currency)
- **`types/`** — TypeScript type definitions (`Account`, `TransactionWithBalance`, `MaxBalanceTransaction`)
- **`hooks/`** — Custom hooks (`useYnabOauthToken`, `useLocalStorage`)

### State Management

Uses React Context with reducer pattern (not Redux). `BudgetProvider` and `AccountsProvider` wrap the app in `Providers.tsx`. State is persisted to localStorage via the `useLocalStorage` hook.

### Testing

- **Unit tests**: Vitest + React Testing Library, co-located with components (`*.test.tsx`). Mocks in `__mocks__/`.
- **E2E tests**: Playwright against the running app (`e2e/` directory)

### Environment Setup

Copy `.env.example` to `.env` and set `YNAB_OATH_CLIENT_ID` (obtain from https://app.ynab.com/oauth/applications/). `YNAB_OATH_REDIRECT_URI` defaults to `http://localhost:3000`.

### Tech Stack

Next.js 15 (App Router, Turbopack), React 19, TypeScript (strict), Tailwind CSS 4, `ynab` SDK, Vitest, Playwright, Geist font.
