import { allLocations, backendUrl } from "@/assets/data/config/app.config";
import { LocationType } from "@/assets/data/response-types/locations";

export async function GET() {
  const apiUrl = `${backendUrl}/api/location`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
      next: { tags: [allLocations] },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: LocationType[] = await response.json();
    return Response.json(data);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
