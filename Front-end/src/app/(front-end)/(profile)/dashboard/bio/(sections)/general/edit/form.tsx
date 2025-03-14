"use client";
import fetchBioSection from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/fetchBioSection";
import {
  Data,
  VM,
} from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/general/data";
import { updateBioGeneral } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/general/edit/action";
import {
  blood_groups,
  complexions,
  genders,
  heights,
  marital_status,
  weights,
} from "@/assets/data/config/app.config";
import { BioWithGeneralSection } from "@/assets/data/response-types/bio";
import { LocationTypeWithoutChildren } from "@/assets/data/response-types/locations";
import SelectLocation from "@/components/blocks/bioSearchBox/selectLocation";
import SubmitLoader from "@/components/blocks/form-helper/submit-loader";
import SelectBox from "@/components/blocks/inputBox/selectBox";
import TextInputBox from "@/components/blocks/inputBox/textInputBox";
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
  number,
  object,
  Output,
  picklist,
  string,
} from "valibot";

// Valibot Schema
const Schema = object({
  gender: picklist(
    genders.map(gender => gender.value),
    VM.gender.required
  ),
  marital_status: picklist(
    marital_status.map(option => option.value),
    VM.marital_status.required
  ),
  birth_date: string([
    minLength(1, VM.birth_date.required),
    maxLength(50, VM.birth_date.maxLength),
  ]),
  height: picklist(
    heights.map(option => option.value),
    VM.height.required
  ),
  weight: picklist(
    weights.map(option => option.value),
    VM.weight.required
  ),
  complexion: picklist(
    complexions.map(option => option.value),
    VM.complexion.required
  ),
  blood_group: picklist(
    blood_groups.map(option => option.value),
    VM.blood_group.required
  ),
  language_skills: nullable(
    string([maxLength(100, VM.language_skills.maxLength)])
  ),
  location_id: number(VM.location.required),
});
export type GeneralEditSchemaType = Output<typeof Schema>;

const BioGeneralEditForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<LocationTypeWithoutChildren | null>(
    null
  );
  const [bioWithGeneral, setBioWithGeneral] =
    useState<BioWithGeneralSection | null>(null);

  useEffect(() => {
    fetchBioSection<BioWithGeneralSection>("general", setBioWithGeneral);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<GeneralEditSchemaType>({
    resolver: valibotResolver(Schema),
  });

  useEffect(() => {
    if (bioWithGeneral?.general_section) {
      const general = bioWithGeneral?.general_section;
      setValue("gender", general.gender);
      setValue("marital_status", general.marital_status);
      setValue("birth_date", general.birth_date);
      setValue("height", String(general.height));
      setValue("weight", String(general.weight));
      setValue("complexion", general.complexion);
      setValue("blood_group", general.blood_group);
      setValue("language_skills", general.language_skills);
      setValue("location_id", general.location.id);
    }
  }, [bioWithGeneral]);

  // update the location id value when change
  useEffect(() => {
    if (location) {
      setValue("location_id", location.id);
    } else {
      // @ts-expect-error
      setValue("location_id", undefined);
    }
  }, [location]);

  const onSubmit: SubmitHandler<GeneralEditSchemaType> = async FormData => {
    await updateBioGeneral<GeneralEditSchemaType>({
      data: FormData,
      bio: bioWithGeneral,
      setError,
      reset,
      toast,
      router,
      setIsFormLoading,
    });
  };
  if (!bioWithGeneral) {
    return <TableSkeleton rowCount={10} rowClassName="h-10 gap-6" />;
  }
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* gender */}
        <SelectBox
          label={Data.inputs.gender.title}
          labelRequired={true}
          triggerText={Data.inputs.gender.triggerText}
          options={genders}
          errorMessage={errors.gender?.message}
          setValue={value => setValue("gender", value)}
          defaultValue={bioWithGeneral?.general_section?.gender}
        />
        {/* marital status */}
        <SelectBox
          label={Data.inputs.marital_status.title}
          labelRequired={true}
          triggerText={Data.inputs.marital_status.triggerText}
          options={marital_status}
          errorMessage={errors.marital_status?.message}
          setValue={(value: string) => setValue("marital_status", value)}
          defaultValue={bioWithGeneral?.general_section?.marital_status}
        />
        {/* date of birth */}
        <TextInputBox
          label={Data.inputs.birth_date.title}
          labelRequired={true}
          type="date"
          errorMessage={errors.birth_date?.message}
          fieldName="birth_date"
          register={register("birth_date")}
          min="1950-01-01"
          max="2020-01-01"
          defaultValue={bioWithGeneral?.general_section?.birth_date}
        />
        {/* height */}
        <SelectBox
          label={Data.inputs.height.title}
          labelRequired={true}
          triggerText={Data.inputs.height.triggerText}
          options={heights}
          errorMessage={errors.height?.message}
          setValue={value => setValue("height", value)}
          defaultValue={String(bioWithGeneral?.general_section?.height)}
        />
        {/* weight */}
        <SelectBox
          label={Data.inputs.weight.title}
          labelRequired={true}
          triggerText={Data.inputs.weight.triggerText}
          options={weights}
          errorMessage={errors.weight?.message}
          setValue={value => setValue("weight", value)}
          defaultValue={String(bioWithGeneral?.general_section?.weight)}
        />
        {/* complexion */}
        <SelectBox
          label={Data.inputs.complexion.title}
          labelRequired={true}
          triggerText={Data.inputs.complexion.triggerText}
          options={complexions}
          errorMessage={errors.complexion?.message}
          setValue={(value: string) => setValue("complexion", value)}
          defaultValue={bioWithGeneral?.general_section?.complexion}
        />
        {/* blood groups */}
        <SelectBox
          label={Data.inputs.blood_group.title}
          labelRequired={true}
          triggerText={Data.inputs.blood_group.triggerText}
          options={blood_groups}
          errorMessage={errors.blood_group?.message}
          setValue={value => setValue("blood_group", value)}
          defaultValue={bioWithGeneral?.general_section?.blood_group}
        />
        {/* language_skills */}
        <TextInputBox
          label={Data.inputs.language_skills.title}
          errorMessage={errors.language_skills?.message}
          fieldName="language_skills"
          placeholder={Data.inputs.language_skills.placeholder}
          register={register("language_skills")}
        />
        {/* location */}
        <SelectLocation
          value={location}
          setValue={setLocation}
          label={Data.inputs.location.label}
          labelRequired={true}
          triggerText={Data.inputs.location.triggerText}
          isOnlyChildren={true}
          errorMessage={errors.location_id?.message}
          defaultValue={bioWithGeneral?.general_section?.location}
        />
        {/* submit */}
        <Button
          className={`mt-3 w-full text-base`}
          type="submit"
          disabled={isFormLoading}
        >
          {isFormLoading ? <SubmitLoader text={Data.wait} /> : Data.edit.submit}
        </Button>
      </div>
      <Toaster />
    </form>
  );
};

export default BioGeneralEditForm;
