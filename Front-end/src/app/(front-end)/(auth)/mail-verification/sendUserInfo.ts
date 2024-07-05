import { backendUrl } from "@/assets/data/config/app.config";
import { fetchRequest } from "@/lib/request/fetchRequest";
import { userAgent } from "next/server";

async function getIpInfo() {
  // const ipInfoUrl = `https://ipinfo.io/json?token=${process.env.IP_INFO_TOKEN}`;
  const ipInfoUrl = `https://ipinfo.io/json?token=43a3a11b8dce17`;

  const response = await fetch(ipInfoUrl);
  return response.json();
}

export async function sendUserInfo(request: Request) {
  const ua = userAgent(request);
  const ipInfo = await getIpInfo();
  // Get screen resolution
  const screenResolution = `${window.screen.width}x${window.screen.height}`;

  const userInfo = {
    device_type: ua.device.type || "unknown",
    device_os: ua.os.name || "unknown",
    browser_name: ua.browser.name || "unknown",
    browser_version: ua.browser.version || "unknown",
    ip_address: ipInfo.ip || "unknown",
    country: ipInfo.country || "unknown",
    city: ipInfo.city || "unknown",
    user_agent: request.headers.get("user-agent") || "unknown",
    registration_source: "web",
    device_model: ua.device.model || "unknown",
    screen_resolution: screenResolution,
    internet: ipInfo.org || "unknown",
    region: ipInfo.region || "unknown",
    postal: ipInfo.postal || "unknown",
    loc: ipInfo.loc,
    timezone: ipInfo.timezone,
  };
  try {
    // Make fetch request to register user
    const url = `${backendUrl}/api/user-info`;
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "POST",
        body: JSON.stringify(userInfo),
      },
    });
    console.log(response, "response");
  } catch (error) {
    console.log(error, "error ");
  }
}
