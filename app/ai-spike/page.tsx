import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

export default async function AiMonthlyStatementSpike() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_CLOUD_API_KEY || "");

  const fileManager = new GoogleAIFileManager(
    process.env.GOOGLE_CLOUD_API_KEY || ""
  );

  const model = genAI.getGenerativeModel({
    // Choose a Gemini model.
    model: "gemini-1.5-flash",
  });

  // Upload the file and specify a display name.
  const uploadResponse = await fileManager.uploadFile(
    process.env.PDF_FILE_PATH || "",
    {
      mimeType: "application/pdf",
      displayName: "releve-de-compte-desjardins-2023-02.pdf",
    }
  );

  // View the response.
  console.log(
    `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
  );

  // Generate content using text and the URI reference for the uploaded file.
  const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri,
      },
    },
    {
      text: `This document is a bank account statement. 
      It may contain balance data for multiple accounts.

      For each account in the document, can you extract:
      * the institution name (this will be the same for every account),
      * the institution address (this will be the same for every account)
        * make sure to include the following elements in the address:
          * street address,
          * city
          * province or state
          * postal code
          * country
      * the account name,
      * the maximum balance in the account for the given time period,
      * the date that the maximum balance was reached,
      * and the time period of the document?
      
      Can you return this data in a JSON format with the following example schema for each account?

      {
        "institutionName": "My bank",
        "institutionAddress": "1234 Bank Rd, Montreal, QC, H21 3AB, Canada",
        "accountName": "My account",
        "maximumBalance": 100,
        "maximumBalanceDate": "2023-02-15",
        "statementStartDate": "2023-02-01",
        "statementEndDate": "2023-02-28"
      }
        `,
    },
  ]);

  // Output the generated text to the console
  console.log(result.response.text());
  return null;
}
