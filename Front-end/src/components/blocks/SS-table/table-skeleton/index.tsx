import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const TableSkeleton = ({ className }: Props) => {
  return (
    <div className={cn(" flex w-full flex-col gap-2", className)}>
      {/* table body */}
      <Skeleton className="h-10 w-full " />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full " />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full " />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full " />
      <Skeleton className="h-10 w-full" />
    </div>
  );
};

export default TableSkeleton;
