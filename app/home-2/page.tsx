"use client";
import { Container, Heading } from "@radix-ui/themes";
import * as pdfjsLib from "pdfjs-dist";

const baseUrl = import.meta.url;

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  baseUrl
).toString();

export default function Home2() {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument(arrayBuffer);
      const pdf = await loadingTask.promise;
      const page1 = await pdf.getPage(1);
      const textContent = await page1.getTextContent();
      console.log(textContent);
    }
  };
  return (
    <Container size="2">
      <Heading as="h1">FBAR Max Balance Calculator</Heading>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
    </Container>
  );
}
