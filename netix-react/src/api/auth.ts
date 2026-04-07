export type MeResponse =
  | { authenticated: false }
  | { authenticated: true; username: string; roles: string[] };

export async function login(username: string, password: string): Promise<void> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username, password }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Bad credentials");
  }
}

export async function logout(): Promise<void> {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }
}

export async function me(): Promise<MeResponse> {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });

  if (res.status === 401) {
    return { authenticated: false };
  }

  if (!res.ok) {
    throw new Error("Failed to load /api/auth/me");
  }

  return (await res.json()) as MeResponse;
}