import { ParagraphSm } from "@/components/blocks/typography";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Error: React.FC<Props> = ({ children, className }) => {
  return (
    <ParagraphSm className={cn("text-red-500", className)}>
      {children}
    </ParagraphSm>
  );
};

export default Error;
