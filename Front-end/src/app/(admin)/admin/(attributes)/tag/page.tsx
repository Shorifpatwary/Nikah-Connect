import DefaultLoading from "@/components/blocks/loading/default";
import dynamic from "next/dynamic";
const TagTable = dynamic(
  () => import("@/components/dashboard/tables/tags-table"),
  {
    loading: () => <DefaultLoading />,
  }
);
const Tag = () => {
  return (
    <>
      <TagTable />
    </>
  );
};

export default Tag;
