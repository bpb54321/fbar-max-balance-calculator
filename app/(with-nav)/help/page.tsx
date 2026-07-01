import Heading1 from "@/design-system/headings/heading1/Heading1";
import Heading2 from "@/design-system/headings/heading2/Heading2";

export default function HelpPage() {
  return (
    <>
      <Heading1>Help Page</Heading1>
      <Heading2>How to Use</Heading2>
      <ol className="my-6 ml-6 list-decimal">
        <li className="my-2">
          From the Home page, click on Authorize With YNAB to connect your YNAB
          account. Select which budget you want to use as your default budget -
          this is the budget that will be used by the application. Once
          connected, your connection token will be valid for two hours.
        </li>
        <li className="my-2">
          Visit the Settings page by clicking its link in the main nagivation.
        </li>
        <li className="my-2">
          Click &quot;Reload accounts&quot; to load all your YNAB accounts.
        </li>
        <li className="my-2">
          Check all the accounts that you want to include in the max balance
          analysis.
        </li>
        <li className="my-2">
          You should now see all included accounts dispalyed in the Accounts
          table.
        </li>
        <li className="my-2">
          For every account, click on the account name to go to that
          account&apos;s detail page.
        </li>
        <li className="my-2">
          Once on the detail page, click the &quot;Reload transactions&quot;
          button.
        </li>
        <li className="my-2">
          All the transactions from that account since 2022 will be loaded and
          displayed on the account detail page. In addition, a table at the top
          of the page will display the max balances for that account for all
          years since 2022, as well details of each individual transaction where
          the max balance was reached for a given year.
        </li>
        <li className="my-2">
          Return to the Home page. You will see a summary table which lists the
          max balances per year for each account for which you have loaded the
          transactions.
        </li>
        <li className="my-2">
          Repeat the process of loading the transactions for every account that
          you want to include.
        </li>
      </ol>
      <Heading2>Data Storage</Heading2>
      <ul className="my-6 ml-6 list-disc">
        <li className="my-2">
          Account transaction and max balance data will be stored locally in
          your browser, so that you won&apos;t need to repeat the process of
          loading transactions.
        </li>
        <li className="my-2">
          You can delete the locally stored data by selecting &quot;Delete
          browsing data&quot; or specificaly, &quot;Delete local storage&quot;
          for the domain of the FBAR Max Balance calculator,
          https://fbar-max-balance-calculator.vercel.app/
        </li>
      </ul>
      <Heading2>Refreshing / Reloading Data</Heading2>
      <ul className="my-6 ml-6 list-disc">
        <li className="my-2">
          In order to reload transactions for a given account, press the button
          &quot;Reload transactions&quot; from the account&apos;s detail page.
        </li>
      </ul>
    </>
  );
}
