import Link from "../link/Link";

export interface LinkData {
  text: string;
  href: string;
}

interface NavigationMenuProps {
  links: LinkData[];
}

export default function NavigationMenu({ links }: NavigationMenuProps) {
  return (
    <nav className="inline-flex border-b">
      <ul className="flex gap-1 items-center">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
