"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { valibotResolver } from "@hookform/resolvers/valibot";
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

import { formData, ValidationMassage } from "@/app/(front-end)/(auth)/data";
import Routes from "@/assets/data/routes";
import TextInputBox from "@/components/blocks/inputBox/textInputBox";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ResetPassword from "./reset-password";

// Valibot
const Schema = object(
  {
    password: string([
      minLength(1, ValidationMassage.password.required),
      minLength(4, ValidationMassage.password.minLength),
      maxLength(30, ValidationMassage.password.maxLength),
    ]),
    password_confirmation: string([
      minLength(1, ValidationMassage.password_confirmation.required),
    ]),
    token: string([minLength(1, "This field is required!")]),
    email: string([
      minLength(1, ValidationMassage.email.required),
      minLength(4, ValidationMassage.email.minLength),
      email(ValidationMassage.email.email),
      maxLength(50, ValidationMassage.email.maxLength),
    ]),
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
export type ResetSchemaType = Output<typeof Schema>;
const ResetPasswordForm = () => {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

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
  } = useForm<ResetSchemaType>({
    resolver: valibotResolver(Schema),
  });

  const onSubmit: SubmitHandler<ResetSchemaType> = async FormData => {
    await ResetPassword<ResetSchemaType>({
      data: FormData,
      setError,
      reset,
      toast,
      router,
      setIsFormLoading,
    });
  };

  // return user when entering wrong URL:
  useEffect(() => {
    if (!email && params.id) {
      toast({
        title: formData.resetPassword.wrongUrl.title,
        variant: "destructive",
        description: formData.resetPassword.wrongUrl.description,
      });
      //  redirect
      router.push(Routes.ForgetPassword);
    }
  }, []);

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* password */}
        <TextInputBox
          label={formData.inputs.newPassword.title}
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

        {/* token as hidden inputs [token & email] */}
        <Input type="hidden" {...register("token")} value={params.id || ""} />
        <Input
          type="hidden"
          className="read-only  hidden"
          {...register("email")}
          value={email as string}
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
            formData.resetPassword.submit
          )}
        </Button>
        <Toaster />
      </div>
    </form>
  );
};

export default ResetPasswordForm;
