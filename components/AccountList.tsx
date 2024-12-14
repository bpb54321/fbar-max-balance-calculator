import { usePlaidItems } from "@/contexts/itemContext";
import AssetReportDisplay from "@/components/AssetReportDisplay";

export default function AccountList() {
  const plaidItems = usePlaidItems();

  return (
    <>
      <h2>Connected Institutions</h2>
      {plaidItems.map((plaidItem) => (
        <div key={plaidItem.metadata.institution?.institution_id}>
          <h3>{plaidItem.metadata.institution?.name}</h3>
          <AssetReportDisplay plaidItem={plaidItem} />
        </div>
      ))}
    </>
  );
}
