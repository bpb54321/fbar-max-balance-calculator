import type { Meta, StoryObj } from "@storybook/react";
import Link from "./Link";

const meta: Meta<typeof Link> = {
  title: "Link",
  component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: "/",
    children: "Home",
  },
};
