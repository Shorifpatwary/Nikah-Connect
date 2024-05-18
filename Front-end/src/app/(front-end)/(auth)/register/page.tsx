import AuthFormWrapper from "../auth-form-wrapper";

import { formData } from "@/app/(front-end)/(auth)/data";
import Section from "@/components/blocks/section";
import RegistrationForm from "./registration-form";

export default function Component() {
  return (
    // <div className="p-6 py-24 sm:p-10">
    <Section rowClassName="justify-center">
      <AuthFormWrapper
        formType="registration"
        formTitle={formData.register.title}
      >
        {/* registration form */}
        <RegistrationForm />
      </AuthFormWrapper>
    </Section>
  );
}
