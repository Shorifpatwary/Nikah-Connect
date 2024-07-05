"use client";
import { formData, ValidationMassage } from "@/app/(front-end)/(auth)/data";
import ForgetPassword from "@/app/(front-end)/(auth)/forget-password/forget-password";
import TextInputBox from "@/components/blocks/inputBox/textInputBox";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { email, maxLength, minLength, object, Output, string } from "valibot";

// Valibot
const Schema = object({
  email: string([
    minLength(1, ValidationMassage.email.required),
    minLength(4, ValidationMassage.email.minLength),
    email(ValidationMassage.email.email),
    maxLength(50, ValidationMassage.email.maxLength),
  ]),
});
export type ForgetSchemaType = Output<typeof Schema>;
const ForgetPasswordForm = () => {
  // hooks
  const { toast } = useToast();
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ForgetSchemaType>({
    resolver: valibotResolver(Schema),
  });
  const onSubmit: SubmitHandler<ForgetSchemaType> = async FormData => {
    await ForgetPassword<ForgetSchemaType>({
      data: FormData,
      setError,
      reset,
      toast,
      setIsFormLoading,
    });

    // If there are errors in the response, set each error using setError
  };
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* email */}
        <TextInputBox
          label={formData.inputs.email.title}
          errorMessage={errors.email?.message}
          fieldName="email"
          placeholder={formData.inputs.email.placeholder}
          type="email"
          register={register("email")}
        />
        {/* submit */}
        <Button
          className={`mt-3 w-full text-base`}
          type="submit"
          disabled={isFormLoading}
        >
          {isFormLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {formData.wait}
            </>
          ) : (
            formData.forgetPassword.submit
          )}
        </Button>
        <Toaster />
      </div>
    </form>
  );
};

export default ForgetPasswordForm;
