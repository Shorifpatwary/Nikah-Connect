"use client";
import Error from "@/components/blocks/error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { email, maxLength, minLength, object, Output, string } from "valibot";
import { RegisterData, RVMassage } from "./register-data";
type Props = {};

// Valibot
const LoginSchema = object({
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
});
export type LoginSchemaType = Output<typeof LoginSchema>;
const LoginForm = (props: Props) => {
  const router = useRouter();
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
    const response = await LoginUser(FormData);
    // If there are errors in the response, set each error using setError
    if (response?.status === 422) {
      if (response.data?.errors) {
        Object.keys(response.data?.errors).forEach(fieldName => {
          setError(fieldName as keyof LoginSchemaType, {
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

        {/* submit */}
        <Button className="mt-3 w-full text-base" type="submit">
          {RegisterData.submit}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
