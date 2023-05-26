import { useState } from "react";
import { getCookie } from "../utils/cookieUtils";

export function useAuth() {
  // const [auth, setAuth] = useState<boolean>(window.localStorage.getItem('authenticated') === 'true');
  const tokenFromStorage = getCookie("access_token");
  const [auth, _] = useState<boolean>(
    tokenFromStorage != null && tokenFromStorage !== ""
  );

  return {
    isAuthenticated: auth,
    accessToken: tokenFromStorage,
  };
}
