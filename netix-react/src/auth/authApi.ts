export type Me = {
  username: string;
  roles: string[];
};

// Později tohle bude reálné API (např. /api/auth/me)
// Zatím necháme jednoduché – v prod vrátí chybu => RequireAdmin tě nepustí.
export async function getMe(): Promise<Me | null> {
  const res = await fetch("/api/auth/me", { credentials: "include" });
  if (!res.ok) return null;
  return res.json();
}


export async function login(username: string, password: string) {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: params,
    credentials: "include",   // 🔥 TOTO JE POVINNÉ
  });

  if (!res.ok) throw new Error("Login failed");
}