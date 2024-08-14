import Routes from "@/assets/data/routes";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// 1. Specify protected and public routes
const protectedRoutes = [
  Routes.Profile,
  `${Routes.Admin}/:path*`,
  Routes.MailVerification,
];
const publicRoutes = [
  Routes.Login,
  Routes.Registration,
  Routes.ForgetPassword,
  Routes.ResetPassword,
];
const sessionCookieName = "connect_nikah_session";
const userCookieName = "authUser";

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Get the session and user cookies
  const sessionCookie = cookies().get(sessionCookieName)?.value;
  const userCookie = cookies().get(userCookieName)?.value;

  // 4. Determine if the user is authenticated
  const isAuthenticated = sessionCookie && userCookie;

  // 5. Redirect unauthenticated users from protected routes to /login
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(Routes.Login, req.nextUrl));
  }

  // 6. Redirect authenticated users from public routes to /dashboard
  if (
    isPublicRoute &&
    isAuthenticated &&
    !req.nextUrl.pathname.startsWith(Routes.Profile)
  ) {
    return NextResponse.redirect(new URL(Routes.Profile, req.nextUrl));
  }

  // 7. Proceed to the requested route
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)", "/"],
};
