import { allUsersInfoTag, backendUrl } from "@/assets/data/config/app.config";
import { UsersInfoWithPagination } from "@/assets/data/response-types/user-infos";

import { getHeaders } from "@/lib/request/header/getHeaders";
import { NextResponse, userAgent, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();
  const ua = userAgent(request);
  console.log(ua, "user agent ");
  // Construct the request URL with query string
  const apiUrl = `${backendUrl}/api/user-info${queryString ? "?" + queryString : ""}`;

  const headers = await getHeaders();
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        ...headers,
      },
      next: {
        tags: [allUsersInfoTag],
        revalidate: 60 * 60, // Cache for 1 hour (in seconds)
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: UsersInfoWithPagination = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
