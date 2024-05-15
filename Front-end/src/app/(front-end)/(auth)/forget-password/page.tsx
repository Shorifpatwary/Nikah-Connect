import Section from "@/components/blocks/section";
import AuthFormWrapper from "../auth-form-wrapper";
import { formData } from "../data";
import ForgetPasswordForm from "./forget-form";

type Props = {};

const ForgetPasswordPage = (props: Props) => {
  return (
    <Section rowClassName="justify-center">
      <AuthFormWrapper
        formType="forget-password"
        formTitle={formData.forgetPassword.title}
      >
        <ForgetPasswordForm />
      </AuthFormWrapper>
    </Section>
  );
};

export default ForgetPasswordPage;
