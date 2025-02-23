"use client";

import fetchBioSection from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/fetchBioSection";
import { createBioReligiousActivity } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/religious-activities/create/action";
import {
  Data,
  VM,
} from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/religious-activities/data";
import { mazhabs } from "@/assets/data/config/app.config";
import { BioWithGeneralSection } from "@/assets/data/response-types/bio";
import SubmitLoader from "@/components/blocks/form-helper/submit-loader";
import SelectBox from "@/components/blocks/inputBox/selectBox";
import TextareaBox from "@/components/blocks/inputBox/TextareaBox";
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
  picklist,
  string,
} from "valibot";

// Valibot schema
const Schema = object({
  prayer_habits: string([
    minLength(1, VM.prayer_habits.required),
    minLength(10, VM.prayer_habits.minLength),
    maxLength(1000, VM.prayer_habits.maxLength),
  ]),
  haram_relationships: nullable(
    string([maxLength(1000, VM.haram_relationships.maxLength)])
  ),
  quran_recitation: nullable(
    string([maxLength(1000, VM.quran_recitation.maxLength)])
  ),
  mahram_adherence: nullable(
    string([maxLength(1000, VM.mahram_adherence.maxLength)])
  ),
  has_beard: nullable(string([maxLength(1000, VM.has_beard.maxLength)])),
  entertainment_habits: nullable(
    string([maxLength(1000, VM.entertainment_habits.maxLength)])
  ),
  mazhab: picklist(
    mazhabs.map(option => option.value),
    VM.mazhab.required
  ), // required
  religious_beliefs: nullable(
    string([maxLength(1000, VM.religious_beliefs.maxLength)])
  ),
  religious_knowledge: nullable(
    string([maxLength(1000, VM.religious_knowledge.maxLength)])
  ),
  family_religious_environment: nullable(
    string([maxLength(1000, VM.family_religious_environment.maxLength)])
  ),
});

export type ReligiousActivityCreateSchemaType = Output<typeof Schema>;

const BioReligiousActivityCreateForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setValue,
  } = useForm<ReligiousActivityCreateSchemaType>({
    resolver: valibotResolver(Schema),
  });

  const [bioWithGeneral, setBioWithGeneral] =
    useState<BioWithGeneralSection | null>(null);
  useEffect(() => {
    fetchBioSection<BioWithGeneralSection>("general", setBioWithGeneral);
  }, []);

  const onSubmit: SubmitHandler<
    ReligiousActivityCreateSchemaType
  > = async formData => {
    await createBioReligiousActivity({
      data: formData,
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
        {/* Prayer Habits */}
        <TextareaBox
          label={Data.inputs.prayer_habits.title}
          labelRequired={true}
          errorMessage={errors.prayer_habits?.message}
          fieldName="prayer_habits"
          placeholder={Data.inputs.prayer_habits.placeholder}
          suggestions={Data.inputs.prayer_habits.suggestions}
          register={register("prayer_habits")}
        />
        {/* Haram Relationships */}
        <TextareaBox
          label={Data.inputs.haram_relationships.title}
          errorMessage={errors.haram_relationships?.message}
          fieldName="haram_relationships"
          placeholder={Data.inputs.haram_relationships.placeholder}
          suggestions={Data.inputs.haram_relationships.suggestions}
          register={register("haram_relationships")}
        />
        {/* Quran Recitation */}
        <TextareaBox
          label={Data.inputs.quran_recitation.title}
          errorMessage={errors.quran_recitation?.message}
          fieldName="quran_recitation"
          placeholder={Data.inputs.quran_recitation.placeholder}
          suggestions={Data.inputs.quran_recitation.suggestions}
          register={register("quran_recitation")}
        />
        {/* Mahram Adherence */}
        <TextareaBox
          label={Data.inputs.mahram_adherence.title}
          errorMessage={errors.mahram_adherence?.message}
          fieldName="mahram_adherence"
          placeholder={Data.inputs.mahram_adherence.placeholder}
          suggestions={Data.inputs.mahram_adherence.suggestions}
          register={register("mahram_adherence")}
        />

        {/* Has Beard */}
        {bioWithGeneral?.general_section?.gender === "পাত্র" && (
          <TextareaBox
            label={Data.inputs.has_beard.title}
            errorMessage={errors.has_beard?.message}
            fieldName="has_beard"
            placeholder={Data.inputs.has_beard.placeholder}
            suggestions={Data.inputs.has_beard.suggestions}
            register={register("has_beard")}
          />
        )}
        {/* Entertainment Habits */}
        <TextareaBox
          label={Data.inputs.entertainment_habits.title}
          errorMessage={errors.entertainment_habits?.message}
          fieldName="entertainment_habits"
          placeholder={Data.inputs.entertainment_habits.placeholder}
          suggestions={Data.inputs.entertainment_habits.suggestions}
          register={register("entertainment_habits")}
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
        {/* Religious Beliefs */}
        <TextareaBox
          label={Data.inputs.religious_beliefs.title}
          errorMessage={errors.religious_beliefs?.message}
          fieldName="religious_beliefs"
          placeholder={Data.inputs.religious_beliefs.placeholder}
          suggestions={Data.inputs.religious_beliefs.suggestions}
          register={register("religious_beliefs")}
        />
        {/* Religious Knowledge */}
        <TextareaBox
          label={Data.inputs.religious_knowledge.title}
          errorMessage={errors.religious_knowledge?.message}
          fieldName="religious_knowledge"
          placeholder={Data.inputs.religious_knowledge.placeholder}
          suggestions={Data.inputs.religious_knowledge.suggestions}
          register={register("religious_knowledge")}
        />
        {/* Family Religious Environment */}
        <TextareaBox
          label={Data.inputs.family_religious_environment.title}
          errorMessage={errors.family_religious_environment?.message}
          fieldName="family_religious_environment"
          placeholder={Data.inputs.family_religious_environment.placeholder}
          suggestions={Data.inputs.family_religious_environment.suggestions}
          register={register("family_religious_environment")}
        />

        {/* Submit */}
        <Button
          className={`mt-3 w-full text-base`}
          type="submit"
          disabled={isFormLoading}
        >
          {isFormLoading ? <SubmitLoader /> : Data.create.submit}
        </Button>
      </div>
      <Toaster />
    </form>
  );
};

export default BioReligiousActivityCreateForm;
