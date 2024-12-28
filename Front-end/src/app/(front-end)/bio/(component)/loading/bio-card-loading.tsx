import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const BioCardLoader = () => {
  return (
    <div
      className={cn(
        "box-border flex w-full max-w-sm grow flex-col gap-2 border border-accent  px-1 py-8 sm:w-[49%] sm:flex-col sm:gap-5 lg:w-[32.5%] 2xl:w-[24%]"
      )}
    >
      <div className="border-0 border-b border-primary pt-4">
        <div className="flex flex-1 flex-row justify-center gap-2 py-4 align-top">
          {/* Avatar Section */}
          <div className="flex w-6/12 flex-col items-end justify-center gap-6 p-1 text-right align-middle">
            <Skeleton className=" h-28 w-28  rounded-full" />
            <div className="flex w-full flex-1 justify-center gap-1 py-2">
              <Skeleton className="h-12 grow basis-12 rounded-full" />
              <Skeleton className="h-12 grow basis-12 rounded-full " />
              <Skeleton className="h-12 grow basis-12 rounded-full" />
            </div>
          </div>
          {/* Info Section */}
          <div className="flex w-6/12 flex-col items-end justify-end  gap-8 p-1  align-middle">
            <Skeleton className="h-6 w-2/4" />
            <div className="flex w-full flex-col items-end gap-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-2/4" />
            </div>
            <div className=" flex w-full flex-col items-end gap-1">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 py-8">
        <Skeleton className="h-8 w-4/6" />
        <Skeleton className="h-8 w-4/6" />
        <Skeleton className="h-8 w-4/6" />
        <Skeleton className="h-8 w-4/6" />
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-10 w-5/6" />
      </div>
    </div>
  );
};

export default BioCardLoader;
