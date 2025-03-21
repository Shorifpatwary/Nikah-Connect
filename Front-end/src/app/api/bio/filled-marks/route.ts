import { backendUrl, filledMarks } from "@/assets/data/config/app.config";
import { FilledMarksInterface } from "@/assets/data/response-types/bio/filled-marks";
import { getHeaders } from "@/lib/request/header/getHeaders";
import { getUserIdFromCookies } from "@/lib/request/header/getUserIdFromCookies";
import { setCookiesFromResponse } from "@/lib/request/header/setCookies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromCookies();

  // Construct the request URL with query string
  const apiUrl = `${backendUrl}/api/user-bio/filled-marks`;

  const headers = await getHeaders();
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        ...headers,
      },
      cache: "force-cache", //TODO:  talk with ai, whey next js caching are not working with dynamic tags.
      next: {
        tags: [`${filledMarks}_${userId}`],
      },
    });
    // update the credentials
    await setCookiesFromResponse(response);
    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP error! Status: ${response.status}` },
        { status: response.status }
      );
    }
    const data: FilledMarksInterface = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
