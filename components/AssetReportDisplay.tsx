import { PlaidItem } from "@/contexts/itemContext";
import createAssetReport from "@/server-functions/createAssetReport";
import getAssetReport from "@/server-functions/getAssetReport";
import {
  HistoricalBalance,
  type AssetReport,
  type AssetReportCreateResponse,
} from "plaid";
import { useState } from "react";

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

export default function AssetReportDisplay({
  plaidItem,
}: {
  plaidItem: PlaidItem;
}) {
  const [assetReport, setAssetReport] = useState<AssetReport>();
  const [assetReportCreateResponseState, setAssetReportCreateResponse] =
    useState<AssetReportCreateResponse>({
      asset_report_id: "",
      asset_report_token: "",
      request_id: "",
    });

  return (
    <div>
      <div>
        <button
          onClick={async () => {
            const assetReportCreateResponse = await createAssetReport([
              plaidItem.accessToken,
            ]);
            console.log(assetReportCreateResponse);
            setAssetReportCreateResponse(assetReportCreateResponse);
          }}
        >
          Create asset report
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            const assetReport = await getAssetReport(
              assetReportCreateResponseState.asset_report_token
            );
            console.log(assetReport);
            setAssetReport(assetReport);
          }}
        >
          Get asset report
        </button>
        <div>
          {assetReport?.items[0].accounts.map((account) => {
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
          })}
        </div>
      </div>
    </div>
  );
}
