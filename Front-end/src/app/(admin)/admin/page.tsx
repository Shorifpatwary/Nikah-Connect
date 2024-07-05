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
    <h2> This is a Dashboard Home Page</h2>
    </>
  );
};

export default Dashboard;
