import InformativeSection from "@/components/sections/InformativeSection";

const CONTENT = `
# Hello,
Please read these terms and conditions carefully before using our service.

---

## 1. Introduction
Welcome to Editor Collab. These Terms & Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms.


## 2. Definitions
"Service" refers to the Editor Collab platform and all related services. "User" refers to any individual or entity that accesses or uses our Service. "Content" refers to all information and materials available on our Service.


## 3. Account Registration
To use certain features of our Service, you may be required to register for an account. You agree to provide accurate and complete information during the registration process and to update such information to keep it accurate and current.


## 4. User Responsibilities
You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.


## 5. Intellectual Property
All content, features, and functionality of our Service are owned by Sassify and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.


## 6. Privacy Policy
Your use of our Service is also governed by our Privacy Policy, which is incorporated by reference into these Terms & Conditions.


## 7. Limitation of Liability
In no event shall Sassify be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.


## 8. Changes to Terms
We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting the new Terms on our website. Your continued use of the Service after such modifications will constitute your acknowledgment of the modified Terms.


## 9. Governing Law
These Terms shall be governed by and construed in accordance with the laws of British Columbia, without regard to its conflict of law provisions.


## 10. Contact Us
If you have any questions about these Terms, please contact us at alk.editorcollab@gmail.com.

`;

export default function TermsOfService() {
  return (
    <InformativeSection
      title="Terms of Service"
      updatedAt="Feb 15, 2026"
      backHref="/"
      content={CONTENT}
    />
  );
}
