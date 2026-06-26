import { Meta, StoryObj } from "@storybook/react";
import NavigationMenu, { LinkData } from "./NavigationMenu";

const meta: Meta<typeof NavigationMenu> = {
  title: "NavigationMenu",
  component: NavigationMenu,
};

export default meta;

const sampleLinks: LinkData[] = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Contact", href: "/contact" },
];

export const Primary: StoryObj<typeof NavigationMenu> = {
  args: {
    links: sampleLinks,
  },
};
