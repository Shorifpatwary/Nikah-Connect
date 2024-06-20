"use client";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardBreadcrumb = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter(path => path);
  let dropdownPathNames: string[] = [];
  if (pathNames.length > 2) {
    dropdownPathNames = pathNames.slice(1, -2);
  }

  if (dropdownPathNames.length > 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${pathNames.slice(0, 1).join("/")}`}>
              {pathNames[0]}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {dropdownPathNames.map((item, index) => (
                  <DropdownMenuItem key={index}>
                    <BreadcrumbLink
                      className="capitalize"
                      href={`/${pathNames.slice(0, index + 2).join("/")}`}
                    >
                      {item}
                    </BreadcrumbLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              className="capitalize"
              href={`/${pathNames.slice(0, -1).join("/")}`}
            >
              {pathNames[pathNames.length - 2]}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">
              {pathNames[pathNames.length - 1]}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  // when breadcrumb item is less then 3 .
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathNames.map((item, index) => (
          <BreadcrumbItem key={item + index}>
            {index !== pathNames.length - 1 ? (
              <>
                <BreadcrumbLink
                  className="capitalize"
                  href={`/${pathNames.slice(0, index + 1).join("/")}`}
                >
                  {item}
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbPage className="capitalize">{item}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default React.memo(DashboardBreadcrumb);
