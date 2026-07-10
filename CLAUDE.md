# CLAUDE.md

## Coding Workflow - human-AI pair-programming TDD

Follow an approach I'm calling "human-AI pair-programming TDD". It should follow the
classic test-driven development "red-green-refactor" cycle.

### Red phase

Before modifying any code, write a failing test first.
Ensure the test fails for the right reason: that the desired behaviour has not yet been implemented.
Then stop and let me verify and/or modify the test.

#### Details on the Red phase

1. A method or a component or any token not existing is not a valid reason for a test to fail. Creating a shell method or component should be part of setting up the test.
   The test is failing for the right reason when its implementation doesn't match the test
   expectations - not because a method does not exist, or because the typings are incorrect.

2. Write only one test at a time, and go through the entire cycle for that one test. Avoid writing multiple tests at a time and making them all pass by updating the implementation in one
   fell swoop.

### Green phase

Once I tell you to continue, make the minimum change to the production code that gets the test to pass.
Once again, wait for me to verify and/or modify the production code.

### Refactor phase

Once I tell you to continue, evaluate the quality of the production code file(s) and test file(s).
Is there anything that code be refactored to improve the code quality? If you have any refactor ideas,
propose them to me and let me decide if I want us to go ahead with any of the proposals.
This is the "refactor" phase.

Then I will manually commit the diff.

Follow this cycle when making changes or implementing new features.
If what we're working on is a larger or higher-level task, write out an overall plan to achieve our goal
before starting the TDD cycles. Save the plan in a Markdown file for future reference.

If, while developing, we realize we need to change the plan, we should not be afraid to do so.

## Testing principles

DO NOT mock child components or component internals in unit and integration tests.

## Coding Standards

### React Components

ALWAYS create a props type for a component rather than defining prop types inline.

Good

```
type MyButtonProps {
  title: string;
  disabled: boolean;
}

function MyButton({ title, disabled }: MyButtonProps) {
  return (
    <button disabled={disabled}>{title}</button>
  );
}
```

Bad

```
function MyButton({ title, disabled }: {
  title: string;
  disabled: boolean;
}) {
  return (
    <button disabled={disabled}>{title}</button>
  );
}
```

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
