import { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";
import Heading1 from "./Heading1";

const meta: Meta<typeof Heading1> = {
  title: "Heading1",
  component: Heading1,
};

export default meta;

export const Primary: StoryObj<typeof Heading1> = {
  args: {
    children: "The Joke Tax Chronicles",
  },
};
