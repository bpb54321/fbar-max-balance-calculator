import { YnabAccount, YnabAccountType } from "@/types/ynabApi/YnabAccount";
import { YnabTransaction } from "@/types/ynabApi/YnabTransaction";

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

export const mockTransactions: YnabTransaction[] = [
  {
    id: "76b193c1-a860-4a64-8303-d06bf49dea21",
    date: "2024-01-01",
    amount: -2100000,
    memo: "Rent payment",
    account_id: mockAccounts[0].id,
    account_name: mockAccounts[0].name,
    payee_name: "My Landlord",
  },
  {
    id: "abc193c1-a860-4a64-8303-d06bf49dea21",
    date: "2024-01-30",
    amount: 3000000,
    memo: "Paycheck",
    account_id: mockAccounts[0].id,
    account_name: mockAccounts[0].name,
    payee_name: "My Employer",
  },
];
