"use client";
import { formData, ValidationMassage } from "@/app/(front-end)/(auth)/data";
import { roles } from "@/assets/data/config/app.config";
import Error from "@/components/blocks/error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  email,
  maxLength,
  minLength,
  nullable,
  object,
  Output,
  picklist,
  string,
} from "valibot";

// Valibot
const Schema = object({
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
  role: nullable(
    picklist(roles.map(role => role.name)),
    "Please select User role."
  ),
  // assign user role field
  phone: string([maxLength(50, ValidationMassage.phone.maxLength)]),
});
export type UserEditSchemaType = Output<typeof Schema>;
const UserEditForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
    getValues,
    reset,
  } = useForm<UserEditSchemaType>({
    resolver: valibotResolver(Schema),
  });
  const onSubmit: SubmitHandler<UserEditSchemaType> = async FormData => {
    // await getCsrfCookie();
    // const response = await createUser<UserEditSchemaType>(FormData);
    // If there are errors in the response, set each error using setError
    // if (response?.errors) {
    //   (Object.keys(response?.errors) as (keyof UserEditSchemaType)[]).forEach(
    //     fieldName => {
    //       setError(fieldName, {
    //         type: "server",
    //         message: response.errors?.[fieldName]?.[0],
    //       });
    //     }
    //   );
    //   toast({
    //     title: formData.register.error.title,
    //     variant: "destructive",
    //     description: formData.register.error.description,
    //   });
    // } else {
    //   reset();
    //   toast({
    //     title: formData.register.success.title,
    //     variant: "primary",
    //     description: formData.register.success.description,
    //   });
    //   // redirect
    //   router.push(formData.register.success.redirectUrl);
    // }
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
        {/* user role */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="role" className="capitalize">
            {formData.inputs.phone.title}
          </Label>
          <Select onValueChange={value => setValue("role", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a user role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="capitalize">user roles</SelectLabel>
                {roles.map(role => (
                  <SelectItem
                    key={role.label + role.name}
                    className="capitalize"
                    value={role.name}
                  >
                    {role.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.role && <Error>{errors.role.message}</Error>}
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

        {/* submit */}
        <Button className="mt-3 w-full text-base" type="submit">
          {formData.register.submit}
        </Button>
      </div>
      <Toaster />
    </form>
  );
};

export default UserEditForm;
