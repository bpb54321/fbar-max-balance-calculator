import NavigationMenu, {
  LinkData,
} from "@/design-system/navigation-menu/NavigationMenu";

const links: LinkData[] = [
  { text: "Home", href: "/home" },
  { text: "Settings", href: "/settings" },
  { text: "Privacy Policy", href: "/privacy-policy" },
  { text: "Help", href: "/help" },
];

export default function MainNavigation() {
  return (
    <div className="mb-4">
      <NavigationMenu links={links} />
    </div>
  );
}
