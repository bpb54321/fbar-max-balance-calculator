interface Heading2Props {
  children: React.ReactNode;
}

export default function Heading2({ children }: Heading2Props) {
  return (
    <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight mb-6">
      {children}
    </h2>
  );
}
