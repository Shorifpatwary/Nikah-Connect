"use client";
import fetchBioSection from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/fetchBioSection";
import {
  Data,
  VM,
} from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/profession/data";
import { updateBioProfession } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/profession/edit/action";
import { professions } from "@/assets/data/config/app.config";
import { BioWithProfessionSection } from "@/assets/data/response-types/bio";
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
  profession: picklist(
    professions.map(option => option.value),
    VM.profession.required
  ),
  profession_description: string([
    minLength(1, VM.profession_description.required),
    minLength(10, VM.profession_description.minLength),
    maxLength(2000, VM.profession_description.maxLength),
  ]),
  monthly_income: string([
    minLength(1, VM.monthly_income.required),
    minLength(5, VM.monthly_income.minLength),
    maxLength(100, VM.monthly_income.maxLength),
  ]),
});

export type ProfessionEditSchemaType = Output<typeof Schema>;

const BioProfessionEditForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [bioWithProfession, setBioWithProfession] =
    useState<BioWithProfessionSection | null>(null);

  useEffect(() => {
    fetchBioSection<BioWithProfessionSection>(
      "profession",
      setBioWithProfession
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
  } = useForm<ProfessionEditSchemaType>({
    resolver: valibotResolver(Schema),
  });

  useEffect(() => {
    if (bioWithProfession?.profession_section) {
      const profession = bioWithProfession.profession_section;
      Object.entries(profession).forEach(([key, value]) => {
        setValue(key as keyof ProfessionEditSchemaType, value || "");
      });
    }
  }, [bioWithProfession, setValue]);

  const onSubmit: SubmitHandler<ProfessionEditSchemaType> = async formData => {
    await updateBioProfession<ProfessionEditSchemaType>({
      data: formData,
      bio: bioWithProfession,
      setError,
      reset,
      toast,
      router,
      setIsFormLoading,
    });
  };

  if (!bioWithProfession) {
    return <TableSkeleton rowCount={10} rowClassName="h-10 mt-2" />;
  }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* Profession */}
        <SelectBox
          label={Data.inputs.profession.title}
          labelRequired={true}
          triggerText={Data.inputs.profession.triggerText}
          options={professions}
          errorMessage={errors.profession?.message}
          setValue={value => setValue("profession", value)}
          defaultValue={bioWithProfession.profession_section?.profession}
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

        {/* Monthly Income */}
        <TextareaBox
          label={Data.inputs.monthly_income.title}
          labelRequired={true}
          errorMessage={errors.monthly_income?.message}
          fieldName="monthly_income"
          placeholder={Data.inputs.monthly_income.placeholder}
          suggestions={Data.inputs.monthly_income.suggestions}
          register={register("monthly_income")}
        />

        {/* Submit */}
        <Button
          className={`mt-3 w-full text-base`}
          type="submit"
          disabled={isFormLoading}
        >
          {isFormLoading ? <SubmitLoader /> : Data.edit.submit}
        </Button>
      </div>
      <Toaster />
    </form>
  );
};

export default BioProfessionEditForm;
