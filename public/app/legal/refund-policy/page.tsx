import InformativeSection from "@/components/sections/InformativeSection";

const CONTENT = `
-> Hello, Customer. <-
## All products are purchased with a **14-day** change-of-mind period, if you're unsatisfied within this period, please get in touch with us within this window for a refund.
## Any issues which arise outside the change-of-mind period that detriment the experience may be refunded depending on the severity of the issue if a resolution cannot be found. Issues which are resolved with an update to the purchased product are not eligible for a refund.

## Please note that products are designed to work with specific versions of their relevant video game. Updates to the game which affect a product's functionality do not qualify as a valid reason for a refund.
## This policy applies to all digital purchases.
`;

export default function TermsOfService() {
  return (
    <InformativeSection
      title="Refund Policy"
      updatedAt="Feb 15, 2026"
      backHref="/"
      content={CONTENT}
    />
  );
}
