import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Connect Nikah",
    short_name: "Connect Nikah",
    description:
      "Connect Nikah is the leading Bangladeshi Muslim matrimony website, helping people find their perfect life partners.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    categories: ["matrimony", "muslim", "community"],
    dir: "ltr",
    orientation: "portrait",

    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
