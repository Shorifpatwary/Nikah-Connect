import DefaultLoading from "@/components/blocks/loading/default";
import dynamic from "next/dynamic";
const SaleTable = dynamic(
  () => import("@/components/dashboard/tables/purchases-table"),
  {
    loading: () => <DefaultLoading />,
  }
);
const Purchase = () => {
  return (
    <>
      <SaleTable />
    </>
  );
};

export default Purchase;
