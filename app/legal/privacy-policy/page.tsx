import InformativeSection from "@/components/sections/InformativeSection";

const CONTENT = `
# Hello,
At Editor Collab, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our service.

---

-> # \`Information We Collect\` <-

## Personal Data

For using the mod, we collect the bare minimum of information necessary to provide our service. This includes:
\n
**-** \`Geometry Dash account name and ID\`\n
**-** \`IP addresses\`\n
**-** \`Mod version used to access our services\`\n
**-** \`Platform information\`\n
---
We collect additional information on purchases to ensure the safety of your transactions. This includes:
\n
**-** \`Billing address\`\n
**-** \`E-mail address\`\n
**-** \`Anything collected by our payment processors, completely opaque to us\`\n
\n 
If you would like to have your personal information removed, please contact us.

---


## How We Use Your Information

We use the information we collect in various ways, including to:

Provide, operate, and maintain our website and services
Improve, personalize, and expand our website and services
Understand and analyze how you use our website and services
Develop new products, services, features, and functionality
Send you emails

---

## Third-Party Services
We may employ third-party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.

---

## Changes to This Privacy Policy
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

---

## Contact Us
If you have any questions about this Privacy Policy, please contact us.
`;

export default function TermsOfService() {
  return (
    <InformativeSection
      title="Privacy Policy"
      updatedAt="Aug 9, 2025"
      backHref="/"
      content={CONTENT}
    />
  );
}
