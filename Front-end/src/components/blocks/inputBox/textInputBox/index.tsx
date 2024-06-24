import Error from "@/components/blocks/form-helper/error";
import Suggestion from "@/components/blocks/form-helper/suggestion";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, memo, ReactNode, SetStateAction } from "react";

interface Props extends InputProps {
  fieldName: string;
  label: string | ReactNode;
  errorMessage?: string | undefined;
  suggestions?: string[];
  setValue?: Dispatch<SetStateAction<string>>;
}

const TextInputBox = ({
  label,
  setValue,
  fieldName,
  errorMessage,
  suggestions,
  ...props
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <Label
        htmlFor={fieldName}
        className={"text-lg capitalize max-md:text-xl"}
      >
        {label}
      </Label>
      {suggestions && suggestions.length > 0 && (
        <Suggestion suggestions={suggestions} />
      )}
      {/* input */}
      <Input {...props} id={fieldName} />

      {errorMessage && <Error>{errorMessage}</Error>}
    </div>
  );
};

export default memo(TextInputBox);
