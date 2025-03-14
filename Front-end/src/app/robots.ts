import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "*",
      disallow: ["/dashboard/", "/admin/"],
    },
    sitemap: "/sitemap.xml",
    host: "https://connectnikah.com",
  };
}
