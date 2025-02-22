import React from "react";
import type { Preview } from "@storybook/react";

// Manually import the CSS file which imports the Geist Sans font definition
// file from node modules because Next.js font loader doesn't seem to
// work in Storybook.
import "./fonts.css";

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
