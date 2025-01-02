"use client";
import { ChangeEventHandler } from "react";
import { defaultTheme, Provider, Form, TextField } from "@adobe/react-spectrum";
import getMaxAccountBalancesForDocument from "@/server-functions/getMaxAccountBalancesForDocument";

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
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <Form maxWidth="size-3600">
          <TextField label="Account Name" />
        </Form>
      </div>
    </Provider>
  );
}
