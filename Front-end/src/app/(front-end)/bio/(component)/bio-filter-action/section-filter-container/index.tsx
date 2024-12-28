import { cn } from "@/lib/utils";
import { memo } from "react";
type Props = {
  children?: React.ReactNode;
  className?: string;
};

const SectionFilterContainer = ({ children, className }: Props) => {
  return <div className={cn("py-2", className)}>{children}</div>;
};

export default memo(SectionFilterContainer);
