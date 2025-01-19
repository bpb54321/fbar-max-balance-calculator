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

  const accountMonthlyMaxBalanceSchema = {
    type: SchemaType.OBJECT,
    properties: {
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
      "maximumBalance",
      "maximumBalanceDate",
      "statementStartDate",
      "statementEndDate",
    ],
  };

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_CLOUD_API_KEY || "");
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: accountMonthlyMaxBalanceSchema,
    },
  });

  const accountName = "Tangerine Chequing Account - 4018330419";

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
      The language of the document may be English or French.
      For the account named ${accountName}, can you extract:
      - the maximum balance in the account for the given time period,
      - the date that the maximum balance was reached,
      - the start date for the statement,
      - the end date for the statement?
      When finding the max balance, make sure to use data only from the transaction table 
      for the specific account. Each transaction table row has a column for the date of the transaction
      and the balance of the account after the transaction was completed. To find the max balance,
      you should compare the balance of all the transaction rows in the table. The max balance is the
      maximum of all the balances of all the transaction rows in the table. The date of the maximum 
      balance is the date of the transaction where the maximum balance is reached.`,
    },
  ]);

  return result.response.text();
}
