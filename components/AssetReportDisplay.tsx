import { PlaidItem } from "@/contexts/itemContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import { HistoricalBalance, type AssetReport } from "plaid";
import { useState } from "react";
import AssetReportCreationButton from "./AssetReportCreationButton";

function getMaxHistoricalBalance(historicalBalances: HistoricalBalance[]) {
  const maxHistoricalBalance = historicalBalances.reduce(
    (maxHistoricalBalance, currentHistoricalBalance) => {
      if (currentHistoricalBalance.current > maxHistoricalBalance.current) {
        return currentHistoricalBalance;
      } else {
        return maxHistoricalBalance;
      }
    },
    {
      date: "no date",
      current: 0,
      iso_currency_code: "NOCODE",
      unofficial_currency_code: "NOCODE",
    }
  );
  return maxHistoricalBalance;
}

const ASSET_REPORT_STORAGE_KEY = "assertReport";

export default function AssetReportDisplay({
  plaidItem,
}: {
  plaidItem: PlaidItem;
}) {
  const [assetReport, setAssetReport] = useState<AssetReport>({
    asset_report_id: "",
    client_report_id: "",
    date_generated: "",
    days_requested: 0,
    user: {},
    items: [],
  });

  useLocalStorage(ASSET_REPORT_STORAGE_KEY, assetReport, setAssetReport);

  return (
    <div>
      <AssetReportCreationButton
        plaidItem={plaidItem}
        setAssetReport={setAssetReport}
      />
      <div>
        {}
        {assetReport.items.length > 0
          ? assetReport.items[0].accounts.map((account) => {
              const maxHistoricalBalance = getMaxHistoricalBalance(
                account.historical_balances
              );
              return (
                <div key={account.account_id}>
                  <table>
                    <caption>
                      {account.name} - {account.mask}: Account balances
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {account.historical_balances.map((historicalBalance) => {
                        return (
                          <tr key={historicalBalance.date}>
                            <td>{historicalBalance.date}</td>
                            <td>{historicalBalance.current}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th scope="row">Max</th>
                        <td>{maxHistoricalBalance.date}</td>
                        <td>{maxHistoricalBalance.current}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
