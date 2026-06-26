import { Heading } from "@radix-ui/themes";

interface Heading1Props {
  children: React.ReactNode;
}

export default function Heading1({ children }: Heading1Props) {
  return (
    <Heading as="h1" size="8" mb="6">
      {children}
    </Heading>
  );
}
