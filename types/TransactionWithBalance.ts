export interface TransactionWithBalance {
  id: string;
  date: string;
  amount: number;
  memo: string | null | undefined;
  payeeName: string | null | undefined;
  balance: number;
}
