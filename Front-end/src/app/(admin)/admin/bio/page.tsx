import DefaultLoading from "@/components/blocks/loading/default";
import dynamic from "next/dynamic";

const BioTable = dynamic(
  () => import("@/components/dashboard/tables/bios-table"),
  {
    loading: () => <DefaultLoading />,
  }
);
const Dashboard = () => {
  return <BioTable />;
};

export default Dashboard;
