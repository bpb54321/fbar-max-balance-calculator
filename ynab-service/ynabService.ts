const accounts = [
  "Wealthsimple_Checking_Brian_CA_6360",
  "Desjardins_FHSA_Brian_CA",
];

export default class YnabService {
  async getAccounts(): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(accounts);
      }, 5000);
    });
  }
}
