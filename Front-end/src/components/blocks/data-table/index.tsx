import * as React from "react";
import type { SearchParams } from "./types";

import { Shell } from "@/components/others/shell";
import { DataTableSkeleton } from "./data-table-skeleton";

import { TasksTable } from "@/components/_component/tasks-table";
import { TasksTableProvider } from "@/components/_component/tasks-table-provider";
import { getTasks } from "@/components/_lib/queries";
import { searchParamsSchema } from "@/components/_lib/validations";

export interface IndexPageProps {
  searchParams: SearchParams;
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const search = searchParamsSchema.parse(searchParams);

  const tasksPromise = getTasks(search);

  return (
    <Shell className="gap-2">
      {/**
       * The `TasksTableProvider` is use to enable some feature flags for the `TasksTable` component.
       * Feel free to remove this, as it's not required for the `TasksTable` component to work.
       */}
      <TasksTableProvider>
        {/**
         * The `DateRangePicker` component is used to render the date range picker UI.
         * It is used to filter the tasks based on the selected date range it was created at.
         * The business logic for filtering the tasks based on the selected date range is handled inside the component.
         */}
        {/* <DateRangePicker
          triggerSize="sm"
          triggerClassName="ml-auto w-56 sm:w-60"
          align="end"
          dateRange={
            search.from && search.to
              ? { from: new Date(search.from), to: new Date(search.to) }
              : undefined
          }
        /> */}
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
              shrinkZero
            />
          }
        >
          {/**
           * Passing promises and consuming them using React.use for triggering the suspense fallback.
           * @see https://react.dev/reference/react/use
           */}
          <TasksTable tasksPromise={tasksPromise} />
        </React.Suspense>
      </TasksTableProvider>
    </Shell>
  );
}
