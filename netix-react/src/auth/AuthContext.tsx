import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const API_BASE = import.meta.env.PROD
  ? "https://api.neti.cz"
  : "";

export type AuthUser = {
  authenticated: true;
  username: string;
  roles: string[];
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (
    username: string,
    password: string,
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const response = await fetch(
      `${API_BASE}/api/auth/me`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      setUser(null);
      return;
    }

    const data = await response.json();

    setUser(
      data.authenticated ? data : null,
    );
  }, []);

  useEffect(() => {
    refresh()
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [refresh]);

  const login = useCallback(
    async (
      username: string,
      password: string,
    ): Promise<boolean> => {
      const body = new URLSearchParams({
        username,
        password,
      });

      const response = await fetch(
        `${API_BASE}/api/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
          body,
        },
      );

      if (response.status === 401) {
        return false;
      }

      if (!response.ok) {
        throw new Error(
          `Login selhal: HTTP ${response.status}`,
        );
      }

      await refresh();
      return true;
    },
    [refresh],
  );

  const logout = useCallback(async () => {
    const response = await fetch(
      `${API_BASE}/api/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (!response.ok && response.status !== 204) {
      throw new Error(
        `Odhlášení selhalo: HTTP ${response.status}`,
      );
    }

    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      refresh,
    }),
    [user, loading, login, logout, refresh],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth musí být uvnitř AuthProvider.",
    );
  }

  return context;
}