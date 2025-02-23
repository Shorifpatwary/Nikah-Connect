import Error from "@/components/blocks/form-helper/error";
import Suggestion from "@/components/blocks/form-helper/suggestion";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Dispatch,
  memo,
  ReactNode,
  SetStateAction,
  TextareaHTMLAttributes,
} from "react";

// Define the Props interface
interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  fieldName: string;
  className?: string;
  label: string | ReactNode;
  labelRequired?: boolean;
  errorMessage?: string | undefined;
  suggestions?: string[];
  register: {};
  setValue?: Dispatch<SetStateAction<string>>;
}

// Create the TextareaBox component
const TextareaBox = ({
  label,
  labelRequired = false,
  className,
  setValue,
  fieldName,
  errorMessage,
  suggestions,
  register,
  ...props
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {/* Label */}
      <Label
        htmlFor={fieldName}
        className={"text-lg capitalize max-md:text-xl"}
      >
        {label}{" "}
        {labelRequired && <span className="ml-1 text-red-600">(*)</span>}
      </Label>

      {/* Suggestions, if any */}
      {suggestions && suggestions.length > 0 && (
        <Suggestion suggestions={suggestions} />
      )}

      {/* Textarea */}
      <Textarea
        className={cn("text-xl md:text-lg", className)}
        rows={4}
        {...props}
        id={fieldName}
        autoComplete={fieldName}
        {...register}
      />

      {/* Error message, if any */}
      {errorMessage && <Error>{errorMessage}</Error>}
    </div>
  );
};

export default memo(TextareaBox);
