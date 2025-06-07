import { getCookie } from "./getCookie";

export function getUserId(token?: string): string | null {
  try {
    if (!token){
        const newToken = getCookie('userToken');
        if (!newToken) {
            return null;
        }
        token = newToken;
    }
    return atob(atob(token));
  } catch {
    return null;
  }
}