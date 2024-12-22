"use client";
import getMaxAccountBalancesForDocument from "@/server-functions/getMaxAccountBalancesForDocument";
import { ChangeEventHandler } from "react";

export default function AiMonthlyStatementSpike() {
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const filelist = event.target.files;
    if (filelist && filelist.length > 0) {
      const file = filelist[0];
      const formData = new FormData();
      formData.append("file", file);
      await getMaxAccountBalancesForDocument(formData);
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}
