import AuthFormWrapper from "../auth-form-wrapper";
import RegistrationForm from "../register/registration-form";
import LoginPage from "./login-form";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <AuthFormWrapper formType="login" formTitle="login title">
      {/* registration form */}
      <RegistrationForm />
      <LoginPage />
    </AuthFormWrapper>
  );
};

export default LoginPage;
