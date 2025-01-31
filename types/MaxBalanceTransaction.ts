import { TransactionWithBalance } from "./TransactionWithBalance";

export type MaxBalanceTransaction = TransactionWithBalance & {
  yearOfMaxBalance: string;
};
