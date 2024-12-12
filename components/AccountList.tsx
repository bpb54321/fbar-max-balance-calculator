import { usePlaidItems } from "@/contexts/itemContext";
import createAssetReport from "@/server-functions/createAssetReport";
import getAssetReport from "@/server-functions/getAssetReport";
import { AssetReport, AssetReportCreateResponse } from "plaid";
import { useState } from "react";

export default function AccountList() {
  const plaidItems = usePlaidItems();
  const [assetReport, setAssetReport] = useState<AssetReport>();
  const [assetReportCreateResponseState, setAssetReportCreateResponse] =
    useState<AssetReportCreateResponse>({
      asset_report_id: "",
      asset_report_token: "",
      request_id: "",
    });

  return (
    <>
      <h2>Connected Accounts</h2>
      {plaidItems.map((plaidItem) => (
        <div key={plaidItem.metadata.institution?.institution_id}>
          <h3>{plaidItem.metadata.institution?.name}</h3>
          <h4>Accounts</h4>
          {plaidItem.metadata.accounts.map((account) => {
            return (
              <li key={account.id}>
                {account.name} - {account.mask} - {account.type}
              </li>
            );
          })}
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
          </div>
        </div>
      ))}
    </>
  );
}
