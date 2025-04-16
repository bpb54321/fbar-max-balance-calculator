interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center font-medium text-sm py-2 px-4 bg-primary text-primary-foreground rounded-md"
    >
      {children}
    </button>
  );
}
