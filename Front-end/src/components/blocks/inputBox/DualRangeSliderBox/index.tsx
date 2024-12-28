import Error from "@/components/blocks/form-helper/error";
import Suggestion from "@/components/blocks/form-helper/suggestion";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Dispatch, memo, ReactNode, SetStateAction } from "react";

interface DualRangeSliderBoxProps {
  label: string | ReactNode;
  labelRequired?: boolean;
  errorMessage?: string | undefined;
  suggestions?: string[];
  value: number[];
  setValue: Dispatch<SetStateAction<number[]>>;
  min: number;
  max: number;
  step: number;
  labelPosition?: "top" | "bottom";
  className?: string;
}

const DualRangeSliderBox = ({
  label,
  labelRequired = false,
  setValue,
  value,
  errorMessage,
  suggestions,
  min,
  max,
  step,
  labelPosition = "bottom",
  className,
}: DualRangeSliderBoxProps) => {
  return (
    <div className={cn("flex h-16 flex-col gap-2", className)}>
      {/* Label */}
      <Label className="text-lg capitalize max-md:text-xl">
        {label}
        {labelRequired && <span className="ml-1 text-red-600">(*)</span>}
      </Label>

      {/* Suggestions */}
      {suggestions && suggestions.length > 0 && (
        <Suggestion suggestions={suggestions} />
      )}

      {/* Slider */}
      <DualRangeSlider
        label={value => value}
        value={value}
        onValueChange={setValue}
        min={min}
        max={max}
        step={step}
        labelPosition={labelPosition}
      />

      {/* Error Message */}
      {errorMessage && <Error>{errorMessage}</Error>}
    </div>
  );
};

export default memo(DualRangeSliderBox);
