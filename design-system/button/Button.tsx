interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="inline-flex items-center justify-center font-medium text-sm py-2 px-4 bg-primary text-primary-foreground rounded-md">
      {children}
    </button>
  );
}
