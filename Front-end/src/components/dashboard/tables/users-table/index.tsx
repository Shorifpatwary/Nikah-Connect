"use client";
import { UsersWithPagination } from "@/assets/data/response-types/users";
import Section from "@/components/blocks/section";
import TableSearchBox from "@/components/blocks/SS-table/search-box";
import T_Head, { columnType } from "@/components/blocks/SS-table/T-head";
import TableSkeleton from "@/components/blocks/SS-table/table-skeleton";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import CustomPagination from "@/components/blocks/pagination";
import RecordsPerPage from "@/components/blocks/SS-table/data-per-table";

import { deleteAuthCookies } from "@/app/(front-end)/(auth)/authCookie";
import Routes from "@/assets/data/routes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatReadableDate } from "@/lib/utils";
import { CircleEllipsisIcon } from "lucide-react";
import Link from "next/link";

const tableColumns: columnType[] = [
  {
    name: "id",
    label: "ID",
    sortable: true,
  },
  {
    name: "name",
    sortable: true,
    label: "Name",
  },
  {
    name: "email",
    label: "E-Mail",
    sortable: true,
  },
  {
    name: "phone",
    label: "Phone",
    sortable: true,
  },
  {
    name: "updated_at",
    label: "Updated At",
    sortable: true,
    className: "w-[100px]",
  },
  {
    name: "action",
    label: "Action",
    sortable: false,
  },
];

const UsersTable = () => {
  const pathname = usePathname();
  const apiBaseUrl = "/api/user";

  const params = useSearchParams();
  const router = useRouter();

  const [users, setUsers] = useState<UsersWithPagination>();
  const fetchUsers = async () => {
    try {
      const queryString = params.toString();
      const response = await fetch(`${apiBaseUrl}?${queryString}`);
      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401) {
          // remove auth cookie
          deleteAuthCookies();
          //  redirect to the login page
          router.push(Routes.Login);
        } else {
          console.error(
            `Http error when fetching purchase data ${response.status}`
          );
        }
      } else {
        // handle data
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [params]);
  const handleDelete = async (id: number) => {
    console.log(id, "delete handler ");
    // currently delete are not available
    // try {
    //   const response = await deleteUser(id);
    //   if (response.status === 200 ) {
    //     fetchUsers();
    //   }
    // } catch (error: any) {
    //   console.error(error.message);
    // }
  };
  if (!users) {
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

        <CustomPagination meta={users?.meta} />
      </div>
      {/* table  */}

      <Table>
        {/* table header */}
        <T_Head columns={tableColumns} />
        {/* table body */}
        <TableBody>
          {users?.data.map(user => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{formatReadableDate(user.updated_at)}</TableCell>
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
                        href={`${pathname}/${user.id}/view`}
                      >
                        view
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        className="w-full"
                        href={`${pathname}/${user.id}/edit`}
                      >
                        edit
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className=" bold cursor-pointer text-destructive"
                      onClick={() => handleDelete(user.id)}
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
export default UsersTable;
