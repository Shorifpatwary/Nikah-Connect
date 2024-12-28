import BioCardLoader from "@/app/(front-end)/bio/(component)/loading/bio-card-loading";
import { Skeleton } from "@/components/ui/skeleton";

const BioPageLoader = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between overflow-hidden p-4">
      <div className="flex  flex-col items-center justify-center gap-4 ">
        <Skeleton className="h-12 w-72" />
        <Skeleton className="h-6 w-60" />
      </div>
      <div className="flex w-full flex-1 justify-between p-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-8 w-40" />
      </div>
      <div className="flex w-full flex-1 flex-shrink flex-wrap  justify-center gap-2 py-6">
        <BioCardLoader />
        <BioCardLoader />
        <BioCardLoader />
      </div>
      {/* pagination info loader */}
      <div className="flex w-full flex-1 flex-shrink flex-wrap  items-center justify-between gap-2 py-6">
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-10 w-60" />
      </div>
    </div>
  );
};

export default BioPageLoader;
