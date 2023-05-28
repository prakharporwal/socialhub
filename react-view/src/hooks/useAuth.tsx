import { useMemo, useState } from "react";
import { getCookie } from "../utils/cookieUtils";

export function useAuth() {
  const tokenFromStorage = useMemo(() => getCookie("access_token"), []);
  const [auth, _] = useState<boolean>(
    tokenFromStorage != null && tokenFromStorage !== ""
  );

  return {
    isAuthenticated: auth,
    accessToken: tokenFromStorage,
  };
}
