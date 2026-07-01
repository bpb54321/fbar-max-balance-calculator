type AuthenticationStatusMessageProps = {
  children: React.ReactNode;
};

export default function AuthenticationStatusMessage({
  children,
}: AuthenticationStatusMessageProps) {
  return (
    <p className="text-lg font-semibold text-amber-700">{children}</p>
  );
}
