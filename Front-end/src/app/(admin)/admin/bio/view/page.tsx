import DefaultLoading from "@/components/blocks/loading/default";
import dynamic from "next/dynamic";
const ViewsTable = dynamic(
  () => import("@/components/dashboard/tables/views-table"),
  {
    loading: () => <DefaultLoading />,
  }
);
const View = () => {
  return (
    <>
      <ViewsTable />
    </>
  );
};

export default View;
