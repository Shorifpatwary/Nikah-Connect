"use client";
import { createBioLocation } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/location/create/action";
import {
  Data,
  VM,
} from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/location/create/data";
import SubmitLoader from "@/components/blocks/form-helper/submit-loader";
import TextareaBox from "@/components/blocks/inputBox/TextareaBox";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { maxLength, minLength, object, Output, string } from "valibot";

// Valibot
const Schema = object({
  permanent_address: string([
    minLength(1, VM.permanent_address.required),
    maxLength(1000, VM.permanent_address.maxLength),
  ]),
  present_address: string([maxLength(1000, VM.present_address.maxLength)]),
  relocate_plan: string([maxLength(1000, VM.relocate_plan.maxLength)]),
  childhood_address: string([maxLength(1000, VM.childhood_address.maxLength)]),
});
export type LocationCreateSchemaType = Output<typeof Schema>;
const BioLocationCreateForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  // form status
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<LocationCreateSchemaType>({
    resolver: valibotResolver(Schema),
  });
  const onSubmit: SubmitHandler<LocationCreateSchemaType> = async FormData => {
    await createBioLocation<LocationCreateSchemaType>({
      data: FormData,
      setError,
      reset,
      toast,
      router,
      setIsFormLoading,
    });
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* date of birth */}
        <TextareaBox
          label={Data.inputs.permanent_address.title}
          labelRequired={true}
          errorMessage={errors.permanent_address?.message}
          fieldName="permanent_address"
          placeholder={Data.inputs.permanent_address.placeholder}
          suggestions={Data.inputs.permanent_address.suggestions}
          register={register("permanent_address")}
        />

        {/* Present Address */}
        <TextareaBox
          label={Data.inputs.present_address.title}
          errorMessage={errors.present_address?.message}
          fieldName="present_address"
          placeholder={Data.inputs.present_address.placeholder}
          suggestions={Data.inputs.present_address.suggestions}
          register={register("present_address")}
        />

        {/* Relocate Plan */}
        <TextareaBox
          label={Data.inputs.relocate_plan.title}
          errorMessage={errors.relocate_plan?.message}
          fieldName="relocate_plan"
          placeholder={Data.inputs.relocate_plan.placeholder}
          suggestions={Data.inputs.relocate_plan.suggestions}
          register={register("relocate_plan")}
        />

        {/* Childhood Address */}
        <TextareaBox
          label={Data.inputs.childhood_address.title}
          errorMessage={errors.childhood_address?.message}
          fieldName="childhood_address"
          placeholder={Data.inputs.childhood_address.placeholder}
          suggestions={Data.inputs.childhood_address.suggestions}
          register={register("childhood_address")}
        />

        {/* submit */}
        <Button
          className={`mt-3 w-full text-base`}
          type="submit"
          disabled={isFormLoading}
        >
          {isFormLoading ? <SubmitLoader text={Data.wait} /> : Data.submit}
        </Button>
      </div>
      <Toaster />
    </form>
  );
};

export default BioLocationCreateForm;
