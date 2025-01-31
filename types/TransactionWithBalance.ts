export interface TransactionWithBalance {
  id: string;
  date: string;
  amount: number;
  memo: string;
  payeeName: string;
  balance: number;
}
