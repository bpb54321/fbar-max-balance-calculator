import dotenv from "dotenv";
import Ynab from "ynab";
import { wealthsimpleCheckingTransactions } from "./wealthsimple-checking-transactions.ts";
import { tdSavingsTransactions } from "./td-savings-transactions.ts";

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

  const budgetId = budgets[0].id;
  console.log(`using budget ${budgetId}`);

  // create the transactions (including both checking and savings)
  const createResponse = await client.transactions.createTransactions(
    budgetId,
    {
      transactions: [
        ...wealthsimpleCheckingTransactions,
        ...tdSavingsTransactions,
      ],
    },
  );

  console.log(
    `created ${createResponse.data.transactions?.length ?? 0} transactions`,
  );
}

// run and report errors
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
