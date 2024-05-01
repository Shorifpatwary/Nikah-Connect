import AuthFormWrapper from "../auth-form-wrapper";
import RegistrationForm from "../register/registration-form";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <AuthFormWrapper formType="login" formTitle="login title">
      {/* registration form */}
      <RegistrationForm />
    </AuthFormWrapper>
  );
};

export default LoginPage;
