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

import { UsersInfoWithPagination } from "@/assets/data/response-types/user-infos";
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
    title: "email",
    label: "E-Mail",
    sortable: true,
  },
  {
    title: "ip_address",
    label: "IP",
    sortable: true,
  },
  {
    title: "device_type",
    label: "Device",
    sortable: true,
  },
  {
    title: "device_model",
    label: "DM",
    sortable: true,
  },
  {
    title: "browser_name",
    label: "Browser",
    sortable: true,
  },
  {
    title: "browser_version",
    label: "BV",
    sortable: true,
  },
  {
    title: "internet",
    label: "Internet",
    sortable: true,
  },
  {
    title: "city",
    label: "City",
    sortable: true,
  },
  {
    title: "action",
    label: "Action",
    sortable: false,
  },
];

const UsersInfoTable = () => {
  const params = useSearchParams();
  const [usersInfo, setUsersInfo] = useState<UsersInfoWithPagination>();
  const fetchData = async () => {
    try {
      const queryString = params.toString();
      const response = await fetch(`/api/marketing/user-info?${queryString}`);
      // handle data
      const data = await response.json();
      setUsersInfo(data);
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
  if (!usersInfo) {
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

        <CustomPagination meta={usersInfo?.meta} />
      </div>
      {/* table  */}

      <Table>
        {/* table header */}
        <T_Head columns={tableColumns} />
        {/* table body */}
        <TableBody>
          {usersInfo?.data.map(userInfo => (
            <TableRow key={userInfo.id}>
              <TableCell className="font-medium">{userInfo.id}</TableCell>
              <TableCell className="font-medium">
                {userInfo.user.email}
              </TableCell>
              <TableCell>{userInfo.ip_address}</TableCell>
              <TableCell>{userInfo.device_type}</TableCell>
              <TableCell>{userInfo.device_model}</TableCell>
              <TableCell>{userInfo.browser_name}</TableCell>
              <TableCell>{userInfo.browser_version}</TableCell>
              <TableCell>{userInfo.internet}</TableCell>
              <TableCell>{userInfo.city}</TableCell>
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
                      <Link
                        className="w-full"
                        href={`/admin/user-info/${userInfo.id}/view`}
                      >
                        view
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        className="w-full"
                        href={`/admin/user-info/${userInfo.id}/edit`}
                      >
                        edit
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="bold cursor-pointer text-destructive"
                      onClick={() => handleDelete(userInfo.id)}
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
export default UsersInfoTable;
