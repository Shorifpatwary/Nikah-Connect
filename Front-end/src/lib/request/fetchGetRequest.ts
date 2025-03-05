// "use server";
// import { deleteAuthCookies } from "@/app/(front-end)/(auth)/authCookie";
// import Routes from "@/assets/data/routes";
// import { getHeaders } from "@/lib/request/header/getHeaders";
// import { revalidatePath, revalidateTag } from "next/cache";
// import { redirect } from "next/navigation";

// interface FetchResponse<T> {
//   data: T;
//   status: number;
// }

// type GetRequestProps = {
//   url: string;
//   tagRevalidate?: string[];
//   pathRevalidate?: string[];
// };

// export const fetchGetRequest = async <T>({
//   url,
//   tagRevalidate,
//   pathRevalidate,
// }: GetRequestProps): Promise<FetchResponse<T>> => {
//   // ✅ Now including getHeaders()
//   const headers = await getHeaders();

//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       ...headers, // ✅ Ensures authentication & session handling
//     },
//     credentials: "include",
//   });

//   // await setCookiesFromResponse(response);

//   if (!response.ok) {
//     if (response.status === 401) {
//       console.log(response.status, "response status");
//       deleteAuthCookies();
//       redirect(Routes.Login);
//     } else {
//       let errorData;
//       try {
//         errorData = await response.json();
//       } catch {
//         errorData = { message: `HTTP error! Status: ${response.status}` };
//       }
//       return { data: errorData, status: response.status };
//     }
//   }

//   if (tagRevalidate && tagRevalidate.length > 0) {
//     await Promise.all(tagRevalidate.map(tag => revalidateTag(tag)));
//   }

//   if (pathRevalidate && pathRevalidate.length > 0) {
//     await Promise.all(pathRevalidate.map(path => revalidatePath(path)));
//   }

//   const data: T = await response.json();
//   return { data, status: response.status };
// };
