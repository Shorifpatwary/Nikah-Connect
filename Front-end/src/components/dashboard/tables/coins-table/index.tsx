"use client";
import Section from "@/components/blocks/section";
import TableSearchBox from "@/components/blocks/SS-table/search-box";
import T_Head, { columnType } from "@/components/blocks/SS-table/T-head";
import TableSkeleton from "@/components/blocks/SS-table/table-skeleton";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import CustomPagination from "@/components/blocks/pagination";
import RecordsPerPage from "@/components/blocks/SS-table/data-per-table";

import { deleteAuthCookies } from "@/app/(front-end)/(auth)/authCookie";
import { CoinsWithPagination } from "@/assets/data/response-types/coin";
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
    label: "ID",
    name: "id",
    sortable: true,
  },
  {
    label: "Total Coin",
    name: "total_coin",
    sortable: true,
  },
  {
    label: "Total Purchase",
    name: "total_purchase",
    sortable: true,
  },
  {
    label: "Total Used",
    name: "total_used",
    sortable: true,
  },
  {
    label: "Email",
    name: "email",
    sortable: true,
  },
  {
    label: "Last Update",
    name: "updated_at",
    sortable: true,
  },
  {
    label: "Action",
    name: "action",
    sortable: false,
  },
];

const path = `${Routes.Admin}/coin`;
const apiBaseUrl = "/api/coin";

const CoinTable = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<CoinsWithPagination>();
  const fetchData = async () => {
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
            `Http error when fetching coin data ${response.status}`
          );
        }
      } else {
        // handle data
        const data = await response.json();
        setData(data);
      }
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
              <TableCell>{item.total_coin}</TableCell>
              <TableCell>{item.total_purchase}</TableCell>
              <TableCell>{item.total_used}</TableCell>
              <TableCell>{item.user.email}</TableCell>
              <TableCell>{formatReadableDate(item.updated_at)}</TableCell>
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
export default CoinTable;
