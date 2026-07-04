type HighlightedTextProps = {
  children: React.ReactNode;
};

export default function HighlightedText({ children }: HighlightedTextProps) {
  return <p className="text-lg font-semibold text-amber-700">{children}</p>;
}
