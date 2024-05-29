import Section from "@/components/blocks/section";
import TableSearchBox from "@/components/blocks/SS-table/search-box";
import { Table } from "@/components/ui/table";
type Props = {};

const SSTable = (Props: Props) => {
  return (
    <Section rowClassName="flex-col gap-4 w-full">
      {/* table top header */}
      <div className="flex h-auto w-full items-center justify-between gap-2">
        {/* search box */}
        <TableSearchBox />
        {/* pagination */}
        {/* <CustomPagination /> */}
      </div>
      {/* table  */}
      <Table>
        {/* table header */}
        {/* <T_Head /> */}
        {/* table body */}
        {/* {TBody} */}
      </Table>
    </Section>
  );
};

export default SSTable;
