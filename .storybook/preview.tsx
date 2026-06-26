import React from "react";
import type { Preview } from "@storybook/react";

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
