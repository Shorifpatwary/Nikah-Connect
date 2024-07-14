"use client";
import Section from "@/components/blocks/section";
import TableSearchBox from "@/components/blocks/SS-table/search-box";
import T_Head, { columnType } from "@/components/blocks/SS-table/T-head";
import TableSkeleton from "@/components/blocks/SS-table/table-skeleton";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import CustomPagination from "@/components/blocks/pagination";
import RecordsPerPage from "@/components/blocks/SS-table/data-per-table";

import { TagsWithPagination } from "@/assets/data/response-types/tag";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleEllipsisIcon } from "lucide-react";
import Link from "next/link";

const tableColumns: columnType[] = [
  {
    title: "id",
    label: "ID",
    sortable: true,
  },
  {
    title: "name",
    label: "Name",
    sortable: true,
  },
  {
    title: "search_text",
    label: "Search Text",
    sortable: true,
  },
  {
    title: "group_name",
    label: "Group Name",
    sortable: true,
  },
  {
    title: "status",
    label: "status",
    sortable: true,
  },
  {
    title: "updated_at",
    label: "updated at",
    sortable: true,
  },
  {
    title: "action",
    label: "Action",
    sortable: false,
  },
];

const path = "/admin/tag";

const TagTable = () => {
  const params = useSearchParams();
  const [data, setData] = useState<TagsWithPagination>();
  const fetchData = async () => {
    try {
      const queryString = params.toString();
      const response = await fetch(`/api/attribute/tag?${queryString}`);
      // handle data
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [params]);

  const handleDelete = async (id: number) => {
    console.log(id, "delete handler ");
  };
  if (!data) {
    return (
      <Section rowClassName="flex-col gap-4 w-full">
        <TableSkeleton rowCount={10} rowClassName="h-10" />
      </Section>
    );
  }
  return (
    <Section rowClassName="flex-col gap-4 w-full">
      {/* table top header */}

      <div className="flex h-auto w-full items-center justify-between gap-2">
        {/* search box */}
        <TableSearchBox />
        {/* pagination */}
        <RecordsPerPage />

        <CustomPagination meta={data?.meta} />
      </div>
      {/* table  */}

      <Table>
        {/* table header */}
        <T_Head columns={tableColumns} />
        {/* table body */}
        <TableBody>
          {data?.data.map(item => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.search_text}</TableCell>
              <TableCell>{item.group_name}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.updated_at}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="overflow-hidden rounded-full"
                      size="icon"
                      variant="outline"
                    >
                      <CircleEllipsisIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="capitalize">
                    <DropdownMenuLabel className="capitalize">
                      actions
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link className="w-full" href={`${path}/${item.id}/view`}>
                        view
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link className="w-full" href={`${path}/${item.id}/edit`}>
                        edit
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="bold cursor-pointer text-destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Section>
  );
};
export default TagTable;
