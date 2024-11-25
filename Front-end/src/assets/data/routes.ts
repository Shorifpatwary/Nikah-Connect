import { backendUrl, frontEndUrl } from "@/assets/data/config/app.config";
export type BioSection =
  | "general"
  | "location"
  | "education"
  | "personal-info"
  | "family"
  | "profession"
  | "religious-activities"
  | "marital-info"
  | "expected-partner"
  | "hidden-info";

const Routes = {
  Home: "/",
  Registration: "/register",
  Login: "/login",
  ForgetPassword: "/forget-password",
  ResetPassword: "/reset-password",
  Profile: "/dashboard",
  PrivacyPolicy: "/privacy-policy",
  TermsAndCondition: "/terms-and-condition",
  ourTeam: "/our-team",
  career: "/career",
  support: "/support",
  FAQs: "/faq",
  contactUs: "/contact-us",
  services: "/services",
  affiliates: "/affiliates",
  blog: "/blog",
  bio: "/bio",
  bookmark: "/bookmark",
  aboutUs: "/about-us",
  Admin: "/admin",
  MailVerification: "/mail-verification",
  profile_bio: {
    url: "/dashboard/bio",
    general: {
      create: "/dashboard/bio/general/create",
      edit: "/dashboard/bio/general/edit",
    },
    location: {
      create: "/dashboard/bio/location/create",
      edit: "/dashboard/bio/location/edit",
    },
    education: {
      create: "/dashboard/bio/education/create",
      edit: "/dashboard/bio/education/edit",
    },
    personal_info: {
      create: "/dashboard/bio/personal-details/create",
      edit: "/dashboard/bio/personal-details/edit",
    },
    family: {
      create: "/dashboard/bio/family-info/create",
      edit: "/dashboard/bio/family-info/edit",
    },
    profession: {
      create: "/dashboard/bio/profession/create",
      edit: "/dashboard/bio/profession/edit",
    },
    religious_activities: {
      create: "/dashboard/bio/religious-activities/create",
      edit: "/dashboard/bio/religious-activities/edit",
    },
    marital_info: {
      create: "/dashboard/bio/marriage-info/create",
      edit: "/dashboard/bio/marriage-info/edit",
    },
    expected_partner: {
      create: "/dashboard/bio/expected-partner/create",
      edit: "/dashboard/bio/expected-partner/edit",
    },
    hidden_info: {
      create: "/dashboard/bio/hidden-info/create",
      edit: "/dashboard/bio/hidden-info/edit",
    },
  },
  api: {
    csrf: `${frontEndUrl}/api/csrf-cookie`,
    bio: {
      user_record: (section: BioSection) =>
        `${backendUrl}/api/bio/${section}/user-bio-record`,
    },
  },
};
export default Routes;
