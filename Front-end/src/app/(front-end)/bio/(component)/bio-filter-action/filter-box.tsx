"use client";

import { bio_profile_type_options } from "@/app/(front-end)/bio/(component)/bio-card/bio-profile";
import { SectionFormInputsType } from "@/app/(front-end)/bio/(component)/bio-filter-action";
import { defaultValues as defaultValuesConst } from "@/app/(front-end)/bio/(component)/bio-filter-action/index";
import { Data } from "@/app/(front-end)/bio/(component)/bio-filter-action/section-filter-container/data";
import {
  blood_groups,
  complexions,
  economic_status as economic_status_options,
  education_mediums,
  genders,
  marital_status as marital_status_options,
  mazhabs,
  professions,
} from "@/assets/data/config/app.config";
import { LocationTypeWithoutChildren } from "@/assets/data/response-types/locations";
import SelectLocations from "@/components/blocks/bioSearchBox/selectLocations";
import DualRangeSliderBox from "@/components/blocks/inputBox/DualRangeSliderBox";
import FancyMultiSelectBox from "@/components/blocks/inputBox/fancyMultiSelectBox";
import TextInputBox from "@/components/blocks/inputBox/textInputBox";
import { parseSelectedOptions } from "@/lib/utils";
import { Dispatch, memo, SetStateAction } from "react";
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

type PickedInputsValue = Pick<
  SectionFormInputsType,
  | "gender"
  | "marital_status"
  | "complexion"
  | "blood_group"
  | "height"
  | "weight"
  | "birth_date"
>;

interface Props extends PickedInputsValue {
  setValue: UseFormSetValue<Partial<SectionFormInputsType>>;
  getValues: UseFormGetValues<Partial<SectionFormInputsType>>;
  register: UseFormRegister<Partial<SectionFormInputsType>>;
  location_id?: string;
  locations: LocationTypeWithoutChildren[];
  setLocations: Dispatch<SetStateAction<LocationTypeWithoutChildren[]>>;
}

