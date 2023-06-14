import { useRef, useState } from "react";
import { getCookie } from "../utils/cookieUtils";

export function useAuth() {
  const tokenFromStorage = useRef(getCookie("access_token") || "");
  const auth = tokenFromStorage.current != null;

  console.log(auth);
  return {
    isAuthenticated: auth,
    accessToken: tokenFromStorage.current,
  };
}
