import { allBio, backendUrl } from "@/assets/data/config/app.config";
import { getHeaders } from "@/lib/request/header/getHeaders";
import { getUserIdFromCookies } from "@/lib/request/header/getUserIdFromCookies";
import { setCookiesFromResponse } from "@/lib/request/header/setCookies";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const apiUrl = `${backendUrl}/api/bio/view/user-records`;

  const headers = await getHeaders();
  const userId = await getUserIdFromCookies();

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        ...headers,
      },
      next: {
        tags: [`${allBio}_views_${userId}`],
        revalidate: 60 * 60, // Cache for 1 hour
      },
    });

    // Update cookies from response
    await setCookiesFromResponse(response);

    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP error! Status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(`Error fetching user view records: ${error}`);
  }
}
