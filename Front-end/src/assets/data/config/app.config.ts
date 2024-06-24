import { Option } from "@/components/blocks/inputBox/selectBox";

export const backendUrl = "http://localhost:8000";
export const frontEndUrl = "http://localhost:3000";

export const userCookieName = "authUser";

export const x_xsrf_token = "XSRF-TOKEN";
export const connect_nikah_session = "connect_nikah_session";

export const userAuthCookies = [
  userCookieName,
  x_xsrf_token,
  connect_nikah_session,
];

// ! user  roles from "RolesEnum.php"

export const roles : Option[] = [
  { value: "user", title: "user" },
  { value: "admin", title: "admin" },
  { value: "super-admin", title: "super admin" },
  { value: "editor", title: "editor" },
  { value: "writer", title: "writer" },
];

// cache
export const allUsersTag = "users";
export const allLocations = "locations";
