import { ChangeEvent } from "react";

const checkmarkImage =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M3 8.25L6.5 11.75L13 4.25' stroke='white' stroke-width='1.5'/%3E%3C/svg%3E\")";

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
      className="appearance-none h-4 w-4 rounded-sm border border-border bg-center bg-no-repeat checked:bg-primary"
      style={checked ? { backgroundImage: checkmarkImage } : undefined}
    />
  );
}
