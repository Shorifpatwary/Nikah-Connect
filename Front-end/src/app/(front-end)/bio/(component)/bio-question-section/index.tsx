import { TitleMd } from "@/components/blocks/typography";
import { cn } from "@/lib/utils";
type Props = {
  title: string;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
};

const BioQuestionsSection = ({
  children,
  className,
  title,
  containerClassName,
}: Props) => {
  return (
    <div
      className={cn(
        "rounder flex w-full flex-col justify-center gap-2 rounded-lg py-2 text-center",
        className
      )}
    >
      {/* title */}
      <div className="py-4 text-primary">
        <TitleMd>{title}</TitleMd>
      </div>
      {/* questions */}
      <div
        className={cn(
          "flex w-full flex-wrap justify-start",
          containerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default BioQuestionsSection;
