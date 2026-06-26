import { Text } from "@radix-ui/themes";

interface ParagraphProps {
  children: React.ReactNode;
}

export default function Paragraph({ children }: ParagraphProps) {
  return (
    <Text as="p" size="3" mb="4">
      {children}
    </Text>
  );
}
