"use client";

import { updateBioFamilyInfo } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/family-info/edit/action";
import {
  Data,
  VM,
} from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/family-info/edit/data";
import fetchBioSection from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/fetchBioSection";
import { economic_status } from "@/assets/data/config/app.config";
import { FamilyInfoSectionInterface } from "@/assets/data/response-types/bio";
import SubmitLoader from "@/components/blocks/form-helper/submit-loader";
import SelectBox from "@/components/blocks/inputBox/selectBox";
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
  object,
  Output,
  picklist,
  string,
} from "valibot";

// Valibot schema
const Schema = object({
  family_members_info: string([
    minLength(1, VM.family_members_info.required),
    minLength(10, VM.family_members_info.minLength),
    maxLength(1500, VM.family_members_info.maxLength),
  ]),
  uncles_info: string([
    maxLength(1000, VM.uncles_info.maxLength), // Optional field
  ]),
  descent: string([
    maxLength(1000, VM.descent.maxLength), // Optional field
  ]),
  economic_status: picklist(
    economic_status.map(option => option.value),
    VM.economic_status.required
  ),
  economic_status_details: string([
    minLength(1, VM.economic_status_details.required),
    minLength(10, VM.economic_status_details.minLength),
    maxLength(1500, VM.economic_status_details.maxLength),
  ]),
});

export type FamilyInfoEditSchemaType = Output<typeof Schema>;

const BioFamilyInfoEditForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  // Form status
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [familyInfo, setFamilyInfo] =
    useState<FamilyInfoSectionInterface | null>(null);

  useEffect(() => {
    fetchBioSection<FamilyInfoSectionInterface>("family", setFamilyInfo);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
  } = useForm<FamilyInfoEditSchemaType>({
    resolver: valibotResolver(Schema),
  });

  useEffect(() => {
    if (familyInfo) {
      Object.entries(familyInfo).forEach(([key, value]) => {
        setValue(key as keyof FamilyInfoEditSchemaType, value || "");
      });
    }
  }, [familyInfo, setValue]);

  const onSubmit: SubmitHandler<FamilyInfoEditSchemaType> = async formData => {
    await updateBioFamilyInfo<FamilyInfoEditSchemaType>({
      data: formData,
      // @ts-expect-error
      id: familyInfo?.id,
      setError,
      reset,
      toast,
      router,
      setIsFormLoading,
    });
  };

  if (!familyInfo) {
    return <TableSkeleton rowCount={10} rowClassName="h-10 mt-2" />;
  }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* Family Members Info */}
        <TextareaBox
          label={Data.inputs.family_members_info.title}
          labelRequired={true}
          errorMessage={errors.family_members_info?.message}
          fieldName="family_members_info"
          placeholder={Data.inputs.family_members_info.placeholder}
          suggestions={Data.inputs.family_members_info.suggestions}
          register={register("family_members_info")}
        />

        {/* Uncles Info */}
        <TextareaBox
          label={Data.inputs.uncles_info.title}
          errorMessage={errors.uncles_info?.message}
          fieldName="uncles_info"
          placeholder={Data.inputs.uncles_info.placeholder}
          suggestions={Data.inputs.uncles_info.suggestions}
          register={register("uncles_info")}
        />

        {/* Descent */}
        <TextareaBox
          label={Data.inputs.descent.title}
          errorMessage={errors.descent?.message}
          fieldName="descent"
          placeholder={Data.inputs.descent.placeholder}
          suggestions={Data.inputs.descent.suggestions}
          register={register("descent")}
        />

        {/* Economic Status */}
        <SelectBox
          label={Data.inputs.economic_status.title}
          labelRequired={true}
          triggerText={Data.inputs.economic_status.triggerText}
          options={economic_status}
          errorMessage={errors.economic_status?.message}
          setValue={value => setValue("economic_status", value)}
          defaultValue={familyInfo.economic_status}
        />

        {/* Economic Status Details */}
        <TextareaBox
          label={Data.inputs.economic_status_details.title}
          labelRequired={true}
          errorMessage={errors.economic_status_details?.message}
          fieldName="economic_status_details"
          placeholder={Data.inputs.economic_status_details.placeholder}
          suggestions={Data.inputs.economic_status_details.suggestions}
          register={register("economic_status_details")}
        />

        {/* Submit */}
        <Button
          className={`mt-3 w-full text-base`}
          type="submit"
          disabled={isFormLoading}
        >
          {isFormLoading ? <SubmitLoader /> : Data.submit}
        </Button>
      </div>
      <Toaster />
    </form>
  );
};

export default BioFamilyInfoEditForm;
