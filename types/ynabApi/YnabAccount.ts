export enum YnabAccountType {
  CreditCard = "creditCard",
  Checking = "checking",
  Savings = "savings",
  Cash = "cash",
  OtherAsset = "otherAsset",
}

export interface YnabAccount {
  id: string;
  name: string;
  type: YnabAccountType;
}
