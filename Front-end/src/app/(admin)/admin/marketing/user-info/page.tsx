import DefaultLoading from "@/components/blocks/loading/default";
import dynamic from "next/dynamic";
const UsersInfoTable = dynamic(
  () => import("@/components/dashboard/tables/users-info-table"),
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
