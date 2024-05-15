"use client";
import { formData, ValidationMassage } from "@/app/(front-end)/(auth)/data";
import Error from "@/components/blocks/error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { SubmitHandler, useForm } from "react-hook-form";
import { email, maxLength, minLength, object, Output, string } from "valibot";
import ForgetPassword from "./forget-password";

type Props = {};

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
const ForgetPasswordForm = (props: Props) => {
  // hooks
  const { toast } = useToast();
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
    const response = await ForgetPassword<ForgetSchemaType>(FormData);
    // If there are errors in the response, set each error using setError
    if (response?.status === 422) {
      if (response.data?.errors) {
        Object.keys(response.data?.errors).forEach(fieldName => {
          setError(fieldName as keyof ForgetSchemaType, {
            type: "server",
            message: response.data?.errors?.[fieldName]?.[0],
          });
        });
      }
      toast({
        title: "ই-মেইল পাঠানো সম্ভব হয়নি। ",
        variant: "destructive",
        description: "অনুগ্রহ করে আবার চেষ্টা করুন।",
      });
    } else if (response.status === 204 || response.status === 200) {
      reset();
      toast({
        title: "সফলভাবে ই-মেইল পাঠানো হয়েছে।",
        variant: "primary",
        description:
          "পাসওয়ার্ড পরিবর্তন করতে আপনার ই-মেইল এ দেওয়া লিংক এ ক্লিক করুন।",
      });
    }
  };
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* email */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="email" className="capitalize">
            {formData.inputs.email.title}
          </Label>
          <Input
            id="email"
            placeholder={formData.inputs.email.placeholder}
            required
            type="email"
            {...register("email")}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </div>
        {/* submit */}
        <Button className="mt-3 w-full text-base" type="submit">
          {formData.forgetPassword.submit}
        </Button>
        <Toaster />
      </div>
    </form>
  );
};

export default ForgetPasswordForm;
