"use server";
import {
  userAuthCookies,
  userCookieName,
} from "@/assets/data/config/app.config";
import { cookies } from "next/headers";
const cookieName = userCookieName;
const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

//  user cookie create function
export async function createCookie(
  data: any,
  cookieKey: string = cookieName,
  time: number = thirtyDaysInMilliseconds
) {
  const jsonData = JSON.stringify(data);
  cookies().set({
    name: cookieKey,
    value: jsonData,
    httpOnly: true,
    path: "/",
    // Expires 30 days later
    expires: Date.now() + time,
  });
}

//  user cookie create function
export async function deleteAuthCookies() {
  userAuthCookies.map(authCookie => {
    cookies().delete(authCookie);
  });
}
