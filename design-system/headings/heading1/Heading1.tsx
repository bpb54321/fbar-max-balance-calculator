interface Heading1Props {
  children: React.ReactNode;
}

export default function Heading1({ children }: Heading1Props) {
  return (
    <h1 className="text-5xl tracking-tight font-extrabold mb-6">{children}</h1>
  );
}
