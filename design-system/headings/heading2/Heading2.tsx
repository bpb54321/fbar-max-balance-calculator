import { Heading } from "@radix-ui/themes";

interface Heading2Props {
  children: React.ReactNode;
}

export default function Heading2({ children }: Heading2Props) {
  return (
    <Heading as="h2" size="7" mb="6">
      {children}
    </Heading>
  );
}
