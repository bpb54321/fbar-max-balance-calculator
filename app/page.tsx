"use client";
import { AccountCreationForm } from "@/components/AccountCreationForm";
import { AccountList } from "@/components/AccountList";
import { AccountsProvider } from "@/contexts/accountsContext";
import getMaxAccountBalancesForDocument from "@/server-functions/getMaxAccountBalancesForDocument";
import { defaultTheme, Provider } from "@adobe/react-spectrum";
import { ChangeEventHandler } from "react";

const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (
  event
) => {
  const filelist = event.target.files;
  if (filelist && filelist.length > 0) {
    const file = filelist[0];
    const formData = new FormData();
    formData.append("file", file);
    const maxAccountBalances =
      (await getMaxAccountBalancesForDocument(formData)) ?? "";
    const parsedMaxAccountBalances = JSON.parse(maxAccountBalances);
    console.log(parsedMaxAccountBalances);
  }
};

export default function Home() {
  return (
    <Provider theme={defaultTheme}>
      <AccountsProvider>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <AccountCreationForm />
        <AccountList />
      </AccountsProvider>
    </Provider>
  );
}
