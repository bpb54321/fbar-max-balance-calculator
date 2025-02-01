import { MaxBalancesByYear } from "./MaxBalanceTransaction";
import { TransactionWithBalance } from "./TransactionWithBalance";

export class NewAccount {
  constructor(
    public name: string = "",
    public id: string = "",
    public selected: boolean = false,
    public transactionsWithBalances: TransactionWithBalance[] = [],
    public maxBalancesByYear: MaxBalancesByYear = {}
  ) {}
}
