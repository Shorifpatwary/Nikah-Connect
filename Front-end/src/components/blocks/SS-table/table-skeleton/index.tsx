import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  rowCount: number;
  rowClassName?: string;
};

const TableSkeleton = ({ className, rowCount, rowClassName }: Props) => {
  return (
    <div className={cn(" flex w-full flex-col gap-2", className)}>
      {/* table body */}

      {Array.from({ length: rowCount }).map((_, index) => (
        <Skeleton key={index} className={cn("h-10 w-full", rowClassName)} />
      ))}
    </div>
  );
};

export default TableSkeleton;
