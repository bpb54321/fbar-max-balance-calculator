import React from "react";
import type { Preview } from "@storybook/nextjs-vite";

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
