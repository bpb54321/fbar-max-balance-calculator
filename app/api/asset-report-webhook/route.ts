let clients: {
  id: string;
  controller: ReadableStreamDefaultController;
}[] = [];

export async function POST(request: Request) {
  const webhookBody = await request.json();

  console.log(webhookBody);
  // Send the data to all connected clients
  clients.forEach((client) => {
    client.controller.enqueue(`data: ${JSON.stringify(webhookBody)}\n\n`);
  });

  return Response.json({
    status: "Ok",
  });
}

export async function GET() {
  const clientId = Date.now().toString();

  const stream = new ReadableStream({
    start(controller) {
      const welcomeMessage = {
        message: "Connected to webhook stream",
      };
      controller.enqueue(`data: ${JSON.stringify(welcomeMessage)}\n\n`);

      clients.push({ controller, id: clientId });
    },
    cancel(reason) {
      // Callback function when the connection is closed
      clients = clients.filter((client) => client.id !== clientId);
      console.log(`Connection closed: ${reason}`);
    },
  });

  const response = new Response(stream);
  response.headers.append("Connection", "keep-alive");
  response.headers.append("Cache-Control", "no-cache");
  response.headers.append("Content-Type", "text/event-stream");

  return response;
}
