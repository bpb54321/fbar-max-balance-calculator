interface Heading1Props {
  children: React.ReactNode;
}

export default function Heading1({ children }: Heading1Props) {
  return <h1>{children}</h1>;
}
