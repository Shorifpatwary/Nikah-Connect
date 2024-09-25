import { backendUrl, filledMarks } from "@/assets/data/config/app.config";
import { FilledMarksInterface } from "@/assets/data/response-types/bio/filled-marks";
import { getHeaders } from "@/lib/request/header/getHeaders";
import { getUserIdFromCookies } from "@/lib/request/header/getUserIdFromCookies";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const userId = getUserIdFromCookies();

  // Construct the request URL with query string
  const apiUrl = `${backendUrl}/api/user-bio/filled-marks`;

  const headers = await getHeaders();
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        ...headers,
      },
      cache: "force-cache",
      next: {
        tags: [`${filledMarks}_${userId}`],
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: FilledMarksInterface = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
