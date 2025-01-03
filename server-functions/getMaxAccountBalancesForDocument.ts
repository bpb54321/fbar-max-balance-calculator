"use server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import * as fs from "fs";
import { GoogleAIFileManager } from "@google/generative-ai/server";

export default async function getMaxAccountBalancesForDocument(data: FormData) {
  const file = data.get("file");

  if (file === null) {
    console.error("No file was not sent to the server action.");
    return;
  }

  const arrayBuffer = await (file as File).arrayBuffer();

  // Buffer class required for Node.js to use the ArrayBuffer from Web API standard
  const buffer = Buffer.from(arrayBuffer);

  // Write file temporarily to filesystem in order to upload to Google File Manager
  const filename = (file as File).name;
  const tempFilePath = `/tmp/${filename}`;
  fs.writeFileSync(tempFilePath, buffer, "binary");

  const fileManager = new GoogleAIFileManager(
    process.env.GOOGLE_CLOUD_API_KEY || ""
  );

  // Upload the file and specify a display name.
  const uploadResponse = await fileManager.uploadFile(tempFilePath, {
    mimeType: "application/pdf",
    displayName: filename,
  });

  // View the response.
  console.log(
    `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
  );

  // Delete file locally
  fs.unlink(tempFilePath, (err) => {
    if (err) {
      console.error(`Failed to delete file ${tempFilePath}:`, err);
    } else {
      console.log(`Successfully deleted file ${tempFilePath}`);
    }
  });

  const accountMaxBalancesSchema = {
    description: "Account max balances",
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        institutionName: {
          type: SchemaType.STRING,
          description:
            "The name of the financial institution that holds the account",
          nullable: false,
        },
        institutionAddress: {
          type: SchemaType.STRING,
          description:
            "The address of the financial institution that holds the account",
          nullable: false,
        },
        accountName: {
          type: SchemaType.STRING,
          description:
            "The name of the account. Can include the account number " +
            "or the last four digits of the account number, if the model is able to discern these " +
            "from the account statements",
          nullable: false,
        },
        maximumBalance: {
          type: SchemaType.NUMBER,
          description:
            "The maximum balance attained by a given account in the time period covered " +
            "by the account statement",
          nullable: false,
        },
        maximumBalanceDate: {
          type: SchemaType.STRING,
          description:
            "The date that a given account attained its maximum balance for the time period " +
            "covered by the statement. Format should be YYYY-MM-DD.",
          nullable: false,
        },
        statementStartDate: {
          type: SchemaType.STRING,
          description:
            "The date that marks the beginning of the time period covered by the statement. Format should be YYYY-MM-DD.",
          nullable: false,
        },
        statementEndDate: {
          type: SchemaType.STRING,
          description:
            "The date that begins the time period covered by the statement. Format should be YYYY-MM-DD.",
          nullable: false,
        },
      },
      required: [
        "institutionName",
        "institutionAddress",
        "accountName",
        "maximumBalance",
        "maximumBalanceDate",
        "statementStartDate",
        "statementEndDate",
      ],
    },
  };

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_CLOUD_API_KEY || "");
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: accountMaxBalancesSchema,
    },
  });

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
      It contains transaction and balance data for at least one and potentially multiple accounts.

      The language of the document may be in English or French.

      For each account in the document, can you extract:
      * the institution name (this will be the same for every account),
      * the institution address (this will be the same for every account)
        * make sure to include the following elements in the address:
          * street address,
          * city
          * province or state
          * postal code
          * country
      * the account name or number (this is usually just above the table listing the transactions),
      * the maximum balance in the account for the given time period,
      * the date that the maximum balance was reached,
      * and the start and end date for the statement?`,
    },
  ]);

  return result.response.text();
}
