import { MaxBalanceTransaction } from "@/types/MaxBalanceTransaction";
import { TransactionWithBalance } from "@/types/TransactionWithBalance";
import { describe, expect, it } from "vitest";
import getMaxBalances from "./getMaxBalances";

describe("getMaxBalances", () => {
  it("should return the correct max balances per year for given inputs", () => {
    // Arrange
    const transactions: TransactionWithBalance[] = [
      {
        id: "1",
        date: "2023-01-01",
        amount: 1000000,
        memo: "Initial deposit",
        payeeName: "Employer",
        balance: 1000000,
      },
      {
        id: "2",
        date: "2023-06-01",
        amount: -200000,
        memo: "Rent payment",
        payeeName: "Landlord",
        balance: 800000,
      },
      {
        id: "3",
        date: "2024-01-01",
        amount: -500000,
        memo: "Car purchase",
        payeeName: "Car Dealer",
        balance: 300000,
      },
      {
        id: "4",
        date: "2024-06-01",
        amount: 1500000,
        memo: "Bonus",
        payeeName: "Employer",
        balance: 1800000,
      },
    ];

    // Act
    const result = getMaxBalances(transactions);

    // Assert
    const expectedOutput: MaxBalanceTransaction[] = [
      {
        id: "1",
        date: "2023-01-01",
        amount: 1000000,
        memo: "Initial deposit",
        payeeName: "Employer",
        balance: 1000000,
        yearOfMaxBalance: "2023",
      },
      {
        id: "4",
        date: "2024-06-01",
        amount: 1500000,
        memo: "Bonus",
        payeeName: "Employer",
        balance: 1800000,
        yearOfMaxBalance: "2024",
      },
    ];
    expect(result).toEqual(expectedOutput);
  });
});
