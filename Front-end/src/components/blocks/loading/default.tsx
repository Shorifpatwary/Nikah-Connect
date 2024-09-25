import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
interface SkeletonProps {
  className?: string;
  skeletonCN?: string;
  children?: React.ReactNode;
}
const DefaultLoading = ({ className, skeletonCN }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center gap-2 space-x-4",
        className
      )}
    >
      <Skeleton className={cn("h-14 w-14 rounded-full", skeletonCN)} />
      <Skeleton className={cn("h-14 w-14 rounded-full", skeletonCN)} />
      <Skeleton className={cn("h-14 w-14 rounded-full", skeletonCN)} />
    </div>
  );
};

export default DefaultLoading;
