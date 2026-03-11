export type MeResponse = {
  authenticated: boolean;
  username?: string;
  roles?: string[];
};

export async function me(): Promise<MeResponse> {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });

  if (!res.ok) {
    return { authenticated: false };
  }

  return res.json();
}

export async function login(username: string, password: string): Promise<void> {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: params,
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }
}

export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}