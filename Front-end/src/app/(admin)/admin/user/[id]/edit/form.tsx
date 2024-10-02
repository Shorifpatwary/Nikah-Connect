"use client";
import { formData, ValidationMassage } from "@/app/(front-end)/(auth)/data";
import { roles } from "@/assets/data/config/app.config";
import SelectBox from "@/components/blocks/inputBox/selectBox";
import TextInputBox from "@/components/blocks/inputBox/textInputBox";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  email,
  maxLength,
  minLength,
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
  // role: nullable(
  //   picklist(roles.map(role => role.value)),
  //   "Please select User role."
  // ),
  role: picklist(roles.map(role => role.value)),
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
        <TextInputBox
          label={formData.inputs.name.title}
          errorMessage={errors.name?.message}
          fieldName="name"
          placeholder={formData.inputs.name.placeholder}
          register={register("name")}
        />
        {/* email */}
        <TextInputBox
          label={formData.inputs.email.title}
          errorMessage={errors.email?.message}
          fieldName="email"
          placeholder={formData.inputs.email.placeholder}
          type="email"
          register={register("email")}
        />
        {/* user role */}
        <SelectBox
          label={formData.inputs.phone.title}
          triggerText={formData.inputs.phone.title}
          options={roles}
          errorMessage={errors.role?.message}
          setValue={(value: string) => setValue("role", value)}
        />
        {/* phone */}
        <TextInputBox
          label={formData.inputs.phone.title}
          errorMessage={errors.phone?.message}
          fieldName="phone"
          placeholder={formData.inputs.phone.placeholder}
          register={register("phone")}
        />
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
