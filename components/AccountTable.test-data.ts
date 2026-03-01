export const mockSelectedAccounts = [
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
];
