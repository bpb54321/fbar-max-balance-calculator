export interface MaxBalanceTransaction {
  id: string;
  transactionId: string;
  year: string;
  balance: number;
}

export interface MaxBalancesByYear {
  [year: string]: MaxBalanceTransaction;
}
