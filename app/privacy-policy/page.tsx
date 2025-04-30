import Heading1 from "@/design-system/headings/heading1/Heading1";
import Heading2 from "@/design-system/headings/heading2/Heading2";
import Paragraph from "@/design-system/paragraph/Paragraph";

export default function PrivacyPolicy() {
  return (
    <>
      <Heading1>Privacy Policy</Heading1>
      <Heading2>How your data will be handled, stored, secured</Heading2>
      <Paragraph>
        All data obtained via the YNAB API will be stored in local storage on
        your browser.
      </Paragraph>
      <Paragraph>
        You can delete the data stored on your browser at any time by clearing
        the local storage of your browser for the application's hostname.
      </Paragraph>
      <Heading2>Third parties</Heading2>
      <Paragraph>
        We guarantee that the data obtained through the YNAB API will not be
        passed to any third party.
      </Paragraph>
    </>
  );
}
