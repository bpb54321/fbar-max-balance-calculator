import { YnabAccount, YnabAccountType } from "@/types/ynabApi/YnabAccount";
import { TransactionDetail } from "ynab";

export const mockAccounts: YnabAccount[] = [
  {
    id: "1234-5678-9011",
    name: "My Checking Account",
    type: YnabAccountType.Checking,
  },
  {
    id: "97be-aabb-5566",
    name: "My Savings Account",
    type: YnabAccountType.Savings,
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
