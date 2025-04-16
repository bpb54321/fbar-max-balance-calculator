import { Meta, StoryObj } from "@storybook/react";
import Heading2 from "./Heading2";

const meta: Meta<typeof Heading2> = {
  title: "Heading2",
  component: Heading2,
};

export default meta;

export const Primary: StoryObj<typeof Heading2> = {
  args: {
    children: "The People of the Kingdom",
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[350px] justify-center p-10 items-center w-[670px]">
        <Story />
      </div>
    ),
  ],
};
