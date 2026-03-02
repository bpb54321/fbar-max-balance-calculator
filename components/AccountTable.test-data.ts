import { Account } from "@/types/Account";

export const mockSelectedAccounts: Account[] = [
  {
    name: "Wealthsimple_Checking_Account",
    id: "11111111",
    selected: true,
    transactionsWithBalances: [
      {
        id: "3b028978",
        date: "2024-05-05",
        amount: 0,
        memo: "",
        payeeName: "Max balance transaction 2024",
        balance: 0,
      },
      {
        id: "7db6a074",
        date: "2025-05-06",
        amount: 3500000,
        memo: "",
        payeeName: "Max balance transaction 2025",
        balance: 3500000,
      },
      {
        id: "22222222",
        date: "2026-07-01",
        amount: -500000,
        memo: "",
        payeeName: "Max balance transaction 2026",
        balance: 3000000,
      },
    ],
    maxBalancesByYear: {
      "2024": {
        id: "11111111-2024",
        transactionId: "3b028978",
        year: "2024",
        balance: 0,
      },
      "2025": {
        id: "11111111-2025",
        transactionId: "7db6a074",
        year: "2025",
        balance: 3500000,
      },
      "2026": {
        id: "11111111-2026",
        transactionId: "22222222",
        year: "2026",
        balance: 3000000,
      },
    },
  },
  {
    name: "TD_Savings_Account",
    id: "22222222",
    selected: true,
    transactionsWithBalances: [
      {
        id: "1a111111",
        date: "2023-03-15",
        amount: 2000000,
        memo: "",
        payeeName: "Max balance transaction 2023",
        balance: 2000000,
      },
      {
        id: "2b222222",
        date: "2024-04-20",
        amount: 500000,
        memo: "",
        payeeName: "Max balance transaction 2024",
        balance: 2500000,
      },
      {
        id: "3c333333",
        date: "2025-06-10",
        amount: -300000,
        memo: "",
        payeeName: "Max balance transaction 2025",
        balance: 2200000,
      },
    ],
    maxBalancesByYear: {
      "2023": {
        id: "22222222-2023",
        transactionId: "1a111111",
        year: "2023",
        balance: 2000000,
      },
      "2024": {
        id: "22222222-2024",
        transactionId: "2b222222",
        year: "2024",
        balance: 2500000,
      },
      "2025": {
        id: "22222222-2025",
        transactionId: "3c333333",
        year: "2025",
        balance: 2200000,
      },
    },
  },
];
