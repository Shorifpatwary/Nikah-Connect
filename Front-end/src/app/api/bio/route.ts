import { allBio, backendUrl } from "@/assets/data/config/app.config";
import { BiosWithPagination } from "@/assets/data/response-types/bio/bio";
import { getHeaders } from "@/lib/request/header/getHeaders";
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

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: BiosWithPagination = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
