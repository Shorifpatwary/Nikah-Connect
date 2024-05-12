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
        "flex w-full flex-row items-center justify-center p-4 py-28",
        className
      )}
      {...props}
    >
      <div className={cn("flex w-11/12 justify-between gap-2", rowClassName)}>
        {children}
      </div>
    </Tag>
  );
};

export default Section;
