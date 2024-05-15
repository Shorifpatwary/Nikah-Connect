import AuthFormWrapper from "@/app/(front-end)/(auth)/auth-form-wrapper";
import { formData } from "@/app/(front-end)/(auth)/data";
import Section from "@/components/blocks/section";
import ResetPasswordForm from "./form";

type Props = {};

const ResetPasswordID = (props: Props) => {
  return (
    <Section rowClassName="justify-center">
      <AuthFormWrapper
        formType="reset-password"
        formTitle={formData.resetPassword.title}
      >
        <ResetPasswordForm />
      </AuthFormWrapper>
    </Section>
  );
};

export default ResetPasswordID;
