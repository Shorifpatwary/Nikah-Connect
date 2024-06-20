import DefaultLoading from "@/components/blocks/loading/default";
import dynamic from "next/dynamic";
const UsersTable = dynamic(
  () => import("@/components/dashboard/tables/users-table"),
  {
    loading: () => <DefaultLoading />,
  }
);
const Dashboard = () => {
  return (
    <>
      <UsersTable />
    </>
  );
};

export default Dashboard;
