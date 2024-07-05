"use client";
import { formData, ValidationMassage } from "@/app/(front-end)/(auth)/data";
import { Login } from "@/app/(front-end)/(auth)/login/login";
import TextInputBox from "@/components/blocks/inputBox/textInputBox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { email, maxLength, minLength, object, Output, string } from "valibot";

// Valibot
const LoginSchema = object({
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
});
export type LoginSchemaType = Output<typeof LoginSchema>;
const LoginForm = () => {
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
  } = useForm<LoginSchemaType>({
    resolver: valibotResolver(LoginSchema),
  });
  const onSubmit: SubmitHandler<LoginSchemaType> = async FormData => {
    await Login<LoginSchemaType>({
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
        {/* email */}
        <TextInputBox
          label={formData.inputs.email.title}
          errorMessage={errors.email?.message}
          fieldName="email"
          placeholder={formData.inputs.email.placeholder}
          type="email"
          register={register("email")}
        />
        {errors.email && "something went wrong!"}
        {/* password */}
        <TextInputBox
          label={
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{formData.inputs.password.title}</Label>
              <Link
                className="underline"
                href={formData.inputs.password.forgetLink}
                prefetch={false}
              >
                {formData.inputs.password.forget}
              </Link>
            </div>
          }
          errorMessage={errors.password?.message}
          fieldName="password"
          placeholder={formData.inputs.password.placeholder}
          type="password"
          register={register("password")}
        />
        {/* submit */}
        <Button
          className="mt-3 w-full text-base"
          type="submit"
          disabled={isFormLoading}
        >
          {isFormLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {formData.wait}
            </>
          ) : (
            formData.login.submit
          )}
        </Button>
      </div>
      <Toaster />
    </form>
  );
};

// !warning: don't use react memo.
export default LoginForm;
