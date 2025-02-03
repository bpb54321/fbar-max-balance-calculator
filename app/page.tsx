import Accounts from "@/components/Accounts";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/settings">Settings</Link>
      <Accounts />
    </div>
  );
}
