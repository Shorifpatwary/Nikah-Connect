import Error from "@/components/blocks/form-helper/error";
import Suggestion from "@/components/blocks/form-helper/suggestion";
import { Option } from "@/components/blocks/inputBox/selectBox";
import { FancyMultiSelect } from "@/components/ui/custom/fancy-multi-select";
import { Label } from "@/components/ui/label";
import { memo } from "react";

interface Props {
  label: string;
  labelRequired?: boolean;
  triggerText: string;
  hintText?: string;
  errorMessage?: string | undefined;
  suggestions?: string[];
  options: Option[];
  setValue?: (value: Option[]) => void;
}
const FancyMultiSelectBox = ({
  label,
  labelRequired = false,
  setValue,

  triggerText,
  options,
  errorMessage,
  suggestions,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="name" className="text-lg capitalize max-md:text-xl">
        {label}{" "}
        {labelRequired && <span className="ml-1 text-red-600">(*)</span>}
      </Label>
      {suggestions && suggestions.length > 0 && (
        <Suggestion suggestions={suggestions} />
      )}
      <FancyMultiSelect
        options={options}
        triggerText={triggerText}
        setValue={setValue}
      />
      {errorMessage && <Error>{errorMessage}</Error>}
    </div>
  );
};

export default memo(FancyMultiSelectBox);
