# FBAR Max Balance Calculator - Comprehensive Test Plan

## Application Overview

The FBAR Max Balance Calculator is a Next.js 15 application that integrates with the YNAB (You Need A Budget) API via OAuth to help users calculate their maximum account balances for FBAR (Report of Foreign Bank and Financial Accounts) tax filing. Users authenticate with YNAB using OAuth implicit flow, which stores an access token in localStorage. Once authenticated, the app allows users to: load their YNAB accounts on the Settings page and select which accounts to include in analysis, navigate to an account's detail page to load and display all transactions with running balances, view a Max Balance Transactions table showing the highest-balance transaction per year, and see a summary Accounts table on the home page listing max balances per year across all selected accounts. Application state (accounts, transactions, max balances, and budgetState) is persisted to localStorage so data survives page refreshes. The app has four navigable pages: Home (/), Settings (/settings), Help (/help), and Privacy Policy (/privacy-policy), plus a dynamic Account Detail page (/account/[id]).

## Test Scenarios

### 1. Navigation and Page Structure

**Seed:** `e2e/seed.spec.ts`

#### 1.2. Home page displays correct structure when unauthenticated

**File:** `e2e/navigation/home-page-unauthenticated.spec.ts`

**Steps:**

1. Ensure localStorage is clear (no 'ynabAccessToken' key present). Navigate to http://localhost:3000/


    - expect: The page title is 'FBAR Max Balance Calculator'

2. Observe the main content area


    - expect: An 'Authorize With YNAB' link is visible
    - expect: The 'Authorize With YNAB' link href contains 'https://app.ynab.com/oauth/authorize' with client_id, redirect_uri, and response_type=token query parameters
    - expect: An error message is shown: 'There was an error retrieving information from YNAB. Please click on the preceding link to reauthorize the connection to YNAB.'
    - expect: A heading 'Accounts' (h1) is present
    - expect: No accounts table is rendered (the AccountTable component returns null when there are no selected accounts)
    - expect: A 'Disclaimer' section (h2) is present mentioning YNAB trademark information
    - expect: A link to 'https://www.ynab.com' is present within the disclaimer

#### 1.3. Help page displays all instructional content

**File:** `e2e/navigation/help-page.spec.ts`

**Steps:**

1. Navigate to http://localhost:3000/help


    - expect: The page shows a heading 'Help Page' (h1)

2. Observe the 'How to Use' section


    - expect: A heading 'How to Use' (h2) is present
    - expect: A numbered or bulleted list exists with at least 9 items describing the workflow
    - expect: The list mentions clicking 'Authorize With YNAB' to connect a YNAB account
    - expect: The list mentions visiting the Settings page and clicking 'Reload accounts'
    - expect: The list mentions checking accounts to include in analysis
    - expect: The list mentions clicking on an account name to go to the detail page
    - expect: The list mentions clicking 'Reload transactions' button on the detail page
    - expect: The list mentions that a max balances table and all transactions are displayed on the account detail page
    - expect: The list mentions returning to the Home page to see the summary table

3. Observe the 'Data Storage' section


    - expect: A heading 'Data Storage' (h2) is present
    - expect: Text explains that account and transaction data is stored locally in the browser

4. Observe the 'Refreshing / Reloading Data' section


    - expect: A heading 'Refreshing / Reloading Data' (h2) is present
    - expect: Text explains how to reload transactions using the 'Reload transactions' button

#### 1.4. Privacy Policy page displays correct content

**File:** `e2e/navigation/privacy-policy-page.spec.ts`

**Steps:**

1. Navigate to http://localhost:3000/privacy-policy


    - expect: The page shows a heading 'Privacy Policy' (h1)

2. Observe the page content


    - expect: A heading 'How your data will be handled, stored, secured' (h2) is present
    - expect: Text states that all data obtained via the YNAB API will be stored in local storage
    - expect: Text explains that data can be deleted by clearing local storage
    - expect: A heading 'Third parties' (h2) is present
    - expect: Text states that data will not be passed to any third party

### 2. OAuth Authentication

**Seed:** `e2e/seed.spec.ts`

#### 2.1. Authorize With YNAB link has correct OAuth URL

