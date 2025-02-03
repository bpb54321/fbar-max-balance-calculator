export default function formatAmount(amount: number | undefined) {
  if (amount === undefined) {
    return "-";
  }
  return amount / 1000;
}
