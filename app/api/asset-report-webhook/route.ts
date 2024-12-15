import { AssetsErrorWebhook, AssetsProductReadyWebhook } from "plaid";

let clients: {
  controller: ReadableStreamDefaultController;
  assetReportId: string;
}[] = [];

type AssetReportWebhookPayload = AssetsProductReadyWebhook | AssetsErrorWebhook;

export async function POST(request: Request) {
  const webhookBody: AssetReportWebhookPayload = await request.json();

  console.log(webhookBody);

  const assetReportClient = clients.find(
    (client) => client.assetReportId === webhookBody.asset_report_id
  );
  if (assetReportClient) {
    assetReportClient.controller.enqueue(
      `data: ${JSON.stringify(webhookBody)}\n\n`
    );
  }

  return Response.json({
    status: "Ok",
  });
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const assetReportId = requestUrl.searchParams.get("asset_report_id");
  if (!assetReportId) {
    return;
  }

  const stream = new ReadableStream({
    start(controller) {
      clients.push({ controller, assetReportId });
    },
    cancel(reason) {
      // Callback function when the connection is closed
      clients = clients.filter(
        (client) => client.assetReportId !== assetReportId
      );
      console.log(`Connection closed: ${reason}`);
    },
  });

  const response = new Response(stream);
  response.headers.append("Connection", "keep-alive");
  response.headers.append("Cache-Control", "no-cache");
  response.headers.append("Content-Type", "text/event-stream");

  return response;
}
