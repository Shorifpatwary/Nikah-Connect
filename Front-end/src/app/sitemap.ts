import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://connectnikah.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://connectnikah.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://connectnikah.com/bio",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];
}
// // Google's limit is 50,000 URLs per sitemap
// const start = id * 50000
// const end = start + 50000
// const products = await getProducts(
//   `SELECT id, date FROM products WHERE id BETWEEN ${start} AND ${end}`
// )
// return products.map((product) => ({
//   url: `${BASE_URL}/product/${id}`,
//   lastModified: product.date,
// }))
