import { TransactionWithBalance } from "./TransactionWithBalance";

export type MaxBalanceTransaction = TransactionWithBalance & {
  yearOfMaxBalance: string;
};

export interface MaxBalance {
  id: string;
  transactionId: string;
  year: string;
  balance: number;
}

export interface MaxBalancesByYear {
  [year: string]: MaxBalance;
}
