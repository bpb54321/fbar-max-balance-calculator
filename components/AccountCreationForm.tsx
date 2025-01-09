"use client";
import {
  AccountAction,
  AccountActionTypes,
  useAccountsDispatch,
} from "@/contexts/accountsContext";
import { Account } from "@/types/Account";
import { Button, ButtonGroup, Form, TextField } from "@adobe/react-spectrum";
import { Dispatch, FormEvent } from "react";

const onSubmit = (
  e: FormEvent<HTMLFormElement>,
  dispatch: Dispatch<AccountAction>
) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const newAccount: Account = {
    name: formData.get("accountName") as string,
  };

  dispatch({ type: AccountActionTypes.AccountAdded, account: newAccount });
};

export function AccountCreationForm() {
  const accountsDispatch = useAccountsDispatch();
  return (
    <Form maxWidth="size-3600" onSubmit={(e) => onSubmit(e, accountsDispatch)}>
      <TextField label="Account Name" name="accountName" isRequired />
      <ButtonGroup>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </ButtonGroup>
    </Form>
  );
}
