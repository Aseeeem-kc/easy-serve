// api.ts
import { tokenStore } from "../auth/tokenStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  let token = tokenStore.get();

  // Convert headers to a plain object safely
  const headers = new Headers(init.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let authInit: RequestInit = {
    ...init,
    headers,               
    credentials: "include" 
  };

  let res = await fetch(input, authInit);

  // If access token expired then === attempt refresh
  if (res.status === 401) {
    const refreshRes = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      tokenStore.set(data.access_token);

      // retry original request with new token
      headers.set("Authorization", `Bearer ${data.access_token}`);
      authInit.headers = headers;

      res = await fetch(input, authInit);
    } else {
      // refresh failed === user not logged in anymore
      tokenStore.clear();
      window.location.href = "/login";
      return;
    }
  }

  return res;
}
