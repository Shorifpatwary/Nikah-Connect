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
import Routes from "@/assets/data/route";
import TextInputBox from "@/components/blocks/inputBox/textInputBox";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
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
    const response = await ResetPassword<ResetSchemaType>(FormData);
    // If there are errors in the response, set each error using setError
    if (response.errors) {
      (Object.keys(response?.errors) as (keyof ResetSchemaType)[]).forEach(
        fieldName => {
          setError(fieldName, {
            type: "server",
            message: response.errors?.[fieldName]?.[0],
          });
        }
      );
      toast({
        title: response?.message,
        variant: "destructive",
        description:
          "পসওয়ার্ড পরিবর্তন সফল হয়নি। আপনি Forget Password পেজ এ গিয়ে আবার চেষ্টা করুন।",
      });
    } else {
      reset();
      toast({
        title: "পাসওয়ার্ড পরিবর্তন করা হয়েছে।",
        variant: "primary",
        description:
          "আপনার পাসওয়ার্ড পরিবর্তন করা হয়েছে। অনুগ্রহ করে Login পেজ হতে লগিন করার চেষ্টা করুন। ",
      });
      router.push(Routes.Login);
    }
  };

  // return user when entering wrong URL:
  useEffect(() => {
    if (!email && params.id) {
      toast({
        title: "ভূল URL প্রদান করা হয়েছে।",
        variant: "destructive",
        description:
          "আপনার দেওয়া URL টিতে ভূল রয়েছে। দয়া করে ই-মেইল এ দেওয়া লিংক এ ক্লিক করুন।",
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
          type="text"
          {...register("password")}
        />

        {/* confirm password */}
        <TextInputBox
          label={formData.inputs.password_confirmation.title}
          errorMessage={errors.password_confirmation?.message}
          fieldName="password_confirmation"
          placeholder={formData.inputs.password_confirmation.placeholder}
          type="text"
          {...register("password_confirmation")}
        />

        {/* token as hidden inputs [token & email] */}
        <Input
          id="token"
          type="hidden"
          {...register("token")}
          value={params.id || ""}
        />
        <Input
          id="email"
          type="email"
          className="read-only  hidden"
          {...register("email")}
          value={email as string}
        />
        {/* submit */}
        <Button className="mt-3 w-full text-base" type="submit">
          {formData.resetPassword.submit}
        </Button>
        <Toaster />
      </div>
    </form>
  );
};

export default ResetPasswordForm;
