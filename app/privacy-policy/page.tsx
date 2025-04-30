import Heading1 from "@/design-system/headings/heading1/Heading1";
import Heading2 from "@/design-system/headings/heading2/Heading2";

export default function PrivacyPolicy() {
  return (
    <>
      <Heading1>Privacy Policy</Heading1>
      <Heading2>How your data will be handled, stored, secured</Heading2>
      <p>
        All data obtained via the YNAB API will be stored in local storage on
        your browser.
      </p>
      <p>
        You can delete the data stored on your browser at any time by clearing
        the local storage of your browser for the application's hostname.
      </p>
      <Heading2>Third parties</Heading2>
      <p>
        We guarantee that the data obtained through the YNAB API will not be
        passed to any third party.
      </p>
    </>
  );
}
