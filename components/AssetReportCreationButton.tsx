import { PlaidItem } from "@/contexts/itemContext";

import { type AssetReport, type AssetReportCreateResponse } from "plaid";

import createAssetReport from "@/server-functions/createAssetReport";
import getAssetReport from "@/server-functions/getAssetReport";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (!assetReportCreateResponseState.asset_report_token) {
      return;
    }
    const ASSET_REPORT_WEBHOOK_SSE_ENDPOINT = "/api/asset-report-webhook";
    const sseUrl = `${ASSET_REPORT_WEBHOOK_SSE_ENDPOINT}?asset_report_id=${assetReportCreateResponseState.asset_report_id}`;

    console.log("Connecting to asset report webhook sse endpoint...");

    const eventSource = new EventSource(sseUrl);

    eventSource.onmessage = async (event: MessageEvent) => {
      const assetsWebhookPayload = JSON.parse(event.data);

      console.log(assetsWebhookPayload);

      if (assetsWebhookPayload.error) {
        console.error("Received an error webhook");
        console.error(assetsWebhookPayload);
      } else {
        const assetReport = await getAssetReport(
          assetReportCreateResponseState.asset_report_token
        );
        setAssetReport(assetReport);
      }
    };

    eventSource.onerror = (error) => {
      console.error(
        `Error with connection to ${ASSET_REPORT_WEBHOOK_SSE_ENDPOINT}: `,
        error
      );
      eventSource.close();
    };

    return () => {
      console.log("In SSE useEffect cleanup function.");
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [assetReportCreateResponseState, setAssetReport]);

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
    </div>
  );
}
