"use client";
import Error from "@/components/blocks/error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    if (response?.status === 422) {
      if (response.data?.errors) {
        Object.keys(response.data?.errors).forEach(fieldName => {
          setError(fieldName as keyof ResetSchemaType, {
            type: "server",
            message: response.data?.errors?.[fieldName]?.[0],
          });
        });
      }
      toast({
        title: response.data?.message,
        variant: "destructive",
        description:
          "পসওয়ার্ড পরিবর্তন সফল হয়নি। আপনি Forget Password পেজ এ গিয়ে আবার চেষ্টা করুন।",
      });
      // wait and redirect
      setTimeout(() => {
        router.push(Routes.ForgetPassword);
      }, 3000);
    } else if (response.status === 204 || response.status === 200) {
      reset();
      toast({
        title: "পাসওয়ার্ড পরিবর্তন করা হয়েছে।",
        variant: "primary",
        description:
          "আপনার পাসওয়ার্ড পরিবর্তন করা হয়েছে। অনুগ্রহ করে Login পেজ হতে লগিন করার চেষ্টা করুন। ",
      });
      // wait and redirect
      setTimeout(() => {
        router.push(Routes.Login);
      }, 3000);
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
      // wait and redirect
      setTimeout(() => {
        router.push(Routes.ForgetPassword);
      }, 3000);
    }
  }, []);

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* password */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="password" className="capitalize ">
            {formData.inputs.password.title}
          </Label>
          <Input
            id="password"
            type="password"
            placeholder={formData.inputs.password.placeholder}
            {...register("password")}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>
        {/* confirm password */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="password_confirmation" className="capitalize ">
            {formData.inputs.password_confirmation.title}
          </Label>
          <Input
            id="password_confirmation"
            type="password"
            placeholder={formData.inputs.password_confirmation.placeholder}
            {...register("password_confirmation")}
          />
          {errors.password_confirmation && (
            <Error>{errors.password_confirmation.message}</Error>
          )}
        </div>
        {/* token as hidden inputs [token & email] */}
        <Input
          id="token"
          type="hidden"
          {...register("token")}
          value={params.id}
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
