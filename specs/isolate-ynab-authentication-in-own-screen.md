# Plan: Isolate YNAB Authentication in Its Own Screen

## Goal

When the app loads at `/`, check for a valid YNAB token. If missing, show a dedicated
authentication screen. If present, show the home page content as it currently exists.

## Components / Files

### New: `components/YnabAuthenticationScreen.tsx`
Client component that renders:
- A message asking the user to authenticate with YNAB
- The OAuth authorization link

Replaces the always-visible auth link on the current home page.

### New: `hooks/useAuth.ts`
Returns `{ isAuthenticated: boolean }`. On mount:
1. Checks `TokenManager.hasToken()` for initial state
2. Captures any token from the URL hash, saves via `TokenManager.setToken()`
3. Updates state so re-render transitions from auth screen → home content

Replaces `hooks/useYnabOauthToken.ts`.

### Modified: `services/tokenManager.ts`
Add `hasToken(): boolean` — returns `true` if a token exists in localStorage without
throwing.

### Modified: `app/page.tsx`
- Calls `useAuth()`
- If not authenticated: renders `YnabAuthenticationScreen`
- If authenticated: renders `DefaultBudgetIdFetcher`, `Accounts`, `Disclaimer`

### Deleted: `components/YnabAuthorization.tsx`
Its sole job (calling `useYnabOauthToken`) moves into `useAuth`.

## TDD Cycles

1. `TokenManager.hasToken()` — new method on TokenManager
2. `YnabAuthenticationScreen` — new component
3. `useAuth` hook — token capture + reactive auth state
4. Home page auth gate — conditional render based on `useAuth`

## Notes

- Auth screen stays at `/` (not a separate route) because YNAB OAuth redirects back to root.
- `useYnabOauthToken` is deleted once `useAuth` absorbs its logic.
