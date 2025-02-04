import { Meta, StoryObj } from "@storybook/react";
import Table from "./Table";

const meta: Meta<typeof Table> = {
  title: "Table",
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Primary: Story = {
  args: {
    columnHeaders: ["Date", "Payee", "Memo", "Amount", "Balance"],
  },
};
