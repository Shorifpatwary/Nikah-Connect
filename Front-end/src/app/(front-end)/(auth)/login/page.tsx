import { formData } from "@/app/(front-end)/(auth)/data";
import Section from "@/components/blocks/section";
import AuthFormWrapper from "../auth-form-wrapper";
import LoginForm from "./login-form";

const LoginPage = () => {
  return (
    <Section rowClassName="justify-center">
      <AuthFormWrapper formType="login" formTitle={formData.login.title}>
        <LoginForm />
      </AuthFormWrapper>
    </Section>
  );
};

export default LoginPage;
