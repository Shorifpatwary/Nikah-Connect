import { appNameBn, supportEmail } from "@/assets/data/config/app.config";

export const MailVerificationData = {
  title: "আপনার ই-মেইল ভেরিফাই করুন।",
  description: `${appNameBn} এর সাথে নিবন্ধনের জন্য ধন্যবাদ। নিবন্ধন প্রক্রিয়া সম্পূর্ণ করতে এবং আপনার অ্যাকাউন্ট সক্রিয় করতে, আপনার ই-মেইল এ দেওয়া লিংক এ ক্লিক করুন। `,
  resendDescription: `ই-মেইল না পেয়ে থাকলে ৩০ সেকেন্ড পর পুনরায়  চেষ্টা করুন।`,
  resendButtonText: "পুনরায় ই-মেইল পাঠান",
  helpLink: "সাহায্যের প্রয়োজন ?",
  helpText: `যদি আপনি এখনও সমস্যার সম্মুখীন হন, তাহলে আমাদের সাপোর্ট টিমের সাথে ${supportEmail} এর মাধ্যমে যোগাযোগ করুন।`,
};
