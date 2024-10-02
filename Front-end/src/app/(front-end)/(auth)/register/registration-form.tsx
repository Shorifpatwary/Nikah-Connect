"use client";
import { formData, ValidationMassage } from "@/app/(front-end)/(auth)/data";
import { createUser } from "@/app/(front-end)/(auth)/register/createUser";
import SubmitLoader from "@/components/blocks/form-helper/submit-loader";
import TextInputBox from "@/components/blocks/inputBox/textInputBox";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  custom,
  email,
  forward,
  maxLength,
  minLength,
  object,
  Output,
  string,
} from "valibot";

// Valibot
const RegistrationSchema = object(
  {
    name: string([
      minLength(1, ValidationMassage.name.required),
      minLength(4, ValidationMassage.name.minLength),
      maxLength(50, ValidationMassage.name.maxLength),
    ]),
    email: string([
      minLength(1, ValidationMassage.email.required),
      minLength(4, ValidationMassage.email.minLength),
      email(ValidationMassage.email.email),
      maxLength(50, ValidationMassage.email.maxLength),
    ]),
    password: string([
      minLength(1, ValidationMassage.password.required),
      minLength(4, ValidationMassage.password.minLength),
      maxLength(30, ValidationMassage.password.maxLength),
    ]),
    password_confirmation: string([
      minLength(1, ValidationMassage.password_confirmation.required),
    ]),
    phone: string([maxLength(50, ValidationMassage.phone.maxLength)]),
  },
  [
    forward(
      custom(
        input => input.password === input.password_confirmation,
        ValidationMassage.password_confirmation.confirm
      ),
      ["password_confirmation"]
    ),
  ]
);
export type RegistrationSchemaType = Output<typeof RegistrationSchema>;
const RegistrationForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  // form status
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<RegistrationSchemaType>({
    resolver: valibotResolver(RegistrationSchema),
  });
  const onSubmit: SubmitHandler<RegistrationSchemaType> = async FormData => {
    await createUser<RegistrationSchemaType>({
      data: FormData,
      setError,
      reset,
      toast,
      router,
      setIsFormLoading,
    });
  };
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* name */}
        <TextInputBox
          label={formData.inputs.name.title}
          errorMessage={errors.name?.message}
          fieldName="name"
          placeholder={formData.inputs.name.placeholder}
          register={register("name")}
        />
        {/* email */}
        <TextInputBox
          label={formData.inputs.email.title}
          errorMessage={errors.email?.message}
          fieldName="email"
          type="email"
          placeholder={formData.inputs.email.placeholder}
          register={register("email")}
        />
        {/* phone */}
        <TextInputBox
          label={formData.inputs.phone.title}
          errorMessage={errors.phone?.message}
          fieldName="phone"
          placeholder={formData.inputs.phone.placeholder}
          register={register("phone")}
        />
        {/* password */}
        <TextInputBox
          label={formData.inputs.password.title}
          errorMessage={errors.password?.message}
          fieldName="password"
          placeholder={formData.inputs.password.placeholder}
          type="password"
          register={register("password")}
        />
        {/* confirm password */}
        <TextInputBox
          label={formData.inputs.password_confirmation.title}
          errorMessage={errors.password_confirmation?.message}
          fieldName="password_confirmation"
          placeholder={formData.inputs.password_confirmation.placeholder}
          type="password"
          register={register("password_confirmation")}
        />
        {/* submit */}
        <Button
          className={`mt-3 w-full text-base`}
          type="submit"
          disabled={isFormLoading}
        >
          {isFormLoading ? (
            <SubmitLoader text={formData.wait} />
          ) : (
            formData.register.submit
          )}
        </Button>
      </div>
      <Toaster />
    </form>
  );
};

export default RegistrationForm;
