interface CaptionProps {
  caption: string;
}

export default function Caption({ caption }: CaptionProps) {
  return <caption className="mt-4 text-muted-foreground">{caption}</caption>;
}
