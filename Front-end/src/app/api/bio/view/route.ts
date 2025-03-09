import { allViewsTag, backendUrl } from "@/assets/data/config/app.config";
import { ViewsWithPagination } from "@/assets/data/response-types/view";
import { getHeaders } from "@/lib/request/header/getHeaders";
import { setCookiesFromResponse } from "@/lib/request/header/setCookies";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();

  // Construct the request URL with query string
  const apiUrl = `${backendUrl}/api/bio/view${queryString ? "?" + queryString : ""}`;

  const headers = await getHeaders();
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        ...headers,
      },
      next: {
        tags: [allViewsTag],
        revalidate: 60 * 60, // Cache for 1 hour (in seconds)
      },
    });

    // Update authentication cookies
    await setCookiesFromResponse(response);

    if (!response.ok) {
      // Delete auth cookie from the API call when response is 401
      return NextResponse.json(
        { error: `HTTP error! Status: ${response.status}` },
        { status: response.status }
      );
    }

    const data: ViewsWithPagination = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
