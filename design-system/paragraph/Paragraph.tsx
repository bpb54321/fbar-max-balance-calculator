interface ParagraphProps {
  children: React.ReactNode;
}

export default function Paragraph({ children }: ParagraphProps) {
  return (
    <p className="text-base leading-relaxed text-gray-700 mb-4">{children}</p>
  );
}
