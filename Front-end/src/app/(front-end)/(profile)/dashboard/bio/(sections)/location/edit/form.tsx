"use client";
import fetchBioSection from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/fetchBioSection";
import {
  Data,
  VM,
} from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/location/data";
import { updateBioLocation } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/location/edit/action";
import { BioWithLocationSection } from "@/assets/data/response-types/bio";
import SubmitLoader from "@/components/blocks/form-helper/submit-loader";
import TextareaBox from "@/components/blocks/inputBox/TextareaBox";
import TableSkeleton from "@/components/blocks/SS-table/table-skeleton";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  maxLength,
  minLength,
  nullable,
  object,
  Output,
  string,
} from "valibot";

const Schema = object({
  permanent_address: string([
    minLength(1, VM.permanent_address.required),
    minLength(10, VM.permanent_address.minLength),
    maxLength(1000, VM.permanent_address.maxLength),
  ]),
  present_address: nullable(
    string([maxLength(1000, VM.present_address.maxLength)])
  ),
  relocate_plan: nullable(
    string([maxLength(1000, VM.relocate_plan.maxLength)])
  ),
  childhood_address: nullable(
    string([maxLength(1000, VM.childhood_address.maxLength)])
  ),
});

export type LocationEditSchemaType = Output<typeof Schema>;

const BioLocationEditForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [bioWithLocation, setBioWithLocation] =
    useState<BioWithLocationSection | null>(null);

  useEffect(() => {
    fetchBioSection<BioWithLocationSection>("location", setBioWithLocation);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
  } = useForm<LocationEditSchemaType>({
    resolver: valibotResolver(Schema),
  });

  useEffect(() => {
    if (bioWithLocation?.location_section) {
      const location = bioWithLocation?.location_section;
      Object.entries(location).forEach(([key, value]) => {
        setValue(key as keyof LocationEditSchemaType, value || "");
      });
    }
  }, [bioWithLocation, setValue]);

  const onSubmit: SubmitHandler<LocationEditSchemaType> = async FormData => {
    await updateBioLocation<LocationEditSchemaType>({
      data: FormData,
      bio: bioWithLocation,
      setError,
      reset,
      toast,
      router,
      setIsFormLoading,
    });
  };

  if (!bioWithLocation) {
    return <TableSkeleton rowCount={10} rowClassName="h-10 mt-2" />;
  }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* Permanent Address */}
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

        {/* Submit */}
        <Button
          className={`mt-3 w-full text-base`}
          type="submit"
          disabled={isFormLoading}
        >
          {isFormLoading ? (
            <SubmitLoader text={Data.wait} />
          ) : (
            Data.create.submit
          )}
        </Button>
      </div>
      <Toaster />
    </form>
  );
};

export default BioLocationEditForm;
