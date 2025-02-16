import React from "react";
import type { Preview } from "@storybook/react";
import localFont from "next/font/local";

// Have to use localFont to import the Geist font files in node_modules,
// because `import { GeistSans } from "geist/font/sans";` does not
// work with Storybook Vite server with framework: "@storybook/experimental-nextjs-vite",
// at least as of this writing.
const GeistSans = localFont({
  src: "../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist-sans",
});

// Define --font-geist-sans in the root element (<html>) since
// Tailwind --font-sans, which is applied to :root, references
// --font-geist-sans, and if it is undefined, --font-sans will
// also be undefined.
if (typeof document !== "undefined") {
  const htmlElement = document.documentElement;
  htmlElement.style.setProperty("--font-geist-sans", GeistSans.variable);
}

import "../css/output.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={`font-sans antialiased`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
