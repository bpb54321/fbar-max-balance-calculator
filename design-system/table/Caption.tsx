import { ReactNode } from "react";

interface CaptionProps {
  children: ReactNode;
}

export default function Caption({ children }: CaptionProps) {
  return <caption className="mt-4 text-muted-foreground">{children}</caption>;
}
