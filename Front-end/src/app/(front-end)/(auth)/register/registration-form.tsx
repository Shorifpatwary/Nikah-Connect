"use client";
import Error from "@/components/blocks/error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
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
import { RegisterData, RVMassage } from "./register-data";
type Props = {};

// Valibot
const RegistrationSchema = object(
  {
    name: string([
      minLength(1, RVMassage.name.required),
      minLength(4, RVMassage.name.minLength),
      maxLength(50, RVMassage.name.maxLength),
    ]),
    email: string([
      minLength(1, RVMassage.email.required),
      minLength(4, RVMassage.email.minLength),
      email(RVMassage.email.email),
      maxLength(50, RVMassage.email.maxLength),
    ]),
    password: string([
      minLength(1, RVMassage.password.required),
      minLength(4, RVMassage.password.minLength),
      maxLength(30, RVMassage.password.maxLength),
    ]),
    password_confirmation: string([
      minLength(1, RVMassage.password_confirmation.required),
    ]),
    phone: string([maxLength(50, RVMassage.phone.maxLength)]),
  },
  [
    forward(
      custom(
        input => input.password === input.password_confirmation,
        RVMassage.password_confirmation.confirm
      ),
      ["password_confirmation"]
    ),
  ]
);
export type RegistrationSchemaType = Output<typeof RegistrationSchema>;
const RegistrationForm = (props: Props) => {
  const router = useRouter();
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
    const response = await createUser(FormData);
    // If there are errors in the response, set each error using setError
    if (response?.status === 422) {
      if (response.data?.errors) {
        Object.keys(response.data?.errors).forEach(fieldName => {
          setError(fieldName as keyof RegistrationSchemaType, {
            type: "server",
            message: response.data?.errors[fieldName][0],
          });
        });
      }
    } else if (response.status === 204 || response.status === 200) {
      reset();
      // router.push(RegisterData.successRedirectUrl);
    }
  };
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* name */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="name" className="capitalize">
            {RegisterData.inputs.name.title}
          </Label>
          <Input
            id="name"
            placeholder={RegisterData.inputs.name.placeholder}
            type="text"
            {...register("name")}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </div>
        {/* email */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="email" className="capitalize">
            {RegisterData.inputs.email.title}
          </Label>
          <Input
            id="email"
            placeholder={RegisterData.inputs.email.placeholder}
            required
            type="email"
            {...register("email")}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </div>
        {/* phone */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="phone" className="capitalize">
            {RegisterData.inputs.phone.title}
          </Label>
          <Input
            id="phone"
            type="phone"
            placeholder={RegisterData.inputs.phone.placeholder}
            {...register("phone")}
          />
          {errors.phone && <Error>{errors.phone.message}</Error>}
        </div>
        {/* password */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="password" className="capitalize ">
            {RegisterData.inputs.password.title}
          </Label>
          <Input
            id="password"
            type="password"
            placeholder={RegisterData.inputs.password.placeholder}
            {...register("password")}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>
        {/* confirm password */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="password_confirmation" className="capitalize ">
            {RegisterData.inputs.password_confirmation.title}
          </Label>
          <Input
            id="password_confirmation"
            type="password"
            placeholder={RegisterData.inputs.password_confirmation.placeholder}
            {...register("password_confirmation")}
          />
          {errors.password_confirmation && (
            <Error>{errors.password_confirmation.message}</Error>
          )}
        </div>
        {/* submit */}
        <Button className="mt-3 w-full text-base" type="submit">
          {RegisterData.submit}
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
