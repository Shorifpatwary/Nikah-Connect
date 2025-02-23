"use client";

import fetchBioSection from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/fetchBioSection";
import { createMarriageInfo } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/marriage-info/create/action";
import {
  Data,
  VM,
} from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/marriage-info/data";

import { BioWithGeneralSection } from "@/assets/data/response-types/bio";
import SubmitLoader from "@/components/blocks/form-helper/submit-loader";
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
  string,
} from "valibot";

// Valibot schema
const Schema = object({
  prev_marriage: nullable(
    string([maxLength(1000, VM.prev_marriage.maxLength)])
  ),
  work_after: string([
    minLength(1, VM.work_after.required),
    maxLength(255, VM.work_after.maxLength),
  ]),
  study_after: string([
    minLength(1, VM.study_after.required),
    maxLength(255, VM.study_after.maxLength),
  ]),
  ceremony_plans: nullable(
    string([maxLength(1000, VM.ceremony_plans.maxLength)])
  ),
  partner_view_rules: nullable(
    string([maxLength(1000, VM.partner_view_rules.maxLength)])
  ),
  marriage_weakness: nullable(
    string([maxLength(1000, VM.marriage_weakness.maxLength)])
  ),
  family_pref: nullable(string([maxLength(1000, VM.family_pref.maxLength)])),
  compromise_factors: nullable(
    string([maxLength(1000, VM.compromise_factors.maxLength)])
  ),
  dowry_amount: string([
    minLength(1, VM.dowry_amount.required),
    minLength(5, VM.dowry_amount.minLength),
    maxLength(1000, VM.dowry_amount.maxLength),
  ]),
  dowry_opinion: nullable(
    string([maxLength(1000, VM.dowry_opinion.maxLength)])
  ),
  cash_gift_opinion: nullable(
    string([maxLength(1000, VM.cash_gift_opinion.maxLength)])
  ),
});

export type MarriageInfoCreateSchemaType = Output<typeof Schema>;

const MarriageInfoCreateForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  // general section data
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
    reset,
  } = useForm<MarriageInfoCreateSchemaType>({
    resolver: valibotResolver(Schema),
  });

  const onSubmit: SubmitHandler<
    MarriageInfoCreateSchemaType
  > = async formData => {
    await createMarriageInfo<MarriageInfoCreateSchemaType>({
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
        {bioWithGeneral?.general_section?.marital_status !== "অবিবাহিত" && (
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
        {/* Work After */}
        <TextareaBox
          label={Data.inputs.work_after.title}
          labelRequired={true}
          errorMessage={errors.work_after?.message}
          fieldName="work_after"
          placeholder={Data.inputs.work_after.placeholder}
          suggestions={Data.inputs.work_after.suggestions}
          register={register("work_after")}
        />

        {/* Study After */}
        <TextareaBox
          label={Data.inputs.study_after.title}
          labelRequired={true}
          errorMessage={errors.study_after?.message}
          fieldName="study_after"
          placeholder={Data.inputs.study_after.placeholder}
          suggestions={Data.inputs.study_after.suggestions}
          register={register("study_after")}
        />

        {/* Ceremony Plans */}
        <TextareaBox
          label={Data.inputs.ceremony_plans.title}
          labelRequired={false}
          errorMessage={errors.ceremony_plans?.message}
          fieldName="ceremony_plans"
          placeholder={Data.inputs.ceremony_plans.placeholder}
          suggestions={Data.inputs.ceremony_plans.suggestions}
          register={register("ceremony_plans")}
        />

        {/* Partner View Rules */}
        <TextareaBox
          label={Data.inputs.partner_view_rules.title}
          labelRequired={false}
          errorMessage={errors.partner_view_rules?.message}
          fieldName="partner_view_rules"
          placeholder={Data.inputs.partner_view_rules.placeholder}
          suggestions={Data.inputs.partner_view_rules.suggestions}
          register={register("partner_view_rules")}
        />

        {/* Marriage Weakness */}
        <TextareaBox
          label={Data.inputs.marriage_weakness.title}
          labelRequired={false}
          errorMessage={errors.marriage_weakness?.message}
          fieldName="marriage_weakness"
          placeholder={Data.inputs.marriage_weakness.placeholder}
          suggestions={Data.inputs.marriage_weakness.suggestions}
          register={register("marriage_weakness")}
        />

        {/* Family Preferences */}
        <TextareaBox
          label={Data.inputs.family_pref.title}
          labelRequired={false}
          errorMessage={errors.family_pref?.message}
          fieldName="family_pref"
          placeholder={Data.inputs.family_pref.placeholder}
          suggestions={Data.inputs.family_pref.suggestions}
          register={register("family_pref")}
        />

        {/* Compromise Factors */}
        <TextareaBox
          label={Data.inputs.compromise_factors.title}
          labelRequired={false}
          errorMessage={errors.compromise_factors?.message}
          fieldName="compromise_factors"
          placeholder={Data.inputs.compromise_factors.placeholder}
          suggestions={Data.inputs.compromise_factors.suggestions}
          register={register("compromise_factors")}
        />

        {/* Dowry Amount */}
        <TextareaBox
          label={Data.inputs.dowry_amount.title}
          labelRequired={true}
          errorMessage={errors.dowry_amount?.message}
          fieldName="dowry_amount"
          placeholder={Data.inputs.dowry_amount.placeholder}
          suggestions={Data.inputs.dowry_amount.suggestions}
          register={register("dowry_amount")}
        />

        {/* Dowry Opinion */}
        <TextareaBox
          label={Data.inputs.dowry_opinion.title}
          labelRequired={false}
          errorMessage={errors.dowry_opinion?.message}
          fieldName="dowry_opinion"
          placeholder={Data.inputs.dowry_opinion.placeholder}
          suggestions={Data.inputs.dowry_opinion.suggestions}
          register={register("dowry_opinion")}
        />

        {/* Cash Gift Opinion */}
        <TextareaBox
          label={Data.inputs.cash_gift_opinion.title}
          labelRequired={false}
          errorMessage={errors.cash_gift_opinion?.message}
          fieldName="cash_gift_opinion"
          placeholder={Data.inputs.cash_gift_opinion.placeholder}
          suggestions={Data.inputs.cash_gift_opinion.suggestions}
          register={register("cash_gift_opinion")}
        />

        {/* Submit */}
        <Button
          className="mt-3 w-full text-base"
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

export default MarriageInfoCreateForm;
