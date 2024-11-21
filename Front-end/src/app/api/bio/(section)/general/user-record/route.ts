import { deleteAuthCookies } from "@/app/(front-end)/(auth)/authCookie";
import { backendUrl, generals } from "@/assets/data/config/app.config";
import { generalSectionInterface } from "@/assets/data/response-types/bio";
import { getHeaders } from "@/lib/request/header/getHeaders";
import { getUserIdFromCookies } from "@/lib/request/header/getUserIdFromCookies";
import { setCookiesFromResponse } from "@/lib/request/header/setCookies";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromCookies();

  // Construct the request URL with query string
  const apiUrl = `${backendUrl}/api/bio/general/user-record`;

  const headers = await getHeaders();
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        ...headers,
      },
      cache: "force-cache",
      next: {
        tags: [`${generals}_${userId}`],
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

    const data: generalSectionInterface = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
