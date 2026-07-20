import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import Checkbox from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component: Checkbox,
  args: {
    id: "checkbox",
    onChange: fn(),
  },
};

export default meta;

export const Unchecked: StoryObj<typeof Checkbox> = {
  args: {
    checked: false,
  },
};

export const Checked: StoryObj<typeof Checkbox> = {
  args: {
    checked: true,
  },
};

export const CallsOnChange: StoryObj<typeof Checkbox> = {
  args: {
    checked: false,
  },
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole("checkbox"));

    await expect(args.onChange).toHaveBeenCalled();
  },
};
