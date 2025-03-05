import DefaultLoading from "@/components/blocks/loading/default";
import dynamic from "next/dynamic";
const CoinsTable = dynamic(
  () => import("@/components/dashboard/tables/coins-table"),
  {
    loading: () => <DefaultLoading />,
  }
);
const Dashboard = () => {
  return (
    <>
      <CoinsTable />
    </>
  );
};

export default Dashboard;
