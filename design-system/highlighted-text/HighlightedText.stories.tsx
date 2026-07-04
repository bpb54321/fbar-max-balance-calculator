import { Meta, StoryObj } from "@storybook/nextjs-vite";
import HighlightedText from "./HighlightedText";

const meta: Meta<typeof HighlightedText> = {
  title: "HighlightedText",
  component: HighlightedText,
};

export default meta;

export const Primary: StoryObj<typeof HighlightedText> = {
  args: {
    children: "Highlighted text",
  },
};
