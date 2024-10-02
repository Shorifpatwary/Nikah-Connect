export const dynamic = "force-dynamic";
import { backendUrl } from "@/assets/data/config/app.config";
import { setCookiesFromResponse } from "@/lib/request/header/setCookies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = `${backendUrl}/sanctum/csrf-cookie`;

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    // update the credentials
    await setCookiesFromResponse(response);
    if (!response.ok) {
      throw new Error("Failed to fetch CSRF token");
    }

    // Respond with success message or token if needed
    // res.status(200).json({ message: "CSRF cookie set successfully" });
    return response;
    // return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    NextResponse.json({ error: "Internal server error" });
  }
}