**File:** `e2e/auth/oauth-link.spec.ts`

**Steps:**

1. Navigate to http://localhost:3000/ with no access token in localStorage


    - expect: The 'Authorize With YNAB' link is visible

2. Inspect the href attribute of the 'Authorize With YNAB' link


    - expect: The href starts with 'https://app.ynab.com/oauth/authorize'
    - expect: The URL includes a 'client_id' query parameter
    - expect: The URL includes 'redirect_uri=http://localhost:3000'
    - expect: The URL includes 'response_type=token'

#### 2.2. OAuth token is extracted from URL hash and stored in localStorage after redirect

**File:** `e2e/auth/token-extraction.spec.ts`

**Steps:**

1. Ensure localStorage contains no 'ynabAccessToken' key. Navigate to http://localhost:3000/#access_token=test-token-abc123&token_type=Bearer


    - expect: The page loads at the root URL (the hash is not part of the server path)

2. Wait for the page to fully load and React client-side code to execute


    - expect: The 'ynabAccessToken' key is now present in localStorage with value 'test-token-abc123'
    - expect: The YnabAuthorization component has run useYnabOauthToken, which parsed the hash and called TokenManager.setToken

#### 2.3. Error message is shown when no valid token is present

**File:** `e2e/auth/unauthenticated-error.spec.ts`

**Steps:**

1. Ensure localStorage is empty (no 'ynabAccessToken'). Navigate to http://localhost:3000/


    - expect: The page loads successfully

2. Wait for the DefaultBudgetIdFetcher component to attempt to fetch the default budget ID


    - expect: The error message 'There was an error retrieving information from YNAB. Please click on the preceding link to reauthorize the connection to YNAB.' is displayed
    - expect: The message appears in red text below the 'Authorize With YNAB' link

#### 2.4. No error message when valid token is present in localStorage

**File:** `e2e/auth/authenticated-state.spec.ts`

**Steps:**

1. Set a valid YNAB personal access token in localStorage under the key 'ynabAccessToken'. Navigate to http://localhost:3000/


    - expect: The page loads successfully

2. Wait for the page to load and the DefaultBudgetIdFetcher to complete


    - expect: The error message 'There was an error retrieving information from YNAB...' is NOT visible
    - expect: The 'Accounts' heading (h1) is visible

### 3. Settings Page - Account Management

**Seed:** `e2e/seed.spec.ts`

#### 3.1. Settings page shows 'Reload accounts' button and empty account list initially

**File:** `e2e/settings/empty-accounts.spec.ts`

**Steps:**

1. Ensure localStorage is empty. Navigate to http://localhost:3000/settings


    - expect: The page shows the heading 'Settings Page' (h1)

2. Observe the 'Accounts to Include in Analysis' section


    - expect: The heading 'Accounts to Include in Analysis' (h2) is visible
    - expect: A 'Reload accounts' button is present
    - expect: No account checkboxes are shown since no accounts have been loaded

#### 3.2. Clicking 'Reload accounts' loads and displays YNAB accounts as checkboxes

**File:** `e2e/settings/reload-accounts.spec.ts`

**Steps:**

1. Set a valid YNAB personal access token in localStorage under key 'ynabAccessToken'. Navigate to http://localhost:3000/settings


    - expect: The Settings page loads with the 'Reload accounts' button

2. Click the 'Reload accounts' button


    - expect: The application makes a request to the YNAB API to retrieve accounts for the default budget

3. Wait for accounts to load


    - expect: A list of account checkboxes appears under the 'Accounts to Include in Analysis' heading
    - expect: Each account is displayed as a label with an associated checkbox
    - expect: All checkboxes are initially unchecked (selected: false by default)

#### 3.3. Checking an account checkbox marks it as selected

**File:** `e2e/settings/select-account.spec.ts`

**Steps:**

1. Set a valid YNAB access token in localStorage. Navigate to http://localhost:3000/settings and click 'Reload accounts' to load accounts


    - expect: Accounts are displayed with unchecked checkboxes

2. Check the checkbox for the first account in the list


    - expect: The checkbox becomes checked

