"use client";
import { formData, ValidationMassage } from "@/app/(front-end)/(auth)/data";
import Error from "@/components/blocks/error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { email, maxLength, minLength, object, Output, string } from "valibot";
import { createCookie } from "../authCookie";
import Login from "./login";

type Props = {};

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
const LoginForm = (props: Props) => {
  const router = useRouter();
  const { toast } = useToast();
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
    const response = await Login<LoginSchemaType>(FormData);
    // If there are errors in the response, set each error using setError
    if (response?.status === 422) {
      if (response.data?.errors) {
        Object.keys(response.data?.errors).forEach(fieldName => {
          setError(fieldName as keyof LoginSchemaType, {
            type: "server",
            message: response.data?.errors?.[fieldName]?.[0],
          });
        });
      }
      toast({
        title: formData.login.error.title,
        variant: "destructive",
        description: formData.login.error.description,
      });
    } else if (response.status === 204 || response.status === 200) {
      reset();
      toast({
        title: formData.register.success.title,
        variant: "primary",
        description: formData.register.success.description,
      });
      // set user data to the cookie only when response send a user data
      if (response.data.id) {
        createCookie(response.data);
      }
      // wait and redirect
      setTimeout(() => {
        router.push(formData.login.success.redirectUrl);
      }, 3000);
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

        {/* password */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="password" className="capitalize ">
            {/*  */}
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{formData.inputs.password.title}</Label>
              <Link
                className="underline"
                href={formData.inputs.password.forgetLink}
              >
                {formData.inputs.password.forget}
              </Link>
            </div>
          </Label>
          <Input
            id="password"
            type="password"
            placeholder={formData.inputs.password.placeholder}
            {...register("password")}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>

        {/* submit */}
        <Button className="mt-3 w-full text-base" type="submit">
          {formData.login.submit}
        </Button>
      </div>
      <Toaster />
    </form>
  );
};

export default LoginForm;
