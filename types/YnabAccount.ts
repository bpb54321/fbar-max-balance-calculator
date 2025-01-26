type YnabAccountType =
  | "creditCard"
  | "checking"
  | "savings"
  | "cash"
  | "otherAsset";

export interface YnabAccount {
  id: string;
  name: string;
  type: YnabAccountType;
}
