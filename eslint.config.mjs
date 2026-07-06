import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import storybook from "eslint-plugin-storybook";

const config = [
  ...nextCoreWebVitals,
  ...storybook.configs["flat/recommended"],
];

export default config;
