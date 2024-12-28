"use client";

import { ReadonlyURLSearchParams } from "next/navigation";

// Parses query parameters with searchParams as input
export const getQueryParams = (searchParams: ReadonlyURLSearchParams) => {
  const params: Record<string, string> = {};

  // Iterate through each query parameter
  searchParams.forEach((value, key) => {
    // Add parameters directly to params
    params[key] = value;
  });

  return { params };
};

// Parses query parameters with searchParams as input
// export const getQueryParams = (searchParams: ReadonlyURLSearchParams) => {
//   const params: Record<string, string> = {};
//   const filters: Record<string, any> = {};

//   // Iterate through each query parameter
//   searchParams.forEach((value, key) => {
//     if (key.startsWith("filter[")) {
//       // Match patterns for nested filters
//       const match = key.match(/^filter\[(.+?)](?:\[(.+?)])?$/);
//       if (match) {
//         const [, field, subfield] = match;

//         // Handle subfield filters like `filter[height][min]`
//         if (subfield) {
//           if (!filters[field]) filters[field] = {};
//           filters[field][subfield] = value; // No need to decode, `useSearchParams` already provides decoded values
//         } else {
//           // Handle array-style filters like `filter[gender]=value1,value2`
//           filters[field] = value.split(",");
//         }
//       }
//     } else {
//       // Add non-filter query parameters
//       params[key] = value;
//     }
//   });

//   return { params, filters };
// };

// export const getQueryParams = () => {
//   if (typeof window !== "undefined") {
//     const urlSearchParams = new URLSearchParams(window.location.search);
//     const params: Record<string, string> = {};
//     urlSearchParams.forEach((value, key) => {
//       params[key] = value;
//     });
//     return params;
//   }
//   return {};
// };
