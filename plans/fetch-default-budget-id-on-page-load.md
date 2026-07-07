# Plan: Fetch defaultBudgetId on internal page load, drop localStorage persistence

## Goal

When a user loads any internal page (routes under `app/(with-nav)/`) with a valid
YNAB token, fetch the `defaultBudgetId` and store it in the budget context.
Remove persistence of the budget state to localStorage, since a stored id can be
stale/corrupted and the id is cheap to fetch fresh.

## Design

`NavLayout` (`app/(with-nav)/layout.tsx`) already checks token validity on mount
and redirects to `/` when the token is missing or invalid. It wraps every
internal page and lives inside `Providers`, so it can use `useBudgetDispatch`.
Because a Next.js layout persists across client-side navigations, its effect
runs once per full page load — exactly the trigger we want.

1. **NavLayout fetches the budget id.** After `checkTokenValidity` succeeds,
   call `getDefaultBudgetId()` and dispatch `DefaultBudgetIdSet` to the budget
   context. No fetch when the token is missing/invalid (we redirect instead).
2. **Remove localStorage from `budgetContext`.** Delete the `useLocalStorage`
   call, the `StateLoadedFromStorage` action, and `BUDGET_LOCAL_STORAGE_KEY`.
   Context state starts empty and is filled by the layout's fetch.
3. **Simplify `DefaultBudgetIdFetcher`.** Its fetch becomes redundant once the
   layout fetches. Proposal: make it a display-only component that reads
   `defaultBudgetId` from context (possibly renamed), or delete it if the
   "Using budget id: …" line on the home page isn't worth keeping.
   **Decision point for Brian.**
   - Open question: the fetcher currently renders the "There was an error
     retrieving information from YNAB" message. After this change, a fetch
     failure in the layout most likely means an invalid token, which already
     redirects to `/`. Do we still need a visible error state, and if so where?

## TDD cycles

1. `NavLayout` fetches the default budget id and stores it in the budget
   context when the token is valid.
   (Existing `NavLayout` tests will need a `BudgetProvider` wrapper once the
   layout uses `useBudgetDispatch` — part of the Green phase.)
2. `NavLayout` does not fetch the budget id when the token is invalid.
3. `BudgetProvider` no longer restores state from localStorage (seed a stale
   `"budgets"` entry, assert it is ignored) and no longer writes to it.
4. `DefaultBudgetIdFetcher` no longer fetches — per the decision made on the
   design point above.

## Status

- [ ] Cycle 1
- [ ] Cycle 2
- [ ] Cycle 3
- [ ] Cycle 4
