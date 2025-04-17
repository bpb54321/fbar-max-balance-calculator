import NavigationMenu, {
  LinkData,
} from "@/design-system/navigation-menu/NavigationMenu";

const links: LinkData[] = [
  { text: "Home", href: "/" },
  { text: "Settings", href: "/settings" },
];

export default function MainNavigation() {
  return (
    <div className="mb-4">
      <NavigationMenu links={links} />
    </div>
  );
}
