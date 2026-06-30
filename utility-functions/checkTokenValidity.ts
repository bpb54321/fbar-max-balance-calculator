import YnabService from "@/services/ynab-service/ynabService";

export default async function checkTokenValidity(
  token: string,
): Promise<boolean> {
  try {
    const ynabService = new YnabService(token);
    await ynabService.getUser();
    return true;
  } catch {
    return false;
  }
}
