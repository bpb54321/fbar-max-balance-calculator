import { Button as RadixButton } from "@radix-ui/themes";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return <RadixButton onClick={onClick}>{children}</RadixButton>;
}
