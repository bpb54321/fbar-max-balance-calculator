import { usePlaidItems } from "@/contexts/itemContext";

export default function AccountList() {
  const plaidItems = usePlaidItems();

  return (
    <>
      <h2>Connected Accounts</h2>
      {plaidItems.map((plaidItem) => (
        <div key={plaidItem.metadata.institution?.institution_id}>
          <h3>{plaidItem.metadata.institution?.name}</h3>
          <h3>Accounts</h3>
          {plaidItem.metadata.accounts.map((account) => {
            return (
              <li key={account.id}>
                {account.name} - {account.mask} - {account.type}
              </li>
            );
          })}
        </div>
      ))}
    </>
  );
}
