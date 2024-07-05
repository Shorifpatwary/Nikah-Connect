import { allUsersTag, backendUrl } from "@/assets/data/config/app.config";
import { UsersWithPagination } from "@/assets/data/response-types/users";
import { getHeaders } from "@/lib/request/header/getHeaders";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();

  // Construct the request URL with query string
  const apiUrl = `${backendUrl}/api/user${queryString ? "?" + queryString : ""}`;

  const headers = await getHeaders();
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        ...headers,
      },
      next: {
        tags: [allUsersTag],
        revalidate: 60 * 60, // Cache for 1 hour (in seconds)
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: UsersWithPagination = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
