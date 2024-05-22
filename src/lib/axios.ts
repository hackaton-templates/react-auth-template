import axios from "axios";
import { API_URL } from "./env";
import authStorageService from "@/services/auth-storage.service";
import authService from "@/services/auth.service";
import { redirect } from "next/navigation";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Provide access token to all requests
api.interceptors.request.use(async (config) => {
  if (config.headers.get("x-skip-token")) {
    // This header indicates that we should skip token insertion
    return config;
  }

  const authResult = await authStorageService.get();
  if (authResult) {
    config.headers.Authorization = `Bearer ${authResult.access_token.token}`;
  }
  return config;
});

// Handle 401 and try to refresh token automatically
// Warning: After the access token expires, it is refreshed every time
// when a request fails with 401. The reason is that Next App router cannot set cookies
// in server components so it's impossible to update them with the new token.
// We can only hope that a middleware refreshes it at some point.
// See https://github.com/vercel/next.js/discussions/49843
api.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.response?.status === 401 && !error.config._isRetry) {
      const originalRequest = error.config;
      originalRequest._isRetry = true;

      const authResult = await authStorageService.get();
      if (!authResult) {
        return redirect("/signout");
      }
      try {
        const authResultRefreshed = await authService.refresh(authResult);
        authStorageService.set(authResultRefreshed);

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${authResultRefreshed.access_token.token}`;
        originalRequest.headers["X-Skip-Token"] = `1`;

        return api.request(originalRequest);
      } catch (e) {
        return redirect("/signout");
      }
    } else if (error.response?.status === 401 && error.config._isRetry) {
      return redirect("/signout");
    }

    return Promise.reject(error);
  }
);

export { api };
