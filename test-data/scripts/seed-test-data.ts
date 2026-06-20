import dotenv from "dotenv";
import Ynab from "ynab";
import { wealthsimpleCheckingTransactions } from "../fixtures/wealthsimple-checking-transactions.ts";
import { tdSavingsTransactions } from "../fixtures/td-savings-transactions.ts";
import { bncCreditCardTransactions } from "../fixtures/bnc-credit-card-transactions.ts";

// load environment variables from .env.e2e.local so the script can be run from CLI
dotenv.config({ path: ".env.e2e.local" });

async function main() {
  const token = process.env.YNAB_E2E_PERSONAL_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      "YNAB_E2E_PERSONAL_ACCESS_TOKEN is not set in the environment",
    );
  }

  // create a client using the personal access token
  const client = new Ynab.API(token);

  // fetch budgets and pick the first one (the test user only has one budget)
  const budgetsResponse = await client.budgets.getBudgets();
  const budgets = budgetsResponse.data.budgets;
  if (budgets.length === 0) {
    throw new Error("No budgets returned from YNAB API");
  }

  const budget = budgets[0];
  console.log(`using budget ${budget.id}`);

  const budgetStartDate = budget.first_month ?? "2000-01-01";

  // Step 1: Delete all existing transactions
  const existingResponse = await client.transactions.getTransactions(
    budget.id,
    budgetStartDate,
  );
  const existing = existingResponse.data.transactions;
  console.log(`deleting ${existing.length} existing transactions`);
  await Promise.all(
    existing.map((t) => client.transactions.deleteTransaction(budget.id, t.id)),
  );

  // Step 2: Verify there are 0 transactions
  const afterDeleteResponse = await client.transactions.getTransactions(
    budget.id,
  );
  const remainingCount = afterDeleteResponse.data.transactions.length;
  if (remainingCount !== 0) {
    throw new Error(
      `Expected 0 transactions after deletion but found ${remainingCount}`,
    );
  }
  console.log("verified 0 transactions after deletion");

  // Step 3: Seed test transactions
  const testTransactions = [
    ...wealthsimpleCheckingTransactions,
    ...tdSavingsTransactions,
    ...bncCreditCardTransactions,
  ];
  const createResponse = await client.transactions.createTransactions(
    budget.id,
    { transactions: testTransactions },
  );
  console.log(
    `created ${createResponse.data.transactions?.length ?? 0} transactions`,
  );

  // Step 4: Verify total count matches the number of test transactions
  const afterSeedResponse = await client.transactions.getTransactions(
    budget.id,
  );
  const seededCount = afterSeedResponse.data.transactions.length;
  if (seededCount !== testTransactions.length) {
    throw new Error(
      `Expected ${testTransactions.length} transactions after seeding but found ${seededCount}`,
    );
  }
  console.log(
    `verified ${seededCount} transactions match the ${testTransactions.length} test transactions`,
  );
}

// run and report errors
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