const FilterBox = ({
  setValue,
  setLocations,
  getValues,
  locations,
  location_id,
  register,
  // receive range type input state
  height,
  weight,
  birth_date,
}: Props) => {
  const FILTER_RANGES = {
    height: {
      min: defaultValuesConst.height[0] || 3,
      max: defaultValuesConst.height[1] || 7,
      step: 0.2,
    },
    weight: {
      min: defaultValuesConst.weight[0] || 30,
      max: defaultValuesConst.weight[1] || 120,
      step: 2,
    },
    birth_date: {
      min: defaultValuesConst.birth_date[0] || 1960,
      max: defaultValuesConst.birth_date[1] || 2020,
      step: 2,
    },
  };
  // receive options type input values.
  const marital_status = getValues("marital_status");
  const gender = getValues("gender");
  const complexion = getValues("complexion");
  const blood_group = getValues("blood_group");
  const education_medium = getValues("education_medium");
  const economic_status = getValues("economic_status");
  const profession = getValues("profession");
  const mazhab = getValues("mazhab");
  const bio_profile = getValues("bio_profile");
  const expected_complexion = getValues("expected_complexion");
  const expected_marital_status = getValues("expected_marital_status");
  const expected_bio_profile_types = getValues("expected_bio_profile_types");

  const locationIds = location_id?.split(",").map(id => Number(id)) as number[];

  return (
    <div
      id="general-section-content"
      aria-labelledby="general-section-trigger"
      className="group"
    >
      <div className="flex flex-row flex-wrap items-start gap-2 p-2">
        {/* ID */}
        <TextInputBox
          label="ID:"
          placeholder="1524"
          aria-label="ID"
          register={register("id")}
          autoFocus
          fieldName="id"
          min="999"
          max="9999999"
          className="w-full sm:w-[49%] lg:w-[32.5%]"
        />
        {/* Gender */}
        <FancyMultiSelectBox
          label={Data.GS.inputs.gender.title}
          className="w-full sm:w-[49%] lg:w-[32.5%]"
          triggerText={Data.GS.inputs.gender.triggerText}
          options={genders}
          setValue={value =>
            setValue(
              "gender",
              value.map(item => item.value)
            )
          }
          defaultValue={parseSelectedOptions(gender || "", genders)}
        />

        {/* Marital Status */}
        <FancyMultiSelectBox
          label={Data.GS.inputs.marital_status.title}
          className="w-full sm:w-[49%] lg:w-[32.5%]"
          triggerText={Data.GS.inputs.marital_status.triggerText}
          options={marital_status_options}
          setValue={value =>
            setValue(
              "marital_status",
              value.map(item => item.value)
            )
          }
          defaultValue={parseSelectedOptions(
            marital_status || [],
            marital_status_options
          )}
        />
        {/* height range */}
        <DualRangeSliderBox
          label={Data.GS.inputs.height.title}
          className="w-full sm:w-[49%] lg:w-[32.5%]"
          value={height || []}
          setValue={value => setValue("height", value)} // Update height range
          {...FILTER_RANGES.height}
        />
        {/* weight */}
        <DualRangeSliderBox
          label={Data.GS.inputs.weight.title}
          className="w-full sm:w-[49%] lg:w-[32.5%]"
          value={weight || []} // Range as an array
          setValue={value => setValue("weight", value)} // Update weight range
          {...FILTER_RANGES.weight}
        />

        {/* birth date range */}
        <DualRangeSliderBox
          label={Data.GS.inputs.birth_date.title}
          className="w-full sm:w-[49%] lg:w-[32.5%]"
          value={birth_date || []}
          setValue={value => setValue("birth_date", value)}
          {...FILTER_RANGES.birth_date}
        />
        {/* Complexion */}
        <FancyMultiSelectBox
          label={Data.GS.inputs.complexion.title}
          className="w-full sm:w-[49%] lg:w-[32.5%]"
          triggerText={Data.GS.inputs.complexion.triggerText}
          options={complexions}
          setValue={value =>
            setValue(
              "complexion",
              value.map(item => item.value)
            )
          }
          defaultValue={parseSelectedOptions(complexion || "", complexions)}
        />
        {/* Blood Group */}
        <FancyMultiSelectBox
          label={Data.GS.inputs.blood_group.title}
          className="w-full sm:w-[49%] lg:w-[32.5%]"
          triggerText={Data.GS.inputs.blood_group.triggerText}
          options={blood_groups}
          setValue={value =>
            setValue(
              "blood_group",
              value.map(item => item.value)
            )
          }
          defaultValue={parseSelectedOptions(blood_group || "", blood_groups)}
        />

        {/* locations */}
        <SelectLocations
          label={Data.GS.inputs.location.label}
          className="w-full sm:w-[49%] lg:w-[32.5%]"
          values={Array.isArray(locations) ? locations : []}
          triggerText={Data.GS.inputs.location.triggerText}
          defaultValues={locationIds}
          setValues={setLocations}
        />
        {/* education medium  */}
        <FancyMultiSelectBox
          label={Data.GS.inputs.education_medium.title}
          className="w-full sm:w-[49%] lg:w-[32.5%]"
          triggerText={Data.GS.inputs.education_medium.triggerText}
          options={education_mediums}
          setValue={value =>
            setValue(
              "education_medium",
              value.map(item => item.value)
            )
          }
          defaultValue={parseSelectedOptions(
            education_medium || "",
            education_mediums
          )}
        />
        {/* economic status.   */}
        <FancyMultiSelectBox
          label={Data.GS.inputs.economic_status.title}
          className="w-full sm:w-[49%] lg:w-[32.5%]"
          triggerText={Data.GS.inputs.economic_status.triggerText}
          options={economic_status_options}
          setValue={value =>
            setValue(
              "economic_status",
              value.map(item => item.value)
            )
          }
          defaultValue={parseSelectedOptions(
            economic_status || "",
            economic_status_options
          )}
        />
        {/* profession*/}
        <FancyMultiSelectBox
          label={Data.GS.inputs.profession.title}
          className="w-full sm:w-[49%] lg:w-[32.5%]"
          triggerText={Data.GS.inputs.profession.triggerText}
          options={professions}
          setValue={value =>
            setValue(
              "profession",
              value.map(item => item.value)
            )
          }
          defaultValue={parseSelectedOptions(profession || "", professions)}
        />
        {/* mazhab*/}
        <FancyMultiSelectBox
          label={Data.GS.inputs.mazhab.title}
          className="w-full sm:w-[49%] lg:w-[32.5%]"
          triggerText={Data.GS.inputs.mazhab.triggerText}
          options={mazhabs}
          setValue={value =>
            setValue(
              "mazhab",
              value.map(item => item.value)
            )
          }
          defaultValue={parseSelectedOptions(mazhab || "", mazhabs)}
        />
        {/* profile type*/}
        <FancyMultiSelectBox
          label={Data.GS.inputs.profile_type.title}
          className="w-full sm:w-[49%] lg:w-[32.5%]"
          triggerText={Data.GS.inputs.profile_type.triggerText}
          options={bio_profile_type_options}
          setValue={value =>
            setValue(
              "bio_profile",
              value.map(item => item.value)
            )
          }
          defaultValue={parseSelectedOptions(
            bio_profile || "",
            bio_profile_type_options
          )}
        />
        {/* expected complexion*/}
        <FancyMultiSelectBox
          label={Data.GS.inputs.expected_complexion.title}
          className="w-full sm:w-[49%] lg:w-[32.5%]"
          triggerText={Data.GS.inputs.expected_complexion.triggerText}
          options={complexions}
          setValue={value =>
            setValue(
              "expected_complexion",
              value.map(item => item.value)
            )
          }
          defaultValue={parseSelectedOptions(
            expected_complexion || "",
            complexions
          )}
        />
        {/* expected marital status*/}
        <FancyMultiSelectBox
          label={Data.GS.inputs.expected_marital_status.title}
          className="w-full sm:w-[49%] lg:w-[32.5%]"
          triggerText={Data.GS.inputs.expected_marital_status.triggerText}
          options={marital_status_options}
          setValue={value =>
            setValue(
              "expected_marital_status",
              value.map(item => item.value)
            )
          }
          defaultValue={parseSelectedOptions(
            expected_marital_status || "",
            marital_status_options
          )}
        />
        {/* expected bio profile types*/}
        <FancyMultiSelectBox
          label={Data.GS.inputs.expected_bio_profile_types.title}
          className="w-full sm:w-[49%] lg:w-[32.5%]"
          triggerText={Data.GS.inputs.expected_bio_profile_types.triggerText}
          options={bio_profile_type_options}
          setValue={value =>
            setValue(
              "expected_bio_profile_types",
              value.map(item => item.value)
            )
          }
          defaultValue={parseSelectedOptions(
            expected_bio_profile_types || "",
            bio_profile_type_options
          )}
        />
      </div>
    </div>
  );
};

export default memo(FilterBox);
