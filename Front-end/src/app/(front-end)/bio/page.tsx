"use client";

import BioPageContent from "@/app/(front-end)/bio/(component)/bio-page-content";
import BioPageLoader from "@/app/(front-end)/bio/(component)/loading/bio-page-loading";
import { Suspense } from "react";

const BioPage = () => {
  return (
    <Suspense fallback={<BioPageLoader />}>
      <BioPageContent />
    </Suspense>
  );
};

export default BioPage;
