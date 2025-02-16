import React from "react";
import type { Preview } from "@storybook/react";
import localFont from "next/font/local";

const GeistSans = localFont({
  src: "../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist-sans",
});

import "../css/output.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={`${GeistSans.className} antialiased`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
