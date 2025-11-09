// utils/apiClient.ts
import { tokenStore } from "../auth/tokenStore";


async function refreshAccessToken() {
  const refreshRes = await fetch(`/api/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!refreshRes.ok) return null;

  const refreshData = await refreshRes.json();
  tokenStore.set(refreshData.access_token);
  return refreshData.access_token;
}

export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  let accessToken = tokenStore.get();

  // Attach token to headers
  options.headers = {
    ...(options.headers || {}),
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  };

  const response = await fetch(`${url}`, {
    ...options,
    credentials: "include",
  });

  // If unauthorized — try refresh once
  if (response.status === 401) {
    const newAccessToken = await refreshAccessToken();
    if (!newAccessToken) {
      window.location.href = "/signin";
      return Promise.reject("Unauthorized");
    }

    // Retry original request
    return fetch(`${url}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${newAccessToken}`,
      },
      credentials: "include",
    });
  }

  return response;
}
