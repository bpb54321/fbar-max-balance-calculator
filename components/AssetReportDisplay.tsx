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

const ASSET_REPORT_STORAGE_KEY_PREFIX = "assetReport";

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

  const assetReportStorageKey = `${ASSET_REPORT_STORAGE_KEY_PREFIX}-${plaidItem.itemId}`;
  useLocalStorage(assetReportStorageKey, assetReport, setAssetReport);

  return (
    <div>
      <AssetReportCreationButton
        plaidItem={plaidItem}
        setAssetReport={setAssetReport}
      />
      {assetReport.items.length > 0
        ? assetReport.items[0].accounts.map((account) => {
            const maxHistoricalBalance = getMaxHistoricalBalance(
              account.historical_balances
            );
            return (
              <div key={account.account_id}>
                <h5>
                  {account.name} - {account.mask}
                </h5>
                <div>
                  <dt>Max balance:</dt>
                  <dd>{maxHistoricalBalance.current}</dd>
                  <dt>Date:</dt>
                  <dd>{maxHistoricalBalance.date}</dd>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}
