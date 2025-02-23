import { allBio, backendUrl } from "@/assets/data/config/app.config";
import { BioInterface } from "@/assets/data/response-types/bio";
import { getHeaders } from "@/lib/request/header/getHeaders";
import { getUserIdFromCookies } from "@/lib/request/header/getUserIdFromCookies";
import { setCookiesFromResponse } from "@/lib/request/header/setCookies";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const apiUrl = `${backendUrl}/api/bio/user-record`;

  const headers = await getHeaders();
  const userId = await getUserIdFromCookies();
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        ...headers,
      },
      next: {
        tags: [`${allBio}_${userId}`],
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

    const data: BioInterface = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(`Error fetching user record: ${error}`);
  }
}
