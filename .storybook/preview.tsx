import type { Preview } from "@storybook/react";
import { Theme } from "@radix-ui/themes";

import "../css/output.css";
import "@radix-ui/themes/styles.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <Theme>
        <div className={`font-sans antialiased`}>
          <Story />
        </div>
      </Theme>
    ),
  ],
};

export default preview;
