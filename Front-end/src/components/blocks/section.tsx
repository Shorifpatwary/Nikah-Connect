import { cn } from "@/lib/utils";

interface SectionProps {
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  rowClassName?: string;
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  tag: Tag = "section",
  className,
  children,
  rowClassName,
  ...props
}) => {
  return (
    <Tag
      className={cn(
        "flex min-h-96 w-11/12 flex-row items-center justify-center py-10",
        className
      )}
      {...props}
    >
      <div className={cn("flex w-full justify-between gap-2", rowClassName)}>
        {children}
      </div>
    </Tag>
  );
};

export default Section;
