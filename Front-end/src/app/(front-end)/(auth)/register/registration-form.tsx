"use client";
import { formData, ValidationMassage } from "@/app/(front-end)/(auth)/data";
import Error from "@/components/blocks/error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
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
import { createUser } from "./createUser";

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
  const router = useRouter();
  const { pending } = useFormStatus();
  const { toast } = useToast();
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
    // await getCsrfCookie();
    const response = await createUser<RegistrationSchemaType>(FormData);
    // If there are errors in the response, set each error using setError
    if (response?.errors) {
      (
        Object.keys(response?.errors) as (keyof RegistrationSchemaType)[]
      ).forEach(fieldName => {
        setError(fieldName, {
          type: "server",
          message: response.errors?.[fieldName]?.[0],
        });
      });
      toast({
        title: formData.register.error.title,
        variant: "destructive",
        description: formData.register.error.description,
      });
    } else {
      reset();
      toast({
        title: formData.register.success.title,
        variant: "primary",
        description: formData.register.success.description,
      });
      // redirect
      router.push(formData.register.success.redirectUrl);
    }
  };
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* name */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="name" className="capitalize">
            {formData.inputs.name.title}
          </Label>
          <Input
            id="name"
            placeholder={formData.inputs.name.placeholder}
            type="text"
            {...register("name")}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </div>
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
        {/* phone */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="phone" className="capitalize">
            {formData.inputs.phone.title}
          </Label>
          <Input
            id="phone"
            type="phone"
            placeholder={formData.inputs.phone.placeholder}
            {...register("phone")}
          />
          {errors.phone && <Error>{errors.phone.message}</Error>}
        </div>
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
        {/* submit */}
        <Button className="mt-3 w-full text-base" type="submit" disabled={pending}>
          {pending ? 'loading' : "register"}
          {/* {formData.register.submit} */}
        </Button>
      </div>
      <Toaster />
    </form>
  );
};

export default RegistrationForm;
