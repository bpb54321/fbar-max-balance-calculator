"use client";
import { ChangeEventHandler, FormEvent } from "react";
import {
  defaultTheme,
  Provider,
  Form,
  TextField,
  Button,
  ButtonGroup,
} from "@adobe/react-spectrum";
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

const onSubmit = (e: FormEvent<HTMLFormElement>) => {
  // Prevent default browser page refresh.
  e.preventDefault();

  // Get form data as an object.
  const formData = Object.fromEntries(new FormData(e.currentTarget));

  console.log(formData);
};

export default function Home() {
  return (
    <Provider theme={defaultTheme}>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <Form maxWidth="size-3600" onSubmit={onSubmit}>
          <TextField label="Account Name" name="accountName" isRequired />
          <ButtonGroup>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </ButtonGroup>
        </Form>
      </div>
    </Provider>
  );
}
