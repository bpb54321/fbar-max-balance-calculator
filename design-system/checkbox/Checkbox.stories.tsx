import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Checkbox from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component: Checkbox,
};

export default meta;

export const Unchecked: StoryObj<typeof Checkbox> = {
  args: {
    id: "checkbox",
    checked: false,
  },
};

export const Checked: StoryObj<typeof Checkbox> = {
  args: {
    id: "checkbox",
    checked: true,
  },
};
