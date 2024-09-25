import { backendUrl, filledMarks } from "@/assets/data/config/app.config";
import { FilledMarksInterface } from "@/assets/data/response-types/bio/filled-marks";
import { getHeaders } from "@/lib/request/header/getHeaders";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  // Construct the request URL with query string
  const apiUrl = `${backendUrl}/api/bio/filled-mark`;

  const headers = await getHeaders();
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        ...headers,
      },
      next: {
        tags: [`${filledMarks}_${id}`],
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
