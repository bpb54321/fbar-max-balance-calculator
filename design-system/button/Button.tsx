interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

const buttonClassName =
  "inline-flex items-center justify-center font-medium text-sm py-2 px-4 bg-primary text-primary-foreground rounded-md cursor-pointer";

export default function Button({ children, onClick, href }: ButtonProps) {
  if (href) {
    return (
      <a href={href} className={buttonClassName}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={buttonClassName}>
      {children}
    </button>
  );
}
