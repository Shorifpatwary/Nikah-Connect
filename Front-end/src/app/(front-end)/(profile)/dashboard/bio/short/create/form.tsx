"use client";
import { createShortBio } from "@/app/(front-end)/(profile)/dashboard/bio/short/create/action";
import { Data, VM } from "@/app/(front-end)/(profile)/dashboard/bio/short/data";
import {
  blood_groups,
  complexions,
  economic_status,
  education_mediums,
  genders,
  heights,
  marital_status,
  mazhabs,
  professions,
  weights,
} from "@/assets/data/config/app.config";
import { LocationTypeWithoutChildren } from "@/assets/data/response-types/locations";
import SelectLocation from "@/components/blocks/bioSearchBox/selectLocation";
import SubmitLoader from "@/components/blocks/form-helper/submit-loader";
import SelectBox from "@/components/blocks/inputBox/selectBox";
import TextareaBox from "@/components/blocks/inputBox/TextareaBox";
import TextInputBox from "@/components/blocks/inputBox/textInputBox";
import { ParagraphMd } from "@/components/blocks/typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  email,
  maxLength,
  minLength,
  number,
  object,
  Output,
  picklist,
  string,
} from "valibot";

// Valibot
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
    maxLength(20, VM.birth_date.maxLength),
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
  location_id: number(VM.location.required),
  permanent_address: string([
    minLength(1, VM.permanent_address.required),
    maxLength(1000, VM.permanent_address.maxLength),
  ]),
  education_medium: picklist(
    education_mediums.map(item => item.value),
    VM.education_medium.required
  ),
  previous_exams: string([
    minLength(1, VM.previous_exams.required),
    minLength(50, VM.previous_exams.minLength),
    maxLength(2500, VM.previous_exams.maxLength),
  ]),
  family_members_info: string([
    minLength(1, VM.family_members_info.required),
    minLength(10, VM.family_members_info.minLength),
    maxLength(1500, VM.family_members_info.maxLength),
  ]),
  economic_status: picklist(
    economic_status.map(option => option.value),
    VM.economic_status.required
  ),
  profession: picklist(
    professions.map(option => option.value),
    VM.profession.required
  ),
  profession_description: string([
    minLength(1, VM.profession_description.required),
    minLength(10, VM.profession_description.minLength),
    maxLength(2000, VM.profession_description.maxLength),
  ]),
  mazhab: picklist(
    mazhabs.map(option => option.value),
    VM.mazhab.required
  ),
  prev_marriage: string([maxLength(1000, VM.prev_marriage.maxLength)]),
  name: string([
    minLength(1, VM.name.required),
    minLength(2, VM.name.minLength),
    maxLength(255, VM.name.maxLength),
  ]),
  email: string([
    minLength(1, VM.email.required),
    minLength(5, VM.email.minLength),
    maxLength(255, VM.email.maxLength),
    email(VM.email.email),
  ]),
  location: string([
    minLength(1, VM.hiddenLocation.required),
    minLength(5, VM.hiddenLocation.minLength),
    maxLength(1000, VM.hiddenLocation.maxLength),
  ]),
  family_members_name: string([
    minLength(1, VM.family_members_name.required),
    minLength(5, VM.family_members_name.minLength),
    maxLength(1000, VM.family_members_name.maxLength),
  ]),
  current_parent: string([
    minLength(1, VM.current_parent.required),
    minLength(2, VM.current_parent.minLength),
    maxLength(255, VM.current_parent.maxLength),
  ]),
  parent_mobile: string([
    minLength(1, VM.parent_mobile.required),
    minLength(10, VM.parent_mobile.minLength),
    maxLength(25, VM.parent_mobile.maxLength),
  ]),
});
export type BioShortCreateSchemaType = Output<typeof Schema>;
const ShortBioCreateForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  // form status
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [locations, setLocations] =
    useState<LocationTypeWithoutChildren | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
    watch,
  } = useForm<BioShortCreateSchemaType>({
    resolver: valibotResolver(Schema),
  });
  const onSubmit: SubmitHandler<BioShortCreateSchemaType> = async FormData => {
    await createShortBio<BioShortCreateSchemaType>({
      data: FormData,
      setError,
      reset,
      toast,
      router,
      setIsFormLoading,
    });
  };
  const marital_status_state = watch("marital_status");
  // update location id value when change
  useEffect(() => {
    if (locations) {
      setValue("location_id", locations.id);
    } else {
      // @ts-expect-error
      setValue("location_id", undefined);
    }
  }, [locations]);

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
        />
        {/* marital status */}
        <SelectBox
          label={Data.inputs.marital_status.title}
          labelRequired={true}
          triggerText={Data.inputs.marital_status.triggerText}
          options={marital_status}
          errorMessage={errors.marital_status?.message}
          setValue={(value: string) => setValue("marital_status", value)}
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
        />
        {/* height */}
        <SelectBox
          label={Data.inputs.height.title}
          labelRequired={true}
          triggerText={Data.inputs.height.triggerText}
          options={heights}
          errorMessage={errors.height?.message}
          setValue={value => setValue("height", value)}
        />
        {/* weight */}
        <SelectBox
          label={Data.inputs.weight.title}
          labelRequired={true}
          triggerText={Data.inputs.weight.triggerText}
          options={weights}
          errorMessage={errors.weight?.message}
          setValue={value => setValue("weight", value)}
        />
        {/* complexion */}
        <SelectBox
          label={Data.inputs.complexion.title}
          labelRequired={true}
          triggerText={Data.inputs.complexion.triggerText}
          options={complexions}
          errorMessage={errors.complexion?.message}
          setValue={(value: string) => setValue("complexion", value)}
        />
        {/* blood groups */}
        <SelectBox
          label={Data.inputs.blood_group.title}
          labelRequired={true}
          triggerText={Data.inputs.blood_group.triggerText}
          options={blood_groups}
          errorMessage={errors.blood_group?.message}
          setValue={value => setValue("blood_group", value)}
        />
        {/* location */}
        <SelectLocation
          value={locations}
          setValue={setLocations}
          label={Data.inputs.location.label}
          labelRequired={true}
          triggerText={Data.inputs.location.triggerText}
          isOnlyChildren={true}
          errorMessage={errors.location_id?.message}
        />
        {/* permanent address */}
        <TextareaBox
          label={Data.inputs.permanent_address.title}
          labelRequired={true}
          errorMessage={errors.permanent_address?.message}
          fieldName="permanent_address"
          placeholder={Data.inputs.permanent_address.placeholder}
          suggestions={Data.inputs.permanent_address.suggestions}
          register={register("permanent_address")}
        />
        {/* education_mediums */}
        <SelectBox
          label={Data.inputs.education_medium.title}
          labelRequired={true}
          triggerText={Data.inputs.education_medium.triggerText}
          options={education_mediums}
          errorMessage={errors.education_medium?.message}
          setValue={value => setValue("education_medium", value)}
        />
        {/* Previous Exams */}
        <TextareaBox
          label={Data.inputs.previous_exams.title}
          labelRequired={true}
          errorMessage={errors.previous_exams?.message}
          fieldName="previous_exams"
          placeholder={Data.inputs.previous_exams.placeholder}
          suggestions={Data.inputs.previous_exams.suggestions}
          register={register("previous_exams")}
        />
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
        {/* Economic Status */}
        <SelectBox
          label={Data.inputs.economic_status.title}
          labelRequired={true}
          triggerText={Data.inputs.economic_status.triggerText}
          options={economic_status}
          errorMessage={errors.economic_status?.message}
          setValue={value => setValue("economic_status", value)}
        />
        {/* Profession */}
        <SelectBox
          label={Data.inputs.profession.title}
          labelRequired={true}
          triggerText={Data.inputs.profession.triggerText}
          options={professions}
          errorMessage={errors.profession?.message}
          setValue={value => setValue("profession", value)}
        />
        {/* Profession Description */}
        <TextareaBox
          label={Data.inputs.profession_description.title}
          labelRequired={true}
          errorMessage={errors.profession_description?.message}
          fieldName="profession_description"
          placeholder={Data.inputs.profession_description.placeholder}
          suggestions={Data.inputs.profession_description.suggestions}
          register={register("profession_description")}
        />
        {/* Mazhab */}
        <SelectBox
          label={Data.inputs.mazhab.title}
          labelRequired={true}
          triggerText={Data.inputs.mazhab.triggerText}
          options={mazhabs}
          errorMessage={errors.mazhab?.message}
          setValue={value => setValue("mazhab", value)}
        />
        {marital_status_state !== "অবিবাহিত" && (
          <TextareaBox
            label={Data.inputs.prev_marriage.title}
            labelRequired={true}
            errorMessage={errors.prev_marriage?.message}
            fieldName="prev_marriage"
            placeholder={Data.inputs.prev_marriage.placeholder}
            suggestions={Data.inputs.prev_marriage.suggestions}
            required
            register={register("prev_marriage")}
          />
        )}
        {/* separator */}
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <ParagraphMd className="text-primary">
            {Data.hiddenInfo.title}
          </ParagraphMd>
          <Separator className="flex-1" />
        </div>
        {/* hidden information */}
        {/* Name */}
        <TextInputBox
          label={Data.inputs.name.title}
          labelRequired={true}
          placeholder={Data.inputs.name.placeholder}
          suggestions={Data.inputs.name.suggestions}
          errorMessage={errors.name?.message}
          fieldName="name"
          register={register("name")}
        />

        {/* Email */}
        <TextInputBox
          label={Data.inputs.email.title}
          labelRequired={true}
          placeholder={Data.inputs.email.placeholder}
          type="email"
          suggestions={Data.inputs.email.suggestions}
          errorMessage={errors.email?.message}
          fieldName="email"
          register={register("email")}
        />

        {/*hidden location  */}
        <TextareaBox
          label={Data.inputs.hiddenLocation.title}
          labelRequired={true}
          placeholder={Data.inputs.hiddenLocation.placeholder}
          suggestions={Data.inputs.hiddenLocation.suggestions}
          errorMessage={errors.location?.message}
          fieldName="location"
          register={register("location")}
        />

        {/* Family Members Name */}
        <TextareaBox
          label={Data.inputs.family_members_name.title}
          labelRequired={true}
          placeholder={Data.inputs.family_members_name.placeholder}
          suggestions={Data.inputs.family_members_name.suggestions}
          errorMessage={errors.family_members_name?.message}
          fieldName="family_members_name"
          register={register("family_members_name")}
        />

        {/* Current Parent */}
        <TextInputBox
          label={Data.inputs.current_parent.title}
          labelRequired={true}
          placeholder={Data.inputs.current_parent.placeholder}
          errorMessage={errors.current_parent?.message}
          fieldName="current_parent"
          register={register("current_parent")}
        />

        {/* Parent Mobile */}
        <TextInputBox
          label={Data.inputs.parent_mobile.title}
          labelRequired={true}
          placeholder={Data.inputs.parent_mobile.placeholder}
          suggestions={Data.inputs.parent_mobile.suggestions}
          errorMessage={errors.parent_mobile?.message}
          fieldName="parent_mobile"
          register={register("parent_mobile")}
        />
        {/* submit */}
        <Button
          className={`mt-3 w-full text-xl sm:text-lg`}
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

export default ShortBioCreateForm;
