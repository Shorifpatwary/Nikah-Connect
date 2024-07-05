export const getQueryString = (): string => {
  if (typeof window !== "undefined") {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.toString();
  }
  return "";
};
// import { useSearchParams } from "next/navigation";
// import { NextRequest } from "next/server";

// export const getQueryString = (request?: NextRequest): string => {
//   if (request) {
//     // Server-side: Use the NextRequest object to get search parameters
//     return request.nextUrl.searchParams.toString();
//   } else {
//     // Client-side: Use the useSearchParams hook to get search parameters
//     const params = useSearchParams();
//     return params.toString();
//   }
// };
