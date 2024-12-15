import { PlaidItem } from "@/contexts/itemContext";

import { type AssetReport, type AssetReportCreateResponse } from "plaid";

import createAssetReport from "@/server-functions/createAssetReport";
import getAssetReport from "@/server-functions/getAssetReport";
import { useState } from "react";

export default function AssetReportCreationButton({
  setAssetReport,
  plaidItem,
}: {
  setAssetReport: (assetReport: AssetReport) => void;
  plaidItem: PlaidItem;
}) {
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
      </div>
    </div>
  );
}
