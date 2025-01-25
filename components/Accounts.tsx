import { Suspense } from "react";
import AccountTable from "./AccountTable";

export default function Accounts() {
  return (
    <div>
      <h2>Accounts</h2>
      <Suspense fallback={"Loading accounts..."}>
        <AccountTable />
      </Suspense>
    </div>
  );
}
