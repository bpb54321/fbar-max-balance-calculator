import { PlaidItem } from "@/contexts/itemContext";

import { type AssetReport, type AssetReportCreateResponse } from "plaid";

import createAssetReport from "@/server-functions/createAssetReport";
import getAssetReport from "@/server-functions/getAssetReport";
import { useEffect, useState } from "react";

enum AssetReportCreationState {
  Idle,
  CreationRequestInitiated,
  CreationRequestConfirmed,
  ReportReady,
  ErrorGeneratingReport,
  ReportFetchInitiated,
  ReportFetchCompleted,
}

export default function AssetReportCreationButton({
  setAssetReport,
  plaidItem,
}: {
  setAssetReport: (assetReport: AssetReport) => void;
  plaidItem: PlaidItem;
}) {
  const [assetReportCreationState, setAssetReportCreationState] =
    useState<AssetReportCreationState>(AssetReportCreationState.Idle);
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
        setAssetReportCreationState(
          AssetReportCreationState.ErrorGeneratingReport
        );
      } else {
        setAssetReportCreationState(
          AssetReportCreationState.ReportFetchInitiated
        );
        const assetReport = await getAssetReport(
          assetReportCreateResponseState.asset_report_token
        );
        setAssetReportCreationState(
          AssetReportCreationState.ReportFetchCompleted
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

  let reportCreationProgressFeedbackText;
  switch (assetReportCreationState) {
    case AssetReportCreationState.CreationRequestInitiated:
      reportCreationProgressFeedbackText =
        "Sending request to create asset report...";
      break;
    case AssetReportCreationState.CreationRequestConfirmed:
      reportCreationProgressFeedbackText =
        "Request received. Generating asset report. This could take up to a few minutes...";
      break;
    case AssetReportCreationState.ReportReady:
      reportCreationProgressFeedbackText = "Report is ready.";
      break;
    case AssetReportCreationState.ErrorGeneratingReport:
      reportCreationProgressFeedbackText =
        "There was an error generating the asset report.";
      break;
    case AssetReportCreationState.ReportFetchInitiated:
      reportCreationProgressFeedbackText = "Fetching report...";
      break;
    case AssetReportCreationState.ReportFetchCompleted:
      reportCreationProgressFeedbackText = "Report fetch completed.";
      break;
    default:
      break;
  }

  return (
    <div>
      <div>
        <button
          onClick={async () => {
            setAssetReportCreationState(
              AssetReportCreationState.CreationRequestInitiated
            );
            const assetReportCreateResponse = await createAssetReport([
              plaidItem.accessToken,
            ]);
            setAssetReportCreationState(
              AssetReportCreationState.CreationRequestConfirmed
            );

            console.log(assetReportCreateResponse);

            setAssetReportCreateResponse(assetReportCreateResponse);
          }}
        >
          Create asset report
        </button>
      </div>
      <p>{reportCreationProgressFeedbackText}</p>
    </div>
  );
}
