"use server";

import { cookies } from "next/headers";
const cookieNameValue = "authUser";
const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

//  user cookie create function
export async function createCookie(
  data: any,
  cookieName: string = cookieNameValue,
  time: number = thirtyDaysInMilliseconds
) {
  const jsonData = JSON.stringify(data);
  cookies().set({
    name: cookieName,
    value: jsonData,
    httpOnly: true,
    path: "/",
    // Expires 30 days later
    expires: Date.now() + time,
  });
}

//  user cookie create function
export async function deleteCookie(cookieName: string) {
  cookies().delete(cookieName);
}
