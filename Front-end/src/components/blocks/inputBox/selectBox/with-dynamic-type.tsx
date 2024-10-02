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
export interface OptionDT<OptionType> {
  title: string;
  value: OptionType;
}
interface Props<OptionType> {
  label: string;
  triggerText: string;
  hintText?: string;
  errorMessage?: string | undefined;
  suggestions?: string[];
  options: OptionDT<OptionType>[];
  setValue?: (value: OptionType) => void;
}

const SelectBoxWithDynamicType = <OT,>({
  label,
  setValue,
  hintText,
  triggerText,
  options,
  errorMessage,
  suggestions,
}: Props<OT>) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="name" className="text-lg capitalize max-md:text-xl">
        {label}
      </Label>
      {suggestions && suggestions.length > 0 && (
        <Suggestion suggestions={suggestions} />
      )}

      <Select onValueChange={value => setValue?.(value as OT)}>
        <SelectTrigger>
          <SelectValue placeholder={triggerText} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {hintText && <SelectLabel>{hintText}</SelectLabel>}
            {options.map(option => (
              <SelectItem
                key={option.title + option.value}
                className="capitalize"
                value={option.value as string}
              >
                {option.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errorMessage && <Error>{errorMessage}</Error>}
    </div>
  );
};

// Use memo with a generic component by explicitly typing it
export default memo(SelectBoxWithDynamicType) as <OT>(
  props: Props<OT>
) => JSX.Element;
