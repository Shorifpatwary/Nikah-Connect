import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  suggestions: string[];
  labelClassName?: string;
};

const Suggestion: React.FC<Props> = ({
  suggestions,
  className,
  labelClassName,
}) => {
  return (
    <div className={cn("flex flex-wrap gap-1 text-primary", className)}>
      {suggestions.map(suggestion => (
        <Label className={cn("", labelClassName)} key={suggestion}>
          {suggestion}
        </Label>
      ))}
    </div>
  );
};

export default Suggestion;
