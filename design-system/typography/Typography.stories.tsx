import { Meta, StoryObj } from "@storybook/react";
import Heading1 from "../headings/heading1/Heading1";
import Heading2 from "../headings/heading2/Heading2";
import Paragraph from "../paragraph/Paragraph";

const meta: Meta = {
  title: "Typography",
};

export default meta;

export const Primary: StoryObj = {
  render: () => {
    return (
      <div
        className="min-h-[350px] w-[670px]"
        data-testid="typography-container"
      >
        <Heading1>The Joke Tax Chronicles</Heading1>
        <Paragraph>
          Once upon a time, in a far-off land, there was a very lazy king who
          spent all day lounging on his throne. One day, his advisors came to
          him with a problem: the kingdom was running out of money.
        </Paragraph>
        <Heading2>The King's Plan</Heading2>
        <Paragraph>
          The king thought long and hard, and finally came up with a brilliant
          plan: he would tax the jokes in the kingdom.
        </Paragraph>
      </div>
    );
  },
};
