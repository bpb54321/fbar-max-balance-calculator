import { type Account, AccountType, type TransactionDetail } from "ynab";

export const mockAccounts: Account[] = [
  {
    id: "1234-5678-9011",
    name: "My Checking Account",
    type: AccountType.Checking,
    on_budget: false,
    closed: false,
    balance: 0,
    cleared_balance: 0,
    uncleared_balance: 0,
    transfer_payee_id: null,
    deleted: false,
  },
  {
    id: "97be-aabb-5566",
    name: "My Savings Account",
    type: AccountType.Savings,
    on_budget: false,
    closed: false,
    balance: 0,
    cleared_balance: 0,
    uncleared_balance: 0,
    transfer_payee_id: null,
    deleted: false,
  },
];

export const mockTransactions: TransactionDetail[] = [
  {
    id: "76b193c1-a860-4a64-8303-d06bf49dea21",
    date: "2024-01-01",
    amount: -2100000,
    memo: "Rent payment",
    account_id: mockAccounts[0].id,
    account_name: mockAccounts[0].name,
    payee_name: "My Landlord",
    cleared: "cleared",
    approved: true,
    flag_color: null,
    import_id: null,
    category_id: null,
    category_name: null,
    subtransactions: [],
    deleted: false,
  },
  {
    id: "abc193c1-a860-4a64-8303-d06bf49dea21",
    date: "2024-01-30",
    amount: 3000000,
    memo: "Paycheck",
    account_id: mockAccounts[0].id,
    account_name: mockAccounts[0].name,
    payee_name: "My Employer",
    cleared: "cleared",
    approved: true,
    flag_color: null,
    import_id: null,
    category_id: null,
    category_name: null,
    subtransactions: [],
    deleted: false,
  },
];
