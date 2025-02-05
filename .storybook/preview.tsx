import React from "react";
import localFont from "next/font/local";
import type { Preview } from "@storybook/react";
import "../css/output.css";

const GeistSans = localFont({
  src: "../fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist-sans",
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={`font-sans ${GeistSans.variable}`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
