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
      text: "This document is a monthly bank account statement. Can you please find the max balance and the date on which the max balance occurs?",
    },
  ]);

  // Output the generated text to the console
  console.log(result.response.text());
  return null;
}
