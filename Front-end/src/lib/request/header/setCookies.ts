import { cookies } from "next/headers";

export const setCookiesFromResponse = async (
  response: Response
): Promise<void> => {
  const setCookieHeaders = response.headers.get("set-cookie");

  if (setCookieHeaders) {
    const cookiesString = setCookieHeaders
      .split(",")
      .map(cookie => cookie.trim());

    for (const cookie of cookiesString) {
      const [nameValue, ...attributes] = cookie.split(";");
      const [name, value] = nameValue.split("=");

      const options: {
        expires?: Date;
        maxAge?: number;
        path?: string;
        domain?: string;
        secure?: boolean;
        httpOnly?: boolean;
        sameSite?: "strict" | "lax" | "none";
      } = {};

      for (const attr of attributes) {
        const [attrName, attrValue] = attr.trim().split("=");
        switch (attrName.toLowerCase()) {
          case "expires":
            options.expires = new Date(attrValue);
            break;
          case "max-age":
            options.maxAge = parseInt(attrValue, 10);
            break;
          case "path":
            options.path = attrValue;
            break;
          case "domain":
            options.domain = attrValue;
            break;
          case "secure":
            options.secure = true;
            break;
          case "httponly":
            options.httpOnly = true;
            break;
          case "samesite":
            options.sameSite = attrValue as "strict" | "lax" | "none";
            break;
          default:
            break;
        }
      }

      // Set the cookie using the `cookies` API from Next.js
      cookies().set({
        name: name,
        value: value,
        ...options,
      });
    }
  }
};
