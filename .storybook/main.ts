import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../design-system/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/experimental-nextjs-vite",
  staticDirs: [
    {
      from: "../node_modules/geist/dist/fonts/geist-sans",
      to: "/fonts/geist-sans",
    },
    {
      from: "../node_modules/geist/dist/fonts/geist-mono",
      to: "/fonts/geist-mono",
    },
  ],
};
export default config;
