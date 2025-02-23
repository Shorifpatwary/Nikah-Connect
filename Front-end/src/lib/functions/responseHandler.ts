import { deleteAuthCookies } from "@/app/(front-end)/(auth)/authCookie";
import Routes from "@/assets/data/routes";
import { redirect } from "next/navigation";

export function handle404Response(): void {
  // remove auth cookie
  deleteAuthCookies();
  redirect(Routes.Login);
}
