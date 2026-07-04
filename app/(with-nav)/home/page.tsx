import Accounts from "@/components/Accounts";
import DefaultBudgetIdFetcher from "@/components/DefaultBudgetIdFetcher";
import Disclaimer from "@/components/Disclaimer";

export default function Home() {
  return (
    <div>
      <DefaultBudgetIdFetcher />
      <Accounts />
      <Disclaimer />
    </div>
  );
}
