"use client";
import getMaxAccountBalancesForDocument from "@/server-functions/getMaxAccountBalancesForDocument";

const handleOnClick = async () => {
  await getMaxAccountBalancesForDocument();
};

export default function AiMonthlyStatementSpike() {
  return (
    <div>
      <button onClick={handleOnClick}>
        Get max account balances for document
      </button>
    </div>
  );
}
