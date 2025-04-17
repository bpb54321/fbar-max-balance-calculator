import NextLink from "next/link";
import { ReactNode } from "react";

export interface LinkProps {
  href: string;
  children: ReactNode;
}

export default function Link({ href, children }: LinkProps) {
  return (
    <NextLink href={href} className="text-foreground hover:underline">
      {children}
    </NextLink>
  );
}
