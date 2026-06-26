import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";
import { ReactNode } from "react";

export interface LinkProps {
  href: string;
  children: ReactNode;
}

export default function Link({ href, children }: LinkProps) {
  return (
    <RadixLink asChild>
      <NextLink href={href}>{children}</NextLink>
    </RadixLink>
  );
}
