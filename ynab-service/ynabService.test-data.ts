import { YnabAccountType } from "@/types/YnabAccount";

export const mockAccounts = [
  {
    id: "1234-5678-9011",
    name: "My Checking Account",
    type: YnabAccountType.Checking,
  },
  {
    id: "97be-aabb-5566",
    name: "My Savings Account",
    type: YnabAccountType.Savings,
  },
];
