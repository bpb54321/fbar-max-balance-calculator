import Heading2 from "@/design-system/headings/heading2/Heading2";

export default function Disclaimer() {
  return (
    <>
      <Heading2>Disclaimer</Heading2>
      <p className="m-10 text-sm">
        We are not affiliated, associated, or in any way officially connected
        with YNAB, or any of its subsidiaries or its affiliates. The official
        YNAB website can be found at{" "}
        <a className="underline" href="https://www.ynab.com">
          https://www.ynab.com
        </a>
        . The names YNAB and You Need A Budget as well as related names, marks,
        emblems and images are registered trademarks of YNAB.
      </p>
    </>
  );
}
