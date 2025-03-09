import DefaultLoading from "@/components/blocks/loading/default";
import dynamic from "next/dynamic";
const HistoryTable = dynamic(
  () => import("@/components/dashboard/tables/auth-user-views-table"),
  {
    loading: () => <DefaultLoading />,
  }
);
const History = () => {
  return (
    <>
      <HistoryTable />
    </>
  );
};

export default History;
