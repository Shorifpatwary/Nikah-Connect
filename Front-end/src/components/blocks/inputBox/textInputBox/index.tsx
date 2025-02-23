import Error from "@/components/blocks/form-helper/error";
import Suggestion from "@/components/blocks/form-helper/suggestion";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Dispatch, memo, ReactNode, SetStateAction } from "react";

interface Props extends InputProps {
  fieldName: string;
  className?: string;
  label: string | ReactNode;
  labelRequired?: boolean;
  errorMessage?: string | undefined;
  suggestions?: string[];
  register: {};
  setValue?: Dispatch<SetStateAction<string>>;
}

const TextInputBox = ({
  label,
  labelRequired = false,
  setValue,
  fieldName,
  errorMessage,
  suggestions,
  register,
  className,
  ...props
}: Props) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Label
        htmlFor={fieldName}
        className={"text-lg capitalize max-md:text-xl"}
      >
        {label}
        {labelRequired && <span className="ml-1 text-red-600">(*)</span>}
      </Label>
      {suggestions && suggestions.length > 0 && (
        <Suggestion suggestions={suggestions} />
      )}
      {/* input */}
      <Input
        {...props}
        id={fieldName}
        autoComplete={fieldName}
        {...register}
        className={`${
          props.type === "email" || props.type === "password"
            ? "text-base"
            : "text-xl md:text-lg"
        }`}
      />

      {errorMessage && <Error>{errorMessage}</Error>}
    </div>
  );
};

export default memo(TextInputBox);
