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
