"use client";

import { SectionFormInputsType } from "@/app/(front-end)/bio/(component)/bio-filter-action";
import { defaultValues as defaultValuesConst } from "@/app/(front-end)/bio/(component)/bio-filter-action/index";
import { Data } from "@/app/(front-end)/bio/(component)/bio-filter-action/section-filter-container/data";
import {
  blood_groups,
  complexions,
  genders,
  marital_status as marital_status_options,
} from "@/assets/data/config/app.config";
import { LocationTypeWithoutChildren } from "@/assets/data/response-types/locations";
import SelectLocations from "@/components/blocks/bioSearchBox/selectLocations";
import DualRangeSliderBox from "@/components/blocks/inputBox/DualRangeSliderBox";
import FancyMultiSelectBox from "@/components/blocks/inputBox/fancyMultiSelectBox";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { parseSelectedOptions } from "@/lib/utils";
import { Dispatch, memo, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";

type PickedInputsValue = Pick<
  SectionFormInputsType,
  | "gender"
  | "marital_status"
  | "complexion"
  | "blood_group"
  | "height"
  | "weight"
  | "birth_date"
  // | "locations"
>;

interface Props extends PickedInputsValue {
  setValue: UseFormSetValue<Partial<SectionFormInputsType>>;
  location_id?: string;
  setLocations: Dispatch<SetStateAction<LocationTypeWithoutChildren[]>>;
}

const GeneralFilter = ({
  setValue,
  gender,
  marital_status,
  complexion,
  blood_group,
  height,
  weight,
  birth_date,
  location_id,
  // locations,
  setLocations,
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
      min: defaultValuesConst.birth_date[0] || 1970,
      max: defaultValuesConst.birth_date[1] || 2020,
      step: 2,
    },
  };

  const locationIds = location_id?.split(",").map(id => Number(id)) as number[];

  // type FieldKeys = "gender" | "marital_status" | "complexion" | "blood_group";

  //! Error: Maximum update depth exceeded. when using this function.
  // const handleSetValue = React.useCallback(
  //   (field: FieldKeys, value: Array<{ value: string }>) => {
  //     const newValue = value.map(item => item.value);
  //     const currentValue = filters?.[field] || [];
  //     console.log("Current Value:", currentValue, "New Value:", newValue);
  //     if (JSON.stringify(currentValue) !== JSON.stringify(newValue)) {
  //       console.log(`Updating ${field} with`, newValue);
  //       setValue(field, newValue); // Update only if necessary
  //     }
  //   },
  //   [] // Avoid filters in the dependencies, as it might be causing the loop
  // );

  return (
    <AccordionItem value="general-section" className="w-full">
      <AccordionTrigger
        className="text-xl text-primary"
        aria-controls="general-section-content"
      >
        {Data.GS.title}
      </AccordionTrigger>
      <AccordionContent
        id="general-section-content"
        aria-labelledby="general-section-trigger"
      >
        <div className="flex flex-row flex-wrap items-start gap-2 p-2">
          {/* Gender */}
          <FancyMultiSelectBox
            label={Data.GS.inputs.gender.title}
            className="w-full  sm:w-[49%] lg:w-[32.5%]"
            triggerText={Data.GS.inputs.gender.triggerText}
            options={genders}
            setValue={value => {
              const newValue = value.map(item => item.value);
              const currentValue = gender || [];
              // Only update if values are different
              if (JSON.stringify(currentValue) !== JSON.stringify(newValue)) {
                setValue("gender", newValue);
              }
            }}
            defaultValue={parseSelectedOptions(gender || "", genders)}
          />

          {/* Marital Status */}
          <FancyMultiSelectBox
            label={Data.GS.inputs.marital_status.title}
            className="w-full  sm:w-[49%] lg:w-[32.5%]"
            triggerText={Data.GS.inputs.marital_status.triggerText}
            options={marital_status_options}
            setValue={value => {
              const newValue = value.map(item => item.value);
              const currentValue = marital_status || [];
              // Only update if values are different
              if (JSON.stringify(currentValue) !== JSON.stringify(newValue)) {
                setValue("marital_status", newValue);
              }
            }}
            defaultValue={parseSelectedOptions(
              marital_status || [],
              marital_status_options
            )}
          />

          {/* Complexion */}
          <FancyMultiSelectBox
            label={Data.GS.inputs.complexion.title}
            className="w-full  sm:w-[49%] lg:w-[32.5%]"
            triggerText={Data.GS.inputs.complexion.triggerText}
            options={complexions}
            setValue={value => {
              const newValue = value.map(item => item.value);
              const currentValue = complexion || [];
              // Only update if values are different
              if (JSON.stringify(currentValue) !== JSON.stringify(newValue)) {
                setValue("complexion", newValue);
              }
            }}
            defaultValue={parseSelectedOptions(complexion || "", complexions)}
          />

          {/* Blood Group */}
          <FancyMultiSelectBox
            label={Data.GS.inputs.blood_group.title}
            className="w-full  sm:w-[49%] lg:w-[32.5%]"
            triggerText={Data.GS.inputs.blood_group.triggerText}
            options={blood_groups}
            setValue={value => {
              const newValue = value.map(item => item.value);
              const currentValue = blood_group || [];
              // Only update if values are different
              if (JSON.stringify(currentValue) !== JSON.stringify(newValue)) {
                setValue("blood_group", newValue);
              }
            }}
            defaultValue={parseSelectedOptions(blood_group || "", blood_groups)}
          />

          {/* height range */}
          <DualRangeSliderBox
            label={Data.GS.inputs.height.title}
            className="w-full  sm:w-[49%] lg:w-[32.5%]"
            value={height || []}
            setValue={value => setValue("height", value)} // Update height range
            {...FILTER_RANGES.height}
          />
          {/* weight */}
          <DualRangeSliderBox
            label={Data.GS.inputs.weight.title}
            className="w-full  sm:w-[49%] lg:w-[32.5%]"
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

          {/* locations */}
          <SelectLocations
            label={Data.GS.inputs.location.label}
            className="w-full sm:w-[49%] lg:w-[32.5%]"
            values={Array.isArray(locations) ? locations : []}
            triggerText={Data.GS.inputs.location.triggerText}
            defaultValues={locationIds}
            setValues={setLocations}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default memo(GeneralFilter);
