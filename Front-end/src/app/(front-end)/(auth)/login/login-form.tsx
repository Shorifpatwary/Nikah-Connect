"use client";
import { formData, ValidationMassage } from "@/app/(front-end)/(auth)/data";
import { Login } from "@/app/(front-end)/(auth)/login/login";
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
    if (response.errors) {
      (Object.keys(response?.errors) as (keyof LoginSchemaType)[]).forEach(
        fieldName => {
          setError(fieldName, {
            type: "server",
            message: response.errors?.[fieldName]?.[0],
          });
        }
      );
      toast({
        title: formData.login.error.title,
        variant: "destructive",
        description: formData.register.error.description,
      });
    } else {
      reset();
      toast({
        title: formData.login.success.title,
        variant: "primary",
        description: formData.login.success.description,
      });
      // redirect
      router.push(formData.login.success.redirectUrl);
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
                prefetch={false}
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
