import DefaultLoading from "@/components/blocks/loading/default";
import dynamic from "next/dynamic";
const PurchaseTable = dynamic(
  () => import("@/components/dashboard/tables/auth-user-purchases-table"),
  {
    loading: () => <DefaultLoading />,
  }
);
const Purchase = () => {
  return (
    <>
      <PurchaseTable />
    </>
  );
};

export default Purchase;
