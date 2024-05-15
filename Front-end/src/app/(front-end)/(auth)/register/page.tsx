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

/**
 * {
    "data": {
        "message": "The email has already been taken.",
        "errors": {
            "email": [
                "The email has already been taken."
            ]
        }
    },
    "status": 422,
    "statusText": "Unprocessable Content"
}
 */

/**
 * {
    "data": {
        "name": "shorif",
        "email": "some@gmail.com",
        "phone": "1234234234234",
        "updated_at": "2024-05-02T01:59:35.000000Z",
        "created_at": "2024-05-02T01:59:35.000000Z",
        "id": 37
    },
    "status": 200,
    "statusText": "OK"
}
 */
