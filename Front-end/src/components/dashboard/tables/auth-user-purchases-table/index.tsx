"use client";
import Section from "@/components/blocks/section";
import TableSearchBox from "@/components/blocks/SS-table/search-box";
import T_Head, { columnType } from "@/components/blocks/SS-table/T-head";
import TableSkeleton from "@/components/blocks/SS-table/table-skeleton";

import CustomPagination from "@/components/blocks/pagination";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import RecordsPerPage from "@/components/blocks/SS-table/data-per-table";

import { deleteAuthCookies } from "@/app/(front-end)/(auth)/authCookie";
import BioProfile from "@/app/(front-end)/bio/(component)/bio-card/bio-profile";
import { PurchasesWithPagination } from "@/assets/data/response-types/purchase";
import Routes from "@/assets/data/routes";
import { formatReadableDate, getInitialSerialNumber } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const tableColumns: columnType[] = [
  {
    label: "SL No",
    name: "sl_nos",
    sortable: false,
  },
  {
    label: "Profile",
    name: "bio_profile",
    sortable: true,
  },
  {
    label: "Title",
    name: "title",
    sortable: true,
  },
  {
    label: "Last Updated",
    name: "updated_at",
    sortable: true,
  },
  {
    label: "bio",
    name: "bio",
    sortable: false,
  },
  {
    label: "Purchase",
    name: "created_at",
    sortable: true,
  },
];

const PurchaseTable = () => {
  const apiBaseUrl = "/api/bio/purchase/user-records";

  const params = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<PurchasesWithPagination>();
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
            `Http error when fetching purchase data ${response.status}`
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
  let slNo = getInitialSerialNumber(
    data?.meta.per_page,
    data?.meta.current_page
  );

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
              <TableCell className="font-medium">{slNo++}</TableCell>
              <TableCell>
                <BioProfile
                  bio_profile={item.bio.bio_profile}
                  className="w-20"
                />
              </TableCell>
              <TableCell>{item.bio.title}</TableCell>

              <TableCell>{formatReadableDate(item.bio.updated_at)}</TableCell>
              <TableCell>
                <Link
                  href={`${Routes.bio.url}/${item.bio.id}/${item.bio.title}`}
                  prefetch={false}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="text-primary" />
                </Link>
              </TableCell>
              <TableCell>{formatReadableDate(item.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Section>
  );
};
export default PurchaseTable;
