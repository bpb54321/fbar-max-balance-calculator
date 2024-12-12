"use server";
export default async function exchangePublicToken() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("blah");
    }, 3000);
  });
  return "holla!";
}
