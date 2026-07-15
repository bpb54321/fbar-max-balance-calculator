import { ChangeEvent } from "react";

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({ id, checked, onChange }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="appearance-none h-4 w-4 rounded-sm border border-border checked:bg-primary checked:border-primary"
    />
  );
}
