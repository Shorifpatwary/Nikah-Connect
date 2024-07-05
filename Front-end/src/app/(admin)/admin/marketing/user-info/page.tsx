import DefaultLoading from "@/components/blocks/loading/default";
import UsersInfoTable from "@/components/dashboard/tables/users-info-table";
import dynamic from "next/dynamic";
const UsersTable = dynamic(
  () => import("@/components/dashboard/tables/users-table"),
  {
    loading: () => <DefaultLoading />,
  }
);
const UserInfo = () => {
  return (
    <>
      <UsersInfoTable />
    </>
  );
};

export default UserInfo;
