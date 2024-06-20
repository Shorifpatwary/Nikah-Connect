// import type { NextApiRequest, NextApiResponse } from "next";
// import { cookies } from "next/headers";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const authUserCookie = cookies().get("authUser")?.value;

//   if (authUserCookie) {
//     const authUser = JSON.parse(authUserCookie);

//     if (authUser.email_verified_at) {
//       // Redirect to the desired page if email is verified
//       res.writeHead(302, { Location: "/dashboard" });
//       res.end();
//       return;
//     }
//   }

//   // Continue with the request if the email is not verified or no authUser cookie is found
//   res.status(200).json({ message: "Email not verified or no authUser cookie" });
// }

// ! write this
