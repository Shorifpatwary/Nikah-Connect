import Error from "@/components/blocks/form-helper/error";
import Suggestion from "@/components/blocks/form-helper/suggestion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { memo } from "react";
export type Option = Record<"value" | "label", string>;
interface Props {
  label: string;
  labelRequired?: boolean;
  triggerText: string;
  hintText?: string;
  errorMessage?: string | undefined;
  suggestions?: string[];
  options: Option[];
  setValue?: (value: string) => void;
  defaultValue?: string;
}

const SelectBox = ({
  label,
  labelRequired = false,
  setValue,
  hintText,
  triggerText,
  options,
  errorMessage,
  suggestions,
  defaultValue,
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
      <Select onValueChange={value => setValue?.(value)}>
        <SelectTrigger>
          <SelectValue
            placeholder={
              defaultValue
                ? options.find(option => option.value === defaultValue)
                    ?.label || triggerText
                : triggerText
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {hintText && <SelectLabel>{hintText}</SelectLabel>}
            {options.map(option => (
              <SelectItem
                key={option.label + option.value}
                className="capitalize"
                value={option.value}
                data-state={option.value === "পাত্র" ? "checked" : "unchecked"}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errorMessage && <Error>{errorMessage}</Error>}
    </div>
  );
};

export default memo(SelectBox);
