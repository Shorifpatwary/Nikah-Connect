import { deleteAuthCookies } from "@/app/(front-end)/(auth)/authCookie";
import { allBio, backendUrl } from "@/assets/data/config/app.config";
import { BiosWithPagination } from "@/assets/data/response-types/bio";
import { getHeaders } from "@/lib/request/header/getHeaders";
import { setCookiesFromResponse } from "@/lib/request/header/setCookies";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();

  // Construct the request URL with query string
  const apiUrl = `${backendUrl}/api/bio${queryString ? "?" + queryString : ""}`;

  const headers = await getHeaders();
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        ...headers,
      },
      next: {
        tags: [allBio],
        revalidate: 60 * 60, // Cache for 1 hour (in seconds)
      },
    });
    // update the credentials
    await setCookiesFromResponse(response);
    if (!response.ok) {
      if (response.status === 401) {
        // remove auth cookie
        deleteAuthCookies();
        redirect("/login");
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: BiosWithPagination = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
