export async function POST(request: Request) {
  const requestBody = await request.json();
  console.log(requestBody);
  return Response.json({
    message: "Thank you for calling the asset-report-webhook route!",
  });
}
