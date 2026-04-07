import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as api from "../api/auth";

type AuthState =
  | { status: "loading" }
  | { status: "anon" }
  | { status: "authed"; username: string; roles: string[] };

type AuthCtx = {
  state: AuthState;
  refresh: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: string) => boolean;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "loading" });

const refresh = useCallback(async () => {
  setState({ status: "loading" });

  try {
    const r = await api.me();

    if (!r.authenticated || !r.username) {
      setState({ status: "anon" });
      return;
    }

    setState({
      status: "authed",
      username: r.username,
      roles: r.roles ?? [],
    });
  } catch (err) {
    console.error("Auth refresh failed:", err);
    setState({ status: "anon" });
  }
}, []);

  const login = useCallback(
    async (username: string, password: string) => {
      await api.login(username, password);
      await refresh();
    },
    [refresh]
  );

  const logout = useCallback(async () => {
    await api.logout();
    await refresh();
  }, [refresh]);

  const hasRole = useCallback(
    (role: string) => {
      if (state.status !== "authed") return false;

      return (
        state.roles.includes(role) ||
        state.roles.includes(`ROLE_${role}`) ||
        state.roles.includes(role.replace(/^ROLE_/, ""))
      );
    },
    [state]
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo<AuthCtx>(
    () => ({ state, refresh, login, logout, hasRole }),
    [state, refresh, login, logout, hasRole]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}