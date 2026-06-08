const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5027/api";

let isRefreshing = false;
let refreshQueue: Array<() => void> = [];

export async function tryRefresh(): Promise<boolean> {
  if (sessionStorage.getItem("refreshFailed") === "true") return false;

  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshQueue.push(() => resolve(true));
    });
  }

  isRefreshing = true;

  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      sessionStorage.setItem("refreshFailed", "true");
      window.location.href = "/auth/signin";
      return false;
    }

    refreshQueue.forEach((cb) => cb());
    refreshQueue = [];
    return true;
  } catch {
    sessionStorage.setItem("refreshFailed", "true");
    return false;
  } finally {
    isRefreshing = false;
  }
}

export function resetRefreshState() {
  sessionStorage.removeItem("refreshFailed");
  isRefreshing = false;
  refreshQueue = [];
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const isAuthRoute =
    endpoint.startsWith("/auth") || endpoint.includes("/user/me");

  if (response.status === 401 && !isAuthRoute) {
    const refreshed = await tryRefresh();

    if (!refreshed) {
      window.location.href = "/auth/signin";
      throw new Error("Session expired");
    }

    const retry = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: "include",
    });

    if (retry.status === 204) return {} as T;
    if (!retry.ok) {
      const errorData = await retry.json().catch(() => ({}));
      throw new Error(
        errorData.message || `სისტემური შეცდომა: ${retry.status}`,
      );
    }
    return retry.json();
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    console.log("API Error:", errorData);
    let errorMessage =
      errorData.message || `სისტემური შეცდომა: ${response.status}`;

    if (
      errorData.errors &&
      Array.isArray(errorData.errors) &&
      errorData.errors.length > 0
    ) {
      errorMessage = errorData.errors[0];
    } else if (errorData.errors && typeof errorData.errors === "string") {
      errorMessage = errorData.errors;
    }

    throw new Error(errorMessage);
  }
  if (response.status === 204) return {} as T;

  return response.json();
}
