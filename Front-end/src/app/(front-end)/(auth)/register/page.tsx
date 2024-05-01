import AuthFormWrapper from "../auth-form-wrapper";
import { RegisterData } from "./register-data";
import RegistrationForm from "./registration-form";

export default function Component() {
  return (
    <div className="p-6 py-24 sm:p-10">
      <AuthFormWrapper formTitle={RegisterData.title}>
        {/* registration form */}
        <RegistrationForm />
      </AuthFormWrapper>
    </div>
  );
}
