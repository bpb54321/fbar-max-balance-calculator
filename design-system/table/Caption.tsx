import { Text } from "@radix-ui/themes";
import { ReactNode } from "react";

interface CaptionProps {
  children: ReactNode;
}

export default function Caption({ children }: CaptionProps) {
  return (
    <caption className="mt-4">
      <Text as="span" size="2" color="gray">
        {children}
      </Text>
    </caption>
  );
}