3. Navigate to http://localhost:3000/ (the Home page)


    - expect: The Accounts summary table is now visible on the Home page
    - expect: The table contains a row for the selected account
    - expect: The 'Account Name' column shows the account name as a clickable link

#### 3.4. Unchecking an account removes it from the Home page accounts table

**File:** `e2e/settings/deselect-account.spec.ts`

**Steps:**

1. Set a valid YNAB access token in localStorage and load accounts in Settings. Check the checkbox for at least one account. Navigate to the Home page to confirm the account appears in the Accounts table


    - expect: The account is shown in the Accounts summary table on the Home page

2. Navigate back to Settings (/settings) and uncheck the previously checked account's checkbox


    - expect: The checkbox becomes unchecked

3. Navigate to http://localhost:3000/


    - expect: The Accounts summary table is no longer visible (AccountTable returns null when no accounts are selected)
    - expect: Only the 'Accounts' heading, disclaimer, and 'Authorize With YNAB' link remain

#### 3.5. Account selections are persisted to localStorage

**File:** `e2e/settings/account-persistence.spec.ts`

**Steps:**

1. Set a valid YNAB access token in localStorage. Navigate to Settings and reload accounts. Check the checkbox for at least one account


    - expect: The account is checked

2. Reload the page (navigate to http://localhost:3000/settings again)


    - expect: The previously checked account is still checked
    - expect: The account list is restored from localStorage without needing to click 'Reload accounts' again

### 4. Home Page - Accounts Summary Table

**Seed:** `e2e/seed.spec.ts`

#### 4.1. Accounts table is not shown when no accounts are selected

**File:** `e2e/home/no-accounts-selected.spec.ts`

**Steps:**

1. Ensure localStorage has no selected accounts (or is completely empty). Navigate to http://localhost:3000/


    - expect: The 'Accounts' heading (h1) is visible
    - expect: No accounts table is rendered on the page
    - expect: The disclaimer section is visible

#### 4.2. Accounts table shows selected accounts with account name links

**File:** `e2e/home/accounts-table-links.spec.ts`

**Steps:**

1. Set a valid YNAB access token. Load accounts in Settings and select at least one account. Navigate to http://localhost:3000/


    - expect: The accounts summary table is rendered with a caption 'Accounts'
    - expect: The table has an 'Account Name' column header
    - expect: Each selected account appears as a row in the table
    - expect: The account name in each row is a hyperlink pointing to /account/[account-id]

#### 4.3. Accounts table displays max balance columns for each year after transactions are loaded

**File:** `e2e/home/accounts-table-max-balances.spec.ts`

**Steps:**

1. Set a valid YNAB access token. Load accounts in Settings and select one account. Navigate to the account detail page (/account/[id]) and click 'Reload transactions'


    - expect: Transactions load and the Max Balance Transactions table is populated

2. Navigate to http://localhost:3000/


    - expect: The Accounts summary table now has additional columns, one per year (e.g., 'Max Balance 2022', 'Max Balance 2023', 'Max Balance 2024')
    - expect: Years are sorted in ascending order
    - expect: The max balance value for each year is displayed in the corresponding cell (formatted as the raw number divided by 1000)
    - expect: Cells for years where no data has been calculated show '-'

#### 4.4. Accounts table shows max balances for multiple accounts across multiple years

**File:** `e2e/home/accounts-table-multiple-accounts.spec.ts`

**Steps:**

1. Set a valid YNAB access token. Load accounts in Settings and select two or more accounts. Load transactions for each selected account via their respective detail pages. Navigate to http://localhost:3000/


    - expect: The Accounts table shows one row per selected account
    - expect: Columns include all unique years across all accounts, sorted ascending
    - expect: Each account row shows its own max balance values for each year
    - expect: If an account has no transactions for a given year, that cell displays '-'

### 5. Account Detail Page

**Seed:** `e2e/seed.spec.ts`

#### 5.1. Account detail page heading shows the account name

**File:** `e2e/account-detail/heading.spec.ts`

**Steps:**

1. Set a valid YNAB access token. Load accounts in Settings and select one account named (for example) 'Checking Account'. Navigate to the account's detail page via its link on the Home page


    - expect: The page heading (h1) reads '[Account Name] - Details' (e.g., 'Checking Account - Details')
    - expect: A 'Transactions' heading (h2) is present below

#### 5.2. Account detail page for an unknown account ID shows empty heading

**File:** `e2e/account-detail/unknown-account-id.spec.ts`

**Steps:**

1. Navigate directly to http://localhost:3000/account/nonexistent-account-id (without any accounts in localStorage matching this ID)


    - expect: The page loads without crashing
    - expect: The heading (h1) reads '- Details' because the account has no name (the Account class default constructor returns an empty string for name)
    - expect: The 'Transactions' heading (h2) is present
    - expect: A 'Reload transactions' button is present
    - expect: Both the 'Max Balance Transactions' and 'All Transactions' tables are rendered with headers but no data rows

#### 5.3. Clicking 'Reload transactions' loads and displays all transactions for the account

**File:** `e2e/account-detail/reload-transactions.spec.ts`

**Steps:**

1. Set a valid YNAB access token. Load accounts in Settings, select an account, and navigate to its detail page


    - expect: The 'Reload transactions' button is visible
    - expect: Both tables are empty (no data rows)

2. Click the 'Reload transactions' button


    - expect: A request is sent to the YNAB API to fetch transactions for the account since the budget's first_month date

3. Wait for transactions to load


    - expect: The 'All Transactions' table is populated with rows, one per transaction
    - expect: Each row displays: Date (YYYY-MM-DD format), Payee name, Memo, Amount (divided by 1000), and Balance (running balance divided by 1000)
    - expect: Transactions appear in chronological order as returned by the YNAB API
    - expect: The running balance in the Balance column increases/decreases according to each transaction's amount

#### 5.4. Max Balance Transactions table shows one row per year with the highest balance transaction

**File:** `e2e/account-detail/max-balance-transactions.spec.ts`

**Steps:**

1. Set a valid YNAB access token. Load accounts in Settings, select an account with transactions spanning multiple years, navigate to its detail page, and click 'Reload transactions'


    - expect: Both tables are populated

2. Observe the 'Max Balance Transactions' table


    - expect: The table caption reads 'Max Balance Transactions'
    - expect: The table has headers: Date, Payee, Memo, Amount, Balance, Year of Max Balance
    - expect: There is one row per calendar year covered by the account's transactions
    - expect: Each row identifies the transaction that had the highest running balance for that year
    - expect: The 'Year of Max Balance' column shows the 4-digit year
    - expect: The Balance column value in each row is the maximum balance (divided by 1000) for that year
    - expect: The Date, Payee, Memo, and Amount columns show details of the specific transaction that achieved the max balance

#### 5.5. Transaction data is persisted across page reloads

**File:** `e2e/account-detail/transaction-persistence.spec.ts`

**Steps:**

1. Set a valid YNAB access token. Load accounts in Settings, select an account, navigate to its detail page, and click 'Reload transactions'. Wait for transactions to appear


    - expect: Transactions and max balance rows are displayed

2. Reload the page (navigate to the same /account/[id] URL again)


    - expect: Without clicking 'Reload transactions' again, both the 'Max Balance Transactions' table and 'All Transactions' table still show the previously loaded data
    - expect: The data is restored from localStorage automatically on page load

#### 5.6. Clicking 'Reload transactions' again refreshes data from the YNAB API

**File:** `e2e/account-detail/reload-transactions-refresh.spec.ts`

**Steps:**

1. Set a valid YNAB access token. Navigate to an account detail page and click 'Reload transactions' once to load initial data


    - expect: Transaction data is displayed in both tables

2. Click 'Reload transactions' a second time


    - expect: The application makes another request to the YNAB API
    - expect: The tables are re-populated with fresh data
    - expect: The transaction count and max balance values should remain the same (assuming no new YNAB transactions since the first load)

#### 5.7. Amount and Balance values are formatted by dividing by 1000

**File:** `e2e/account-detail/amount-formatting.spec.ts`

**Steps:**

1. Set a valid YNAB access token. Navigate to an account detail page and click 'Reload transactions'


    - expect: Transactions are loaded

2. Observe the Amount and Balance columns in the 'All Transactions' table


    - expect: Amount values are displayed as the raw YNAB milliunits value divided by 1000 (e.g., YNAB amount of 1500000 is displayed as 1500)
    - expect: Balance values are similarly divided by 1000
    - expect: No currency symbol is shown (the formatAmount function simply divides by 1000)

#### 5.8. Navigating to account detail page via Home page account name link works correctly

**File:** `e2e/account-detail/navigation-from-home.spec.ts`

**Steps:**

1. Set a valid YNAB access token. Load accounts in Settings and select at least one account. Navigate to http://localhost:3000/


    - expect: The Accounts table is shown with the selected account name as a link

2. Click the account name link in the Accounts table


    - expect: The browser navigates to /account/[account-id]
    - expect: The account detail page is displayed with the correct account name in the heading
    - expect: The 'Reload transactions' button is visible

### 6. Local Storage Persistence and State Management

**Seed:** `e2e/seed.spec.ts`

#### 6.1. Accounts state is persisted to localStorage under key 'accounts'

**File:** `e2e/persistence/accounts-localstorage.spec.ts`

**Steps:**

1. Set a valid YNAB access token. Navigate to Settings and click 'Reload accounts'. After accounts load, check one account's checkbox


    - expect: The account checkbox is checked

2. Inspect the 'accounts' key in localStorage


    - expect: The 'accounts' localStorage key contains a JSON object with an 'accounts' array
    - expect: The array includes at least one account entry with id, name, and selected: true for the checked account

#### 6.2. Budget state is persisted to localStorage under key 'budgetState'

**File:** `e2e/persistence/budget-localstorage.spec.ts`

**Steps:**

1. Set a valid YNAB access token in localStorage. Navigate to http://localhost:3000/ and wait for the DefaultBudgetIdFetcher to complete


    - expect: No error message is visible

2. Inspect the 'budgetState' key in localStorage


    - expect: The 'budgetState' localStorage key contains a JSON object with a 'defaultBudgetId' property
    - expect: The 'defaultBudgetId' value is a non-empty string (the ID of the user's default YNAB budget)

#### 6.3. All state is restored from localStorage on fresh page load

**File:** `e2e/persistence/state-restoration.spec.ts`

**Steps:**

1. Set a valid YNAB access token. Go through the full workflow: load accounts in Settings, select an account, load transactions for that account. Verify data appears on both the Home page and account detail page


    - expect: All data is visible

2. Close and reopen the browser (or clear session storage while keeping localStorage). Navigate to http://localhost:3000/


    - expect: The selected account appears in the Accounts table on the Home page
    - expect: Max balance data is shown in the table (populated from localStorage)
    - expect: No additional API calls to reload accounts or transactions are needed

### 7. Error Handling and Edge Cases

**Seed:** `e2e/seed.spec.ts`

#### 7.1. Home page shows error when YNAB token is invalid or expired

**File:** `e2e/error-handling/invalid-token.spec.ts`

**Steps:**

1. Set an invalid YNAB access token in localStorage (e.g., 'invalid-token-xyz') under key 'ynabAccessToken'. Navigate to http://localhost:3000/


    - expect: The page loads

2. Wait for the DefaultBudgetIdFetcher to attempt to call the YNAB API


    - expect: The error message 'There was an error retrieving information from YNAB. Please click on the preceding link to reauthorize the connection to YNAB.' is displayed in red
    - expect: The 'Authorize With YNAB' link remains visible and functional

#### 7.2. Settings page 'Reload accounts' button shows no accounts when API call fails

**File:** `e2e/error-handling/settings-reload-failure.spec.ts`

**Steps:**

1. Ensure no valid YNAB token is set in localStorage (set 'ynabAccessToken' to an invalid value). Navigate to http://localhost:3000/settings


    - expect: The Settings page loads with the 'Reload accounts' button

2. Click the 'Reload accounts' button


    - expect: The application attempts to call the YNAB API but receives an error
    - expect: No account checkboxes appear (or previously shown accounts remain unchanged)
    - expect: No crash or unhandled error is visible in the UI

#### 7.3. Account detail page handles accounts with no transactions gracefully

**File:** `e2e/error-handling/no-transactions.spec.ts`

**Steps:**

1. Set a valid YNAB access token. Load accounts, select an account that has no transactions in YNAB, and navigate to its detail page. Click 'Reload transactions'


    - expect: The YNAB API call completes

2. Observe both tables after the API call completes


    - expect: The 'All Transactions' table is displayed with headers but contains zero data rows
    - expect: The 'Max Balance Transactions' table is displayed with headers but contains zero data rows
    - expect: No error message or crash occurs

#### 7.4. formatAmount returns '-' when amount is undefined

**File:** `e2e/error-handling/undefined-amount-formatting.spec.ts`

**Steps:**

1. Set up the state so that an account has been selected but has not yet had transactions loaded (maxBalancesByYear is empty). Navigate to http://localhost:3000/ and observe the Accounts table


    - expect: The Accounts table shows the account row
    - expect: Year columns (if any) show '-' instead of a number because the maxBalancesByYear[year]?.balance is undefined
    - expect: No JavaScript error is thrown

#### 7.5. Navigating directly to a non-existent route does not crash the application

**File:** `e2e/error-handling/non-existent-route.spec.ts`

**Steps:**

1. Navigate to a route that does not exist in the application, such as http://localhost:3000/some-random-path


    - expect: A Next.js 404 page or error page is displayed
    - expect: The application does not show an unhandled exception or blank white page
    - expect: The main navigation may or may not be visible depending on the error layout

### 8. Full End-to-End Workflow

**Seed:** `e2e/seed.spec.ts`

#### 8.1. Complete FBAR workflow: authenticate, configure accounts, load transactions, view summary

**File:** `e2e/workflow/complete-workflow.spec.ts`

**Steps:**

1. Ensure localStorage is completely clear. Navigate to http://localhost:3000/


    - expect: The home page loads
    - expect: The 'Authorize With YNAB' link is visible
    - expect: The YNAB error message is displayed because no token exists
    - expect: No accounts table is visible

2. Simulate OAuth authentication by setting a valid YNAB personal access token in localStorage under key 'ynabAccessToken'. Reload the page at http://localhost:3000/


    - expect: The YNAB error message is NOT visible
    - expect: The 'Accounts' heading is visible
    - expect: Still no accounts table (no accounts selected yet)

3. Click the 'Settings' link in the navigation and click the 'Reload accounts' button


    - expect: A list of YNAB account names with checkboxes appears

4. Check the checkbox for at least one account (preferably a foreign bank account relevant to FBAR)


    - expect: The checkbox is now checked
    - expect: The account is selected in the application state

5. Click the 'Home' link in the navigation


    - expect: The Accounts summary table is now visible
    - expect: The selected account appears as a row with its name as a clickable link
    - expect: No year columns are shown yet (or if shown, they display '-' because max balances have not been calculated)

6. Click on the account name link in the Accounts table to navigate to the account detail page


    - expect: The browser navigates to /account/[account-id]
    - expect: The page heading shows '[Account Name] - Details'
    - expect: The 'Reload transactions' button is visible
    - expect: Both tables are empty

7. Click the 'Reload transactions' button


    - expect: A YNAB API call is made to fetch transactions for this account

8. Wait for transactions to load and observe both tables


    - expect: The 'All Transactions' table shows all transactions with Date, Payee, Memo, Amount, and Balance columns
    - expect: The 'Max Balance Transactions' table shows one row per year with the maximum balance for each year
    - expect: The Balance column in each row of the All Transactions table represents a running balance starting from the first transaction

9. Click the 'Home' link in the navigation


    - expect: The Accounts summary table now shows columns for each year covered by the account's transactions (e.g., 'Max Balance 2022', 'Max Balance 2023', 'Max Balance 2024')
    - expect: The max balance value for each year is shown in the corresponding cell
    - expect: The account name in the table remains a clickable link to the account detail page

10. Reload the page at http://localhost:3000/


    - expect: All data (account selections, transaction data, max balances) is restored from localStorage
    - expect: The Accounts table still shows the same max balance data without needing to reload transactions
